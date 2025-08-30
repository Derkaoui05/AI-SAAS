interface MealPlanHeaderProps {
  isSuccess: boolean;
}

export function MealPlanHeader({ isSuccess }: MealPlanHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-slate-800">Your Weekly Meal Plan</h2>
      {isSuccess && (
        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          ✓ Plan Generated
        </div>
      )}
    </div>
  );
}
