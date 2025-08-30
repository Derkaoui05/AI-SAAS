import { DayOfWeek, MealType } from '@/types/mealplan';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const MEAL_TYPES: MealType[] = [
  {
    type: 'Breakfast',
    label: 'Breakfast',
    color: 'bg-yellow-400',
    icon: '🌅',
  },
  {
    type: 'Lunch',
    label: 'Lunch',
    color: 'bg-orange-400',
    icon: '☀️',
  },
  {
    type: 'Dinner',
    label: 'Dinner',
    color: 'bg-purple-400',
    icon: '🌙',
  },
  {
    type: 'Snacks',
    label: 'Snacks',
    color: 'bg-green-400',
    icon: '🍎',
  },
];

export const CALORIE_LIMITS = {
  MIN: 500,
  MAX: 5000,
  DEFAULT: 2000,
} as const;

export const FORM_PLACEHOLDERS = {
  DIET_TYPE: 'e.g., Vegetarian, Keto, Mediterranean',
  CALORIES: 'e.g., 2000',
  ALLERGIES: 'e.g., Nuts, Dairy, None',
  CUISINE: 'e.g., Italian, Chinese, No Preference',
} as const;

export const API_ENDPOINTS = {
  GENERATE_MEALPLAN: '/api/generate-mealplan',
  SAVE_MEALPLAN: '/api/mealplan',
} as const;
