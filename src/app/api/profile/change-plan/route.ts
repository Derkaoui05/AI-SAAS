import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { getPriceIdFromType } from '@//lib/plans';

export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { newPlan } = await request.json();
    if (!newPlan) {
      return NextResponse.json({ error: 'New plan is required' });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: clerkUser.id },
    });
    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' });
    }
    if (!profile.stripeSubscriptionId) {
      return NextResponse.json({ error: 'no active subscription found' });
    }
    const subscriptionId = profile.stripeSubscriptionId;
    const subscriptionItemId = await stripe.subscriptions.retrieve(subscriptionId);
    if (!subscriptionItemId) {
      return NextResponse.json({ error: 'Subscription not found' });
    }

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      items: [
        {
          id: subscriptionItemId.items.data[0].id,
          price: getPriceIdFromType(newPlan),
        },
      ],
      proration_behavior: 'create_prorations',
    });
    await prisma.profile.update({
      where: { userId: clerkUser.id },
      data: {
        subscriptionTier: newPlan,
        stripeSubscriptionId: updatedSubscription.id,
        subscriptionActive: true,
      },
    });

    return NextResponse.json({
      subscription: updatedSubscription,
    });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    return NextResponse.json({ error: 'Failed to fetch subscription status' }, { status: 500 });
  }
}
