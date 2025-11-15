'use client';

import { WeeklyMealPlan as WeeklyMealPlanView } from '@/components/mealplan';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import type { WeeklyMealPlan } from '@/types/mealplan';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

export default function MealPlanDetailPage() {
  const params = useParams<{ id: string | string[] }>();
  const router = useRouter();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const hasValidId = typeof id === 'string' && id.length > 0;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['mealplan-detail', id],
    queryFn: async () => {
      const res = await fetch(`/api/mealplan/${encodeURIComponent(id!)}`, { cache: 'no-store' });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Failed to fetch meal plan');
      }
      return (await res.json()) as { id: string; createdAt: string; plan: WeeklyMealPlan };
    },
    enabled: hasValidId,
    staleTime: 0,
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(0deg,transparent_24px,theme(colors.border/60)_25px),linear-gradient(90deg,transparent_24px,theme(colors.border/60)_25px)] bg-[size:28px_28px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-10 px-4">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" onClick={() => router.back()} className="px-3 h-9">
            ← Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Meal Plan Details</h1>
          <div />
        </div>

        {!hasValidId ? (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-4">
            Invalid or missing meal plan ID.
          </div>
        ) : isLoading ? (
          <div className="flex items-center space-x-3 text-muted-foreground">
            <Spinner />
            <span>Loading meal plan…</span>
          </div>
        ) : isError ? (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-4">
            {(error as Error)?.message}
          </div>
        ) : data ? (
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Generated</p>
              <p className="font-medium text-foreground">{new Date(data.createdAt).toLocaleString()}</p>
            </div>
            <WeeklyMealPlanView mealPlan={data.plan} isPending={false} isSuccess={true} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
