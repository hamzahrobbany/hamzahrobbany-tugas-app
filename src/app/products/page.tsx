// File: src/app/products/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Tipe data untuk produk harus sesuai dengan skema database
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const res = await fetch('/api/products', { cache: 'no-store' });
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (!name || price <= 0) return;
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, description, image }),
    });
    await fetchProducts();
    setName('');
    setPrice(0);
    setDescription('');
    setImage('');
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingProduct.id, name, price, description, image }),
    });
    await fetchProducts();
    setName('');
    setPrice(0);
    setDescription('');
    setImage('');
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
    });
    await fetchProducts();
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Manajemen Produk</h1>

      {/* Form Tambah/Edit */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Produk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="URL Gambar"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
          </button>
          {editingProduct && (
            <button
              onClick={() => { setEditingProduct(null); setName(''); setPrice(0); setDescription(''); setImage(''); }}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* Daftar Produk */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <Image
                src={product.image || 'https://via.placeholder.com/64'}
                alt={product.name}
                width={64}
                height={64}
                className="object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">Rp{product.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEditing(product)}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}