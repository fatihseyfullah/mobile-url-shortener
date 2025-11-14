import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../types/supabase";

let supabaseAnonClient: SupabaseClient<Database> | null = null;
let supabaseServiceClient: SupabaseClient<Database> | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseAnonClient) {
    const url = requireEnv("SUPABASE_URL");
    const anonKey = requireEnv("SUPABASE_ANON_KEY");
    supabaseAnonClient = createClient<Database>(url, anonKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return supabaseAnonClient;
}

export function getSupabaseServiceClient(): SupabaseClient<Database> {
  if (!supabaseServiceClient) {
    const url = requireEnv("SUPABASE_URL");
    const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
    supabaseServiceClient = createClient<Database>(url, serviceKey, {
      auth: {
        persistSession: false,
      },
    });
  }
  return supabaseServiceClient;
}
