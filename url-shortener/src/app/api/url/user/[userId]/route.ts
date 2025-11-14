import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSupabaseServiceClient } from "@/lib/db";

interface Params {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userId: requestedUserId } = await params;
  const isSelf = requestedUserId === session.user.id;
  const isAdmin = !!session.user.is_admin;

  if (!isSelf && !isAdmin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const supabase = getSupabaseServiceClient();

  const { data, error } = await supabase
    .from("urls")
    .select("id, original_url, short_code, expires_at, is_active, created_at")
    .eq("user_id", requestedUserId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("List user URLs error", error);
    return NextResponse.json({ message: "Unable to fetch URLs" }, { status: 500 });
  }

  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

  const urlsWithShort = (data ?? []).map((u: any) => ({
    ...u,
    short_url: `${baseUrl}/${u.short_code}`,
  }));

  return NextResponse.json({ urls: urlsWithShort });
}
