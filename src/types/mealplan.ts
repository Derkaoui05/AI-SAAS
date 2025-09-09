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

export interface MealPlanListItem {
  id: string;
  createdAt: string | Date;
  plan: WeeklyMealPlan;
}

export interface MealPlanListResponse {
  items: MealPlanListItem[];
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
