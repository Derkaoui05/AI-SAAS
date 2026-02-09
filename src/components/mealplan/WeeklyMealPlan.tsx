import { DAYS_OF_WEEK } from '@/constants/mealplan';
import { Spinner } from '@/components/ui/spinner';
import { WeeklyMealPlan as WeeklyMealPlanType } from '@/types/mealplan';
import { DayCard } from './DayCard';

interface WeeklyMealPlanProps {
  mealPlan?: WeeklyMealPlanType | null;
  isPending: boolean;
  isSuccess: boolean;
}

export function WeeklyMealPlan({ mealPlan, isPending }: WeeklyMealPlanProps) {
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Spinner />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Creating Your Meal Plan</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Our AI is analyzing your preferences and crafting a personalized weekly meal plan just for
          you.
        </p>
      </div>
    );
  }

  if (!mealPlan) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Get Started?</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Fill out the form on the left to generate your personalized weekly meal plan based on your
          dietary preferences and goals.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {DAYS_OF_WEEK.map((day, index) => (
        <DayCard key={day} day={day} index={index} mealPlan={mealPlan[day]} />
      ))}
    </div>
  );
}
