// File: src/app/products/[id]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Tipe data untuk produk
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

// Fungsi untuk mengambil data produk dari API
const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    // Panggil API dengan ID di query parameter
    const res = await fetch(`http://localhost:3000/api/products?id=${id}`);
    if (!res.ok) {
      console.error('Failed to fetch product:', res.status, res.statusText);
      return undefined;
    }
    const product = await res.json();
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return undefined;
  }
};

export default async function ProductPage({ params }: ProductPageProps) {
  // Ambil data produk di sisi server menggunakan ID dari URL
  const product = await getProductById(params.id);

  // Jika produk tidak ditemukan, tampilkan halaman 404
  if (!product) {
    notFound();
  }

  return (
    <main className="p-10 flex flex-col items-center text-center">
      <Image
        src={product.image || 'https://via.placeholder.com/400'}
        alt={product.name}
        width={400}
        height={300}
        className="w-full max-w-md h-[300px] object-cover rounded shadow mb-6"
      />
      <h1 className="text-3xl font-bold text-indigo-700">{product.name}</h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <p className="mt-2 font-semibold">Harga: Rp{product.price.toLocaleString()}</p>

      <Link
        href="/products"
        className="mt-6 inline-block bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
      >
        Kembali ke Daftar Produk
      </Link>
    </main>
  );
}