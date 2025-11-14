import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSupabaseServiceClient } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.is_admin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const supabase = getSupabaseServiceClient();

  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url, short_code, created_at, is_active")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Admin urls error", error);
    return NextResponse.json({ message: "Unable to fetch urls" }, { status: 500 });
  }

  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

  const urls = (data ?? []).map((u) => ({
    ...u,
    short_url: `${baseUrl}/${u.short_code}`,
  }));

  return NextResponse.json({ urls });
}
