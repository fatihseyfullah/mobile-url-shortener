"use client";

import { FormEvent, useState } from "react";

export function UrlCreateForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastShortUrl, setLastShortUrl] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setLastShortUrl(null);

    const res = await fetch("/api/url/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      setError(data?.message ?? "URL kısaltılamadı");
      setLoading(false);
      return;
    }

    setLastShortUrl(data.url.short_url as string);
    setOriginalUrl("");
    setLoading(false);

    // opsiyonel: sayfayı yenilemeden listeyi güncellemek için event/props kullanılabilir
    window.location.reload();
  }

  return (
    <div className="rounded-2xl bg-white p-3 shadow-xs dark:bg-zinc-900">
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          Uzun URL
        </label>
        <input
          type="url"
          placeholder="https://..."
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 flex h-9 w-full items-center justify-center rounded-full bg-black text-xs font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          {loading ? "Kısaltılıyor..." : "Kısalt"}
        </button>
        {lastShortUrl && (
          <p className="mt-1 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
            Son link: <a href={lastShortUrl}>{lastShortUrl}</a>
          </p>
        )}
      </form>
    </div>
  );
}
