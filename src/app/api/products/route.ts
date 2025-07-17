// File: app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mengambil semua produk atau satu produk spesifik (READ)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Mengambil satu produk spesifik dari database
    const product = await prisma.product.findUnique({
      where: { id: id },
    });
    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } else {
    // Mengambil semua produk dari database
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  }
}

// Menambahkan produk baru (CREATE)
export async function POST(request: Request) {
  const { name, price, description, image } = await request.json();
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      description,
      image,
    },
  });
  return NextResponse.json(newProduct, { status: 201 });
}

// Mengupdate produk (UPDATE)
export async function PUT(request: Request) {
  const { id, name, price, description, image } = await request.json();
  const updatedProduct = await prisma.product.update({
    where: { id: id },
    data: {
      name,
      price,
      description,
      image,
    },
  });
  return NextResponse.json(updatedProduct);
}

// Menghapus produk (DELETE)
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });
    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}