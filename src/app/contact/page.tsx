//src/app/contact/page.tsx

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-indigo-400 mb-6">Hubungi Saya</h1>

        <p className="mb-6 text-gray-300">
          Jika kamu memiliki pertanyaan, saran, atau ingin berkolaborasi, jangan ragu untuk menghubungi saya melalui
          form di bawah atau langsung melalui kontak yang tersedia.
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-200">
              Nama
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nama lengkap"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium text-gray-200">
              Pesan
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tulis pesanmu di sini..."
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded text-white font-semibold"
          >
            Kirim Pesan
          </button>
        </form>

        <div className="mt-8 border-t border-gray-700 pt-6 text-gray-300 text-sm">
          <p>Email: <a href="mailto:hamzahrobbany@gmail.com" className="text-indigo-400 hover:underline">hamzah@example.com</a></p>
          <p>Lokasi: Bandung, Indonesia</p>
        </div>
      </div>
    </main>
  );
}
