// File: src/app/page.tsx

'use client';

import Link from 'next/link';

const products = [
  {
    id: '1',
    name: 'Next.js Hoodie',
    image: 'https://plus.unsplash.com/premium_photo-1673356302169-574db56b52cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800',
  },
  {
    id: '2',
    name: 'React Mug',
    image: 'https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800',
  },
];

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Selamat Datang di Toko Kami 🛍️
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[250px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
              <Link
                href={`/products/${product.id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
