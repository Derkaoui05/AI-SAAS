export interface DailyMealPlan {
  Breakfast?: string;
  Lunch?: string;
  Dinner?: string;
  Snacks?: string;
}

export interface WeeklyMealPlan {
  [day: string]: DailyMealPlan;
}

export interface MealPlanResponse {
  mealPlan?: WeeklyMealPlan;
  error?: string;
}

export interface MealPlanInput {
  dietType: string;
  calories: number;
  allergies: string;
  cuisine: string;
  snacks: boolean;
  days?: number;
}

export interface MealPlanFormData {
  dietType: string;
  calories: number;
  allergies: string;
  cuisine: string;
  snacks: boolean;
}

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface MealType {
  type: keyof DailyMealPlan;
  label: string;
  color: string;
  icon: string;
}
