import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSupabaseServiceClient } from "@/lib/db";

interface Params {
  params: Promise<{
    code: string;
  }>;
}

export async function GET(_request: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { code } = await params;
  const supabase = getSupabaseServiceClient();

  const { data, error } = await supabase
    .from("urls")
    .select("id, user_id, original_url, short_code, expires_at, is_active, created_at")
    .eq("short_code", code)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  if (data.user_id !== session.user.id && !session.user.is_admin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ url: data });
}
