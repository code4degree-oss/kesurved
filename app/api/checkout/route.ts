import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const { customer, items } = await req.json();

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay credentials not configured');
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // 1. Calculate total from DB prices to prevent tampering
    let total = 0;
    let totalWeightGrams = 0;
    
    const productIds = items.map((item: any) => item.id);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } }
    });

    const orderItemsData = items.map((item: any) => {
      const product = dbProducts.find(p => p.id === item.id);
      if (!product) throw new Error(`Product not found: ${item.id}`);
      
      const priceAtPurchase = product.salePrice || product.price;
      total += priceAtPurchase * item.quantity;
      totalWeightGrams += product.weightGrams * item.quantity;
      
      return {
        productId: product.id,
        quantity: item.quantity,
        priceAtPurchase,
        weightGrams: product.weightGrams * item.quantity
      };
    });

    // 2. Calculate dynamic delivery charge based on state
    let deliveryCharge = 0;
    if (customer.state) {
      const zones = await prisma.deliveryZone.findMany();
      let maharashtra = 50;
      let outside = 80;

      zones.forEach(z => {
        if (z.zone === 'maharashtra') maharashtra = z.charge;
        if (z.zone === 'outside_maharashtra') outside = z.charge;
      });

      if (customer.state.toLowerCase() === 'maharashtra') {
        deliveryCharge = maharashtra;
      } else {
        deliveryCharge = outside;
      }
    }
    
    total += deliveryCharge;

    // 3. Create or Update Customer
    let dbCustomer = await prisma.customer.findUnique({
      where: { phone: customer.mobile }
    });

    if (dbCustomer) {
      dbCustomer = await prisma.customer.update({
        where: { id: dbCustomer.id },
        data: {
          name: customer.name,
          addressLine1: customer.addressLine1,
          addressLine2: customer.addressLine2,
          addressLine3: customer.addressLine3,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
        }
      });
    } else {
      dbCustomer = await prisma.customer.create({
        data: {
          phone: customer.mobile,
          name: customer.name,
          addressLine1: customer.addressLine1,
          addressLine2: customer.addressLine2,
          addressLine3: customer.addressLine3,
          city: customer.city,
          state: customer.state,
          pincode: customer.pincode,
        }
      });
    }

    // 4. Create Order
    const order = await prisma.order.create({
      data: {
        customerId: dbCustomer.id,
        status: 'NEW',
        total: total,
        deliveryCharge: deliveryCharge,
        totalWeightGrams: totalWeightGrams,
        paymentMethod: 'ONLINE',
        shippingName: customer.name,
        shippingPhone: customer.mobile,
        shippingAddress1: customer.addressLine1,
        shippingAddress2: customer.addressLine2,
        shippingCity: customer.city || 'Not Provided',
        shippingState: customer.state || 'Not Provided',
        shippingPincode: customer.pincode,
        items: {
          create: orderItemsData
        }
      }
    });

    // 4. Create Razorpay Order
    const rpOptions = {
      amount: Math.round(total * 100), // in paise
      currency: 'INR',
      receipt: order.id,
    };
    
    const rpOrder = await razorpay.orders.create(rpOptions);

    return NextResponse.json({
      order_id: rpOrder.id,
      amount: rpOptions.amount,
      currency: rpOptions.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
      local_order_id: order.id
    });

  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'An error occurred during checkout' }, { status: 500 });
  }
}
