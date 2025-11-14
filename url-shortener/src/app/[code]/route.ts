import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/db";

interface Params {
  params: Promise<{
    code: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { code } = await params;
  const supabase = getSupabaseServiceClient();

  const { data: url, error } = await supabase
    .from("urls")
    .select("id, original_url, is_active, expires_at")
    .eq("short_code", code)
    .maybeSingle();

  if (error || !url || !(url as any).is_active) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  const urlData = url as any;

  if (urlData.expires_at && new Date(urlData.expires_at) < new Date()) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  const referer = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent");
  const ip = (request as any).ip ?? request.headers.get("x-forwarded-for") ?? "";

  await (supabase.from("analytics") as any).insert({
    url_id: urlData.id,
    referer,
    user_agent: userAgent,
    ip_address: ip,
  });

  return NextResponse.redirect(urlData.original_url, 302);
}
