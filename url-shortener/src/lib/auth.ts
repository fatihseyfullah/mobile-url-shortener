import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getSupabaseServiceClient } from "./db";

const config = {
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

        const userData = user as any;
        const valid = await compare(credentials.password as string, userData.password_hash);
        if (!valid) return null;

        return {
          id: userData.id,
          email: userData.email,
          name: userData.name ?? undefined,
          is_admin: userData.is_admin,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.userId = user.id;
        token.is_admin = user.is_admin ?? false;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.is_admin = token.is_admin ?? false;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = (NextAuth as any).default ? (NextAuth as any).default(config) : (NextAuth as any)(config);
