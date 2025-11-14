import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-8 font-sans dark:bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
        <h1 className="text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Mobil URL Kısaltıcı
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Kısa linkler, QR kodlar ve kolay paylaşım ile bağlantılarını yönet.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            Giriş Yap
          </Link>
          <Link
            href="/register"
            className="inline-flex h-11 items-center justify-center rounded-full border text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </main>
  );
}
