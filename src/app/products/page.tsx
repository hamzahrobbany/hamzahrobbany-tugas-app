"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Tipe data untuk produk
interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // Tambahkan properti image
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(''); // State baru untuk URL gambar
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fungsi untuk mengambil semua data produk (READ)
  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  // Fungsi untuk menambahkan produk baru (CREATE)
  const handleAddProduct = async () => {
    if (!name || price <= 0 || !image) return;
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, image }), // Kirim data gambar
    });
    if (res.ok) {
      await fetchProducts(); // Ambil data terbaru
      setName('');
      setPrice(0);
      setImage(''); // Reset state gambar
    }
  };

  // Fungsi untuk mengupdate produk (UPDATE)
  const handleUpdateProduct = async () => {
    if (!editingProduct || !name || price <= 0 || !image) return;
    const res = await fetch('/api/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingProduct.id, name, price, image }), // Kirim data gambar
    });
    if (res.ok) {
      await fetchProducts(); // Ambil data terbaru
      setName('');
      setPrice(0);
      setImage(''); // Reset state gambar
      setEditingProduct(null); // Keluar dari mode edit
    }
  };

  // Fungsi untuk menghapus produk (DELETE)
  const handleDeleteProduct = async (id: string) => {
    const res = await fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      await fetchProducts(); // Ambil data terbaru
    }
  };

  // Set state untuk mode edit
  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image); // Set state gambar untuk mode edit
  };

  // Memuat data saat halaman pertama kali dirender
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Manajemen Produk</h1>

      {/* Form untuk Tambah / Edit Produk */}
      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px', borderRadius: '8px' }}>
        <h2>{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Nama:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="price" style={{ display: 'block', marginBottom: '5px' }}>Harga:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="image" style={{ display: 'block', marginBottom: '5px' }}>URL Gambar:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
          style={{ padding: '10px 15px', backgroundColor: editingProduct ? '#ffc107' : '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
        </button>
        {editingProduct && (
          <button onClick={() => { setEditingProduct(null); setName(''); setPrice(0); setImage(''); }}
            style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}>
            Batal
          </button>
        )}
      </div>

      {/* Menampilkan List Produk */}
      <div>
        <h2>Daftar Produk</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Image 
                    src={product.image || 'https://via.placeholder.com/64'} // Placeholder jika gambar kosong
                    alt={product.name}
                    width={64}
                    height={64}
                    style={{ objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
                />
                <div>
                  <strong>{product.name}</strong> - Rp{product.price.toLocaleString()}
                </div>
              </div>
              <div>
                <button onClick={() => startEditing(product)}
                  style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteProduct(product.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}