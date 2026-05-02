import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedOrders = orders.map((o) => ({
      id: o.id,
      customer: o.customer.name,
      phone: o.customer.phone,
      items: o.items.reduce((acc, item) => acc + item.quantity, 0),
      total: o.total,
      weight: o.totalWeightGrams,
      status: o.status,
      date: new Date(o.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      canCancel: o.status === 'NEW',
      // Shipping details for Excel Export
      shippingName: o.shippingName,
      shippingPhone: o.shippingPhone,
      shippingAddress1: o.shippingAddress1,
      shippingAddress2: o.shippingAddress2,
      shippingCity: o.shippingCity,
      shippingState: o.shippingState,
      shippingPincode: o.shippingPincode,
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Fetch admin orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
