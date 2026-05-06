import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all order items for orders that are not cancelled
    const items = await prisma.orderItem.findMany({
      where: {
        order: {
          status: {
            not: 'CANCELLED'
          }
        }
      },
      include: {
        product: true
      }
    });

    // Aggregate by product
    const salesMap = new Map<string, { product: any, totalQuantity: number, totalRevenue: number }>();

    items.forEach((item: any) => {
      const existing = salesMap.get(item.productId);
      if (existing) {
        existing.totalQuantity += item.quantity;
        existing.totalRevenue += item.quantity * item.priceAtPurchase;
      } else {
        salesMap.set(item.productId, {
          product: item.product,
          totalQuantity: item.quantity,
          totalRevenue: item.quantity * item.priceAtPurchase
        });
      }
    });

    // Convert map to array and sort by totalQuantity descending
    const sortedProducts = Array.from(salesMap.values()).sort((a, b) => b.totalQuantity - a.totalQuantity);

    const formatted = sortedProducts.map((p) => ({
      id: p.product.id,
      name: p.product.name,
      image: p.product.image,
      sku: p.product.sku || 'N/A',
      totalQuantitySold: p.totalQuantity,
      totalRevenue: p.totalRevenue
    }));

    return NextResponse.json(formatted);

  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
