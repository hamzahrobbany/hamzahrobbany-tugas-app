// File: src/app/page.tsx

import Link from 'next/link';
import Image from 'next/image';

// Tipe data untuk produk
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

// Fungsi untuk mengambil data dari API
const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) {
    // Ini akan menangkap kesalahan dari API dan menampilkannya di konsol
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

export default async function Home() {
  // Ambil data produk di sisi server saat request masuk
  const products = await getProducts();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Selamat Datang di Toko Kami 🛍️
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={250}
              className="w-full h-[250px] object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-700">{product.name}</h2>
              <p className="mt-1 text-sm text-gray-600">Rp{product.price.toLocaleString()}</p>
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