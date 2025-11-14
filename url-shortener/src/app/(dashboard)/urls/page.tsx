import { auth } from "@/lib/auth";
import { getSupabaseServiceClient } from "@/lib/db";
import { UrlListItem } from "@/components/dashboard/UrlListItem";
import { UrlCreateForm } from "@/components/dashboard/UrlCreateForm";

export default async function UrlsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    // App Router'da redirect için redirect() kullanılabilir; basitçe fallback gösteriyoruz
    return (
      <div className="py-10 text-sm text-zinc-600 dark:text-zinc-400">
        Lütfen giriş yapın.
      </div>
    );
  }

  const supabase = getSupabaseServiceClient();

  const { data } = await supabase
    .from("urls")
    .select("id, original_url, short_code, created_at")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
  const urls = (data ?? []).map((u: any) => ({
    id: u.id,
    originalUrl: u.original_url,
    shortUrl: `${baseUrl}/${u.short_code}`,
    createdAt: u.created_at,
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Linklerim</h1>
      <UrlCreateForm />
      <div className="space-y-3">
        {urls.length === 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Henüz link oluşturmadın.</p>
        )}
        {urls.map((url) => (
          <UrlListItem
            key={url.id}
            originalUrl={url.originalUrl}
            shortUrl={url.shortUrl}
            createdAt={url.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
