import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Ensure this route runs on the Node.js runtime (Stripe SDK requires Node APIs)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Configure webhook route to handle raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  console.log('Webhook received');

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  console.log('Webhook secret exists:', !!webhookSecret);
  console.log('Signature exists:', !!signature);

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature || '', webhookSecret);
    console.log('Webhook event verified:', event.type);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        console.log('Processing checkout.session.completed event');
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'invoice.payment_failed': {
        console.log('Processing invoice.payment_succeeded event');
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      case 'customer.subscription.deleted': {
        console.log('Processing customer.subscription.deleted event');
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      default:
        console.log('Unhandled event type:', event.type);
        break;
    }
  } catch (error) {
    console.error('Error handling webhook event:', error);
    return NextResponse.json({ error: 'Internal Server Error webhook' }, { status: 500 });
  }

  console.log('Webhook processed successfully');
  return NextResponse.json({ received: true });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Handling checkout session completed:', session.id);

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

  console.log('Updating profile for userId:', userId, 'subscriptionId:', subscriptionId);

  try {
    const result = await prisma.profile.upsert({
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

    console.log('Profile updated successfully:', result);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}
type InvoiceWithSubscription = Stripe.Invoice & {
  subscription?: string | Stripe.Subscription | null;
};

async function handleInvoicePaymentFailed(invoice: InvoiceWithSubscription) {
  console.log('Invoice payment failed for invoice:', invoice.id);

  const subscriptionId =
  typeof invoice.subscription === "string"
    ? invoice.subscription
    : invoice.subscription?.id ?? null;

  if (!subscriptionId) {
    console.log('No subscription ID found in invoice');
    return;
  }

  let userId: string | undefined;
  try {
    const profile = await prisma.profile.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      select: { userId: true },
    });
    if (!profile?.userId) {
      console.log('No profile found for subscription');
      return;
    }
    userId = profile.userId;
  } catch (error) {
    console.error('Error retrieving userId from profile:', error);
    return;
  }

  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        subscriptionActive: false,
      },
    });
    console.log(`Subscription for user ${userId} marked inactive.`);
  } catch (error) {
    console.error('Error updating profile subscription status:', error);
  }
}


async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Processing subscription deletion:', subscription.id);

  try {
    const profile = await prisma.profile.findFirst({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (profile) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: {
          subscriptionActive: false,
          subscriptionTier: null,
          stripeSubscriptionId: null,
        },
      });
      console.log('Profile subscription deactivated');
    }
  } catch (error) {
    console.error('Error deactivating subscription:', error);
  }
}
