import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { getSupabaseServiceClient } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { email, password } = body || {};

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, password_hash, name, is_admin")
    .eq("email", email)
    .single();

  if (error || !user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const valid = await compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      is_admin: user.is_admin,
    },
  });
}
