export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-8 font-sans dark:bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
        {children}
      </div>
    </main>
  );
}
