import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="py-10 text-sm text-zinc-600 dark:text-zinc-400">
        Lütfen giriş yapın.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Profil</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Email: {session.user.email}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Kullanıcı ID: {session.user.id}</p>
      {session.user.is_admin && (
        <p className="text-xs text-green-600 dark:text-green-400">Admin hesabı</p>
      )}
    </div>
  );
}
