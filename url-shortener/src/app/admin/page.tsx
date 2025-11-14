import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getAdminData() {
  const [statsRes, urlsRes] = await Promise.all([
    fetch("/api/admin/stats", { cache: "no-store" }),
    fetch("/api/admin/urls", { cache: "no-store" }),
  ]);

  const stats = (await statsRes.json().catch(() => null)) ?? {};
  const urlsData = (await urlsRes.json().catch(() => null))?.urls;
  const urls = (Array.isArray(urlsData) ? urlsData : []) as Array<{ id: string; original_url: string; short_url: string }>;

  return { stats, urls };
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions as any);

  if (!session?.user?.is_admin) {
    return (
      <div className="py-10 text-sm text-zinc-600 dark:text-zinc-400">
        Bu sayfaya sadece admin kullanıcılar erişebilir.
      </div>
    );
  }

  const { stats, urls } = await getAdminData();

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-xl bg-white p-3 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">Kullanıcı</p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{stats.users ?? 0}</p>
        </div>
        <div className="rounded-xl bg-white p-3 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">URL</p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{stats.urls ?? 0}</p>
        </div>
        <div className="rounded-xl bg-white p-3 dark:bg-zinc-900">
          <p className="text-zinc-500 dark:text-zinc-400">Tıklama</p>
          <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{stats.clicks ?? 0}</p>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-3 text-xs dark:bg-zinc-900">
        <h2 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">Son URL&apos;ler</h2>
        <div className="space-y-2">
          {urls.length === 0 && (
            <p className="text-zinc-500 dark:text-zinc-400">Henüz URL yok.</p>
          )}
          {urls.map((u) => (
            <div key={u.id} className="flex flex-col gap-1 rounded-xl border px-2 py-2 dark:border-zinc-800">
              <span className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                {u.original_url}
              </span>
              <a
                href={u.short_url}
                className="truncate text-[11px] font-medium text-blue-600 dark:text-blue-400"
                target="_blank"
                rel="noreferrer"
              >
                {u.short_url}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
