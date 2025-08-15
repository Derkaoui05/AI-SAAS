import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { session_id } = await request.json();
    if (!session_id) {
      return NextResponse.json({ error: 'session_id is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    const userId = session.metadata?.clerkUserId;
    const planType = session.metadata?.planType ?? null;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId in session metadata' }, { status: 400 });
    }

    const subscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : session.subscription?.id ?? null;

    await prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        email: session.customer_details?.email ?? '',
        subscriptionActive: true,
        subscriptionTier: planType,
        stripeSubscriptionId: subscriptionId ?? null,
      },
      update: {
        email: session.customer_details?.email ?? undefined,
        subscriptionActive: true,
        subscriptionTier: planType,
        stripeSubscriptionId: subscriptionId ?? undefined,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error confirming checkout:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
