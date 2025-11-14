import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getSupabaseServiceClient } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { email, password, name } = body || {};

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  const passwordHash = await hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert({ email, password_hash: passwordHash, name })
    .select("id, email, name, is_admin")
    .single();

  if (error || !data) {
    console.error("Register error", error);
    return NextResponse.json({ message: "Unable to register user" }, { status: 500 });
  }

  return NextResponse.json(
    {
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        is_admin: data.is_admin,
      },
    },
    { status: 201 },
  );
}
