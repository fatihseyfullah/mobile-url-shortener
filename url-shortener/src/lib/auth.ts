import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getSupabaseServiceClient } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const supabase = getSupabaseServiceClient();

        const { data: user, error } = await supabase
          .from("users")
          .select("id, email, password_hash, name, is_admin")
          .eq("email", credentials.email)
          .single();

        if (error || !user) return null;

        const valid = await compare(credentials.password, user.password_hash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          is_admin: user.is_admin,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token as any).userId = (user as any).id;
        (token as any).is_admin = (user as any).is_admin ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).userId as string;
        (session.user as any).is_admin = (token as any).is_admin ?? false;
      }
      return session;
    },
  },
});
