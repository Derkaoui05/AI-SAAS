import { DailyMealPlan } from '@/types/mealplan';
import { MealCard } from './MealCard';

interface DayCardProps {
  day: string;
  index: number;
  mealPlan?: DailyMealPlan;
}

export function DayCard({ day, index, mealPlan }: DayCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
          {index + 1}
        </div>
        <h3 className="text-xl font-bold text-foreground">{day}</h3>
      </div>

      {mealPlan ? (
        <MealCard mealPlan={mealPlan} />
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-muted-foreground">No meal plan available for this day.</p>
        </div>
      )}
    </div>
  );
}
