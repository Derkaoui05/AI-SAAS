import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature || '', webhookSecret || '');
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      default:
        break;
    }
  } catch (error) {
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
  const subscriptionId =
    typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription?.id ?? null;

  if (!subscriptionId) {
    console.log('No subscriptionId found in session');
    return;
  }

  try {
    await prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        email: session.customer_details?.email ?? '',
        subscriptionActive: true,
        subscriptionTier: session.metadata?.planType || null,
        stripeSubscriptionId: subscriptionId,
      },
      update: {
        email: session.customer_details?.email ?? undefined,
        subscriptionActive: true,
        subscriptionTier: session.metadata?.planType || null,
        stripeSubscriptionId: subscriptionId,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}
