import { MEAL_TYPES } from '@/components/constants/mealplan';
import { DailyMealPlan, MealType } from '@/types/mealplan';

interface MealCardProps {
  mealPlan: DailyMealPlan;
}

export function MealCard({ mealPlan }: MealCardProps) {
  const renderMeal = (mealType: MealType) => {
    const meal = mealPlan[mealType.type];
    if (!meal) return null;

    return (
      <div key={mealType.type} className="bg-card p-4 rounded-lg border border-border">
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-3 h-3 ${mealType.color} rounded-full`}></div>
          <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
            {mealType.label}
          </span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{meal}</p>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-3">
        {renderMeal(MEAL_TYPES[0])} {/* Breakfast */}
        {renderMeal(MEAL_TYPES[1])} {/* Lunch */}
      </div>
      <div className="space-y-3">
        {renderMeal(MEAL_TYPES[2])} {/* Dinner */}
        {renderMeal(MEAL_TYPES[3])} {/* Snacks */}
      </div>
    </div>
  );
}
