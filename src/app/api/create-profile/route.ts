import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: 'user not found in Clerk' }, { status: 404 });
    }
    const email = clerkUser?.emailAddresses[0]?.emailAddress || '';
    if (!email) {
      return NextResponse.json({ error: 'user does not have en email address' }, { status: 400 });
    }
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: clerkUser.id },
    });

    if (existingProfile) {
      return NextResponse.json({ message: 'Profile already exists' });
    }
    await prisma.profile.create({
      data: {
        userId: clerkUser.id,
        email,
        subscriptionTier: null,
        stripeSubscriptionId: null,
        subscriptionActive: false,
      },
    });
    return NextResponse.json({ message: 'Profile created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
