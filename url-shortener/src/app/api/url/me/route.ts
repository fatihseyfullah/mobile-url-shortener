import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { getSupabaseServiceClient } from "@/lib/db";

export async function GET(request: Request) {
  // Get token from Authorization header
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.substring(7);
  const secret = process.env.NEXTAUTH_SECRET || "default-secret-change-this";

  try {
    // Verify JWT token
    const decoded = verify(token, secret) as any;
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const supabase = getSupabaseServiceClient();

    const { data, error } = await supabase
      .from("urls")
      .select("id, original_url, short_code, expires_at, is_active, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("List user URLs error", error);
      return NextResponse.json({ message: "Unable to fetch URLs" }, { status: 500 });
    }

    const baseUrl = process.env.BASE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";

    const urlsWithShort = (data ?? []).map((u: any) => ({
      ...u,
      short_url: `${baseUrl}/${u.short_code}`,
    }));

    return NextResponse.json({ urls: urlsWithShort });
  } catch (error) {
    console.error("JWT verification error", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
