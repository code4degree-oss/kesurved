import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OrderStatus } from '@prisma/client';
import { verifyAdminToken, unauthorizedResponse } from '@/lib/admin-auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminToken(req)) return unauthorizedResponse();
  try {
    const { id } = await params;
    const body = await req.json();
    
    if (!body.status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        status: body.status as OrderStatus,
      }
    });
    
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Failed to update order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
