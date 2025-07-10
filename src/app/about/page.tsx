// File: src/app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://avatars.githubusercontent.com/u/583231?v=4" // ganti ini dengan foto kamu jika mau
            alt="Hamzah Robbany"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          />
          <div>
            <h1 className="text-3xl font-bold text-indigo-400 mb-1">Hamzah Robbany</h1>
            <p className="text-gray-300 mb-2">Web Developer & Next.js Enthusiast</p>
            <p>
              Halo! Saya Hamzah, sedang belajar membangun aplikasi modern menggunakan Next.js, Tailwind CSS, dan TypeScript.  
              Project ini dibuat sebagai bagian dari latihan membuat halaman statis, dinamis, dan navigasi dengan baik.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-3">Fitur Aplikasi</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Routing statis & dinamis</li>
            <li>Gambar produk responsif</li>
            <li>Desain UI modern (Tailwind)</li>
            <li>404 page custom</li>
            <li>Navigasi antar halaman tanpa reload</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
