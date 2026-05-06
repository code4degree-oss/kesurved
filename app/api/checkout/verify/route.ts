import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderPayload
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) throw new Error('Razorpay secret not configured');

    // 1. Verify signature FIRST — reject if invalid
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // 2. Signature is valid — payment is confirmed. Now create the order in DB.
    if (!orderPayload) {
      return NextResponse.json({ error: 'Missing order payload' }, { status: 400 });
    }

    // 3. Re-validate the total server-side to prevent amount tampering
    const productIds = orderPayload.orderItemsData.map((item: any) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    let verifiedTotal = 0;
    for (const item of orderPayload.orderItemsData) {
      const product = dbProducts.find((p: any) => p.id === item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
      }
      const expectedPrice = product.salePrice || product.price;
      if (Math.abs(expectedPrice - item.priceAtPurchase) > 0.01) {
        return NextResponse.json({ error: 'Price mismatch detected. Please retry checkout.' }, { status: 400 });
      }
      verifiedTotal += expectedPrice * item.quantity;
    }
    verifiedTotal += orderPayload.deliveryCharge;

    if (Math.abs(verifiedTotal - orderPayload.total) > 1) {
      return NextResponse.json({ error: 'Total amount mismatch. Please retry checkout.' }, { status: 400 });
    }

    // 4. Generate orderNumber
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}${mm}${dd}`;

    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    
    const orderCountToday = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfDay
        }
      }
    });

    const runningNumber = 1001 + orderCountToday;
    const orderNumber = `KV${dateStr}${runningNumber}`;

    // 5. Create the order NOW — payment is verified
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: orderPayload.customerId,
        status: 'NEW',
        total: orderPayload.total,
        deliveryCharge: orderPayload.deliveryCharge,
        totalWeightGrams: orderPayload.totalWeightGrams,
        paymentMethod: 'ONLINE',
        shippingName: orderPayload.shippingName,
        shippingPhone: orderPayload.shippingPhone,
        shippingAddress1: orderPayload.shippingAddress1,
        shippingAddress2: orderPayload.shippingAddress2,
        shippingCity: orderPayload.shippingCity,
        shippingState: orderPayload.shippingState,
        shippingPincode: orderPayload.shippingPincode,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature,
        items: {
          create: orderPayload.orderItemsData.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
            weightGrams: item.weightGrams,
          }))
        }
      }
    });

    return NextResponse.json({ success: true, order_id: order.id });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
