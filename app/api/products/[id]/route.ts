import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price.toString()),
        salePrice: parseFloat(salePrice.toString()),
        stock: parseInt(stock.toString()),
        weightGrams: parseInt(weightGrams.toString()),
        categoryId,
        image,
        badge: badge || null,
      },
      include: { category: true }
    });

    return NextResponse.json({
      ...product,
      categoryName: product.category.name,
      categorySlug: product.category.slug
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
