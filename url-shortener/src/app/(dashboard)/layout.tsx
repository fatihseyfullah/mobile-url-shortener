import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions as any);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="flex items-center justify-between border-b bg-white px-4 py-3 text-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold text-zinc-900 dark:text-zinc-50">
            URL Kısaltıcı
          </Link>
          <nav className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Link href="/urls" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Linklerim
            </Link>
            <span>•</span>
            <Link href="/profile" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Profil
            </Link>
            {session?.user?.is_admin && (
              <>
                <span>•</span>
                <Link href="/admin" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Admin
                </Link>
              </>
            )}
          </nav>
        </div>
        <SignOutButton />
      </header>
      <main className="flex-1 px-4 py-4">
        <div className="mx-auto w-full max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
