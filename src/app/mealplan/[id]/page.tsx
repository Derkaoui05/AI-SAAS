'use client';

import { WeeklyMealPlan as WeeklyMealPlanView } from '@/components/mealplan';
import { Spinner } from '@/components/ui/spinner';
import type { WeeklyMealPlan } from '@/types/mealplan';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

export default function MealPlanDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['mealplan-detail', id],
    queryFn: async () => {
      const res = await fetch(`/api/mealplan/${id}`, { cache: 'no-store' });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Failed to fetch meal plan');
      }
      return (await res.json()) as { id: string; createdAt: string; plan: WeeklyMealPlan };
    },
    enabled: Boolean(id),
    staleTime: 0,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="px-3 py-2 rounded-md text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-slate-800">Meal Plan Details</h1>
          <div />
        </div>

        {isLoading ? (
          <div className="flex items-center space-x-3 text-slate-600">
            <Spinner />
            <span>Loading meal plan…</span>
          </div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {(error as Error)?.message}
          </div>
        ) : data ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            <div className="mb-4">
              <p className="text-sm text-slate-500">Generated</p>
              <p className="font-medium text-slate-800">
                {new Date(data.createdAt).toLocaleString()}
              </p>
            </div>
            <WeeklyMealPlanView mealPlan={data.plan} isPending={false} isSuccess={true} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
