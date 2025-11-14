import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
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
  const session = await auth();
  if (!session?.user?.id) {
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
    user_id: session.user.id,
    original_url: originalUrl,
    short_code: shortCode,
  };

  if (expiresAt) {
    insertPayload.expires_at = new Date(expiresAt).toISOString();
  }

  const { data, error } = await supabase
    .from("urls")
    .insert(insertPayload)
    .select("id, original_url, short_code, expires_at, created_at")
    .single();

  if (error || !data) {
    console.error("Shorten URL error", error);
    return NextResponse.json({ message: "Unable to shorten URL" }, { status: 500 });
  }

  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

  return NextResponse.json(
    {
      url: {
        id: data.id,
        original_url: data.original_url,
        short_code: data.short_code,
        expires_at: data.expires_at,
        created_at: data.created_at,
        short_url: `${baseUrl}/${data.short_code}`,
      },
    },
    { status: 201 },
  );
}
