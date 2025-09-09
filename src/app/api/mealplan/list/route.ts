import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const plans = await prisma.mealPlan.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: { id: true, createdAt: true, plan: true },
    });

    return NextResponse.json({ items: plans });
  } catch (error) {
    console.error('Error listing meal plans:', error);
    return NextResponse.json({ error: 'Failed to list meal plans' }, { status: 500 });
  }
}
