import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  console.log(webhookSecret);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature || '', webhookSecret || '');
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }
  try {
  switch (event.type) {
    case 'checkout.session.completed':{

      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
    }
    case 'invoice.payment_failed':{

      const session = event.data.object as Stripe.Invoice;
      await handleInvoicePaymentFailed(session);
    }
    case 'customer.subscription.deleted':{
      const session = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(session);
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }}catch(error) {
    console.error('Error handling event:', error);
    return NextResponse.json({ error: 'Internal Server Error webhook' }, { status: 400 });
  }
  return NextResponse.json({});
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.clerkUserId;
 if (!userId) {
  console.log('No userId found in session metadata');
  return;
 }
 const subscriptionId = session.subscription as string;

 if (!subscriptionId) {
  console.log('No subscriptionId found in session');
  return;
 }

  try{
    await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        stripeSubscriptionId: subscriptionId,
        subscriptionActive: true,
        subscriptionTier: session.metadata?.planType || null,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}
