import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const latest = await prisma.mealPlan.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: { plan: true },
    });

    return NextResponse.json({ mealPlan: latest?.plan ?? null });
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    return NextResponse.json({ error: 'Failed to fetch meal plan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body?.mealPlan) {
      return NextResponse.json({ error: 'Missing mealPlan' }, { status: 400 });
    }

    const created = await (prisma).mealPlan.create({
      data: { userId: user.id, plan: body.mealPlan },
      select: { id: true },
    });

    return NextResponse.json({ id: created.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving meal plan:', error);
    return NextResponse.json({ error: 'Failed to save meal plan' }, { status: 500 });
  }
}
