// File: src/app/products/[id]/page.tsx

import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const products: Record<string, { name: string; description: string; price: string; image: string }> = {
  '1': {
    name: 'Next.js Hoodie',
    description: 'Hoodie keren untuk para developer Next.js!',
    price: 'Rp 250.000',
    image: 'https://plus.unsplash.com/premium_photo-1673356302169-574db56b52cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800',
  },
  '2': {
    name: 'React Mug',
    description: 'Mug stylish untuk pecinta React.',
    price: 'Rp 75.000',
    image: 'https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800',
  },
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = products[params.id];

  if (!product) {
    notFound();
  }

  return (
    <main className="p-10 flex flex-col items-center text-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-md h-[300px] object-cover rounded shadow mb-6"
      />
      <h1 className="text-3xl font-bold text-indigo-700">{product.name}</h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <p className="mt-2 font-semibold">Harga: {product.price}</p>

      <Link
        href="/"
        className="mt-6 inline-block bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
