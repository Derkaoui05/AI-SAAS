import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface Params {
  params?: { id?: string };
}

function getIdFromRequest(request: Request, params?: { id?: string }) {
  // Prefer dynamic route param
  if (params?.id) return params.id;
  // Fallbacks: query param or last segment of the path
  try {
    const url = new URL(request.url);
    const idFromQuery = url.searchParams.get('id');
    if (idFromQuery) return idFromQuery;
    const segments = url.pathname.split('/').filter(Boolean);
    const last = segments[segments.length - 1];
    return last;
  } catch {
    return undefined;
  }
}

export async function GET(request: Request, ctx: Params) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = getIdFromRequest(request, ctx.params);
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const item = await prisma.mealPlan.findFirst({
      where: { id, userId: user.id },
      select: { id: true, createdAt: true, plan: true },
    });

    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching meal plan detail:', error);
    return NextResponse.json({ error: 'Failed to fetch meal plan detail' }, { status: 500 });
  }
}

export async function DELETE(request: Request, ctx: Params) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = getIdFromRequest(request, ctx.params);
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const deleted = await prisma.mealPlan.deleteMany({ where: { id, userId: user.id } });
    if (deleted.count === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting meal plan:', error);
    return NextResponse.json({ error: 'Failed to delete meal plan' }, { status: 500 });
  }
}
