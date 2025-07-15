import { NextResponse } from 'next/server';

// Data produk statis sebagai array
let products = [
  { id: '1', name: 'Next.js Hoodie', price: 250000, description: 'Hoodie keren untuk para developer Next.js!', image: 'https://plus.unsplash.com/premium_photo-1673356302169-574db56b52cd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800' },
  { id: '2', name: 'React Mug', price: 75000, description: 'Mug stylish untuk pecinta React.', image: 'https://images.unsplash.com/photo-1542556398-95fb5b9f9b48?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800' },
  { id: '3', name: 'Keyboard', price: 75000, description: 'Keyboard mekanik yang nyaman untuk coding.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

// Helper untuk menemukan indeks produk berdasarkan ID
const findProductIndex = (id: string) => products.findIndex(p => p.id === id);

// Mengambil semua produk atau satu produk spesifik (READ)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Jika ada ID, cari dan kembalikan produk spesifik
    const product = products.find(p => p.id === id);
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } else {
    // Jika tidak ada ID, kembalikan semua produk
    return NextResponse.json(products);
  }
}

// Menambahkan produk baru (CREATE)
export async function POST(request: Request) {
  const newProduct = await request.json();
  const id = (products.length + 1).toString(); // ID baru sederhana
  const productWithId = { ...newProduct, id };
  products.push(productWithId);
  return NextResponse.json(productWithId, { status: 201 });
}

// Mengupdate produk (UPDATE)
export async function PUT(request: Request) {
  const updatedProduct = await request.json();
  const { id } = updatedProduct;
  const index = findProductIndex(id);

  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    return NextResponse.json(products[index]);
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}

// Menghapus produk (DELETE)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  const index = findProductIndex(id);

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    return NextResponse.json(deletedProduct[0]);
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}