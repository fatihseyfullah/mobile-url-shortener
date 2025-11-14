import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSupabaseServiceClient } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.is_admin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const supabase = getSupabaseServiceClient();

  const [{ count: userCount }, { count: urlCount }, { count: clickCount }] = await Promise.all([
    supabase.from("users").select("id", { count: "exact", head: true }),
    supabase.from("urls").select("id", { count: "exact", head: true }),
    supabase.from("analytics").select("id", { count: "exact", head: true }),
  ]);

  return NextResponse.json({
    users: userCount ?? 0,
    urls: urlCount ?? 0,
    clicks: clickCount ?? 0,
  });
}
