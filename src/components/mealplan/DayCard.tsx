import { DailyMealPlan } from '@/types/mealplan';
import { MealCard } from './MealCard';

interface DayCardProps {
  day: string;
  index: number;
  mealPlan?: DailyMealPlan;
}

export function DayCard({ day, index, mealPlan }: DayCardProps) {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {index + 1}
        </div>
        <h3 className="text-xl font-bold text-slate-800">{day}</h3>
      </div>

      {mealPlan ? (
        <MealCard mealPlan={mealPlan} />
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <p className="text-slate-500">No meal plan available for this day.</p>
        </div>
      )}
    </div>
  );
}
