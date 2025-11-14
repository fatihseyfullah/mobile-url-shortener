import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { verify } from "jsonwebtoken";
import { getSupabaseServiceClient } from "@/lib/db";
import { generateShortCode } from "@/lib/utils";

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let userId: string | undefined;

  // Try JWT token first (for mobile app)
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const secret = process.env.NEXTAUTH_SECRET || "default-secret-change-this";
    try {
      const decoded = verify(token, secret) as any;
      userId = decoded.userId;
    } catch (error) {
      // Token invalid, will try session auth below
    }
  }

  // If no JWT, try NextAuth session (for web app)
  if (!userId) {
    const session = await auth();
    userId = session?.user?.id;
  }

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const { originalUrl, expiresAt } = body || {};

  if (!originalUrl || !isValidUrl(originalUrl)) {
    return NextResponse.json({ message: "Valid originalUrl is required" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();

  // generate unique short_code with limited retries
  let shortCode = "";
  let attempts = 0;
  const maxAttempts = 5;

  while (attempts < maxAttempts) {
    attempts += 1;
    shortCode = generateShortCode();

    const { data: existing } = await supabase
      .from("urls")
      .select("id")
      .eq("short_code", shortCode)
      .maybeSingle();

    if (!existing) break;
  }

  if (!shortCode) {
    return NextResponse.json({ message: "Failed to generate short code" }, { status: 500 });
  }

  const insertPayload: {
    user_id: string;
    original_url: string;
    short_code: string;
    expires_at?: string;
  } = {
    user_id: userId,
    original_url: originalUrl,
    short_code: shortCode,
  };

  if (expiresAt) {
    insertPayload.expires_at = new Date(expiresAt).toISOString();
  }

  const { data, error } = await (supabase
    .from("urls") as any)
    .insert(insertPayload)
    .select("id, original_url, short_code, expires_at, created_at")
    .single();

  if (error || !data) {
    console.error("Shorten URL error", error);
    return NextResponse.json({ message: "Unable to shorten URL" }, { status: 500 });
  }

  const urlData = data as any;
  
  // Get base URL from environment or request host
  let baseUrl = process.env.BASE_URL || process.env.NEXTAUTH_URL;
  if (!baseUrl || baseUrl.includes('your-app')) {
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    baseUrl = host ? `${protocol}://${host}` : 'http://localhost:3000';
  }

  return NextResponse.json(
    {
      url: {
        id: urlData.id,
        original_url: urlData.original_url,
        short_code: urlData.short_code,
        expires_at: urlData.expires_at,
        created_at: urlData.created_at,
        short_url: `${baseUrl}/${urlData.short_code}`,
      },
    },
    { status: 201 },
  );
}
