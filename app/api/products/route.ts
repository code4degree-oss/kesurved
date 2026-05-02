import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: { position: 'asc' }
    });
    
    const formatted = products.map(p => ({
      ...p,
      categoryName: p.category.name,
      categorySlug: p.category.slug
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      description, 
      price, 
      salePrice, 
      stock, 
      weightGrams, 
      categoryId, 
      image,
      badge
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price.toString()),
        salePrice: parseFloat(salePrice.toString()),
        stock: parseInt(stock.toString()),
        weightGrams: parseInt(weightGrams.toString()),
        categoryId,
        image,
        badge,
        position: await prisma.product.count() // append to end
      },
      include: { category: true }
    });

    return NextResponse.json({
      ...product,
      categoryName: product.category.name,
      categorySlug: product.category.slug
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
