// File: src/app/not-found.tsx
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-10">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-red-800">Halaman tidak ditemukan 😢</p>
      <a
        href="/"
        className="mt-6 inline-block rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Kembali ke Beranda
      </a>
    </main>
  );
}
