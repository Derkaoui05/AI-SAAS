import { API_ENDPOINTS, CALORIE_LIMITS } from '@/components/constants/mealplan';
import {
  MealPlanFormData,
  MealPlanInput,
  MealPlanResponse,
  WeeklyMealPlan,
} from '@/types/mealplan';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useMealPlan() {
  const [savedMealPlan, setSavedMealPlan] = useState<WeeklyMealPlan | null>(null);
  const [formData, setFormData] = useState<MealPlanFormData>({
    dietType: '',
    calories: CALORIE_LIMITS.DEFAULT,
    allergies: '',
    cuisine: '',
    snacks: false,
  });

  const mutation = useMutation<MealPlanResponse, Error, MealPlanInput>({
    mutationFn: async (payload: MealPlanInput) => {
      const response = await fetch(API_ENDPOINTS.GENERATE_MEALPLAN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData: MealPlanResponse = await response.json();
        throw new Error(errorData.error || 'Failed to generate meal plan.');
      }

      const data: MealPlanResponse = await response.json();

      // Persist to server if a plan was generated
      if (data.mealPlan) {
        await fetch(API_ENDPOINTS.SAVE_MEALPLAN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mealPlan: data.mealPlan }),
        });
      }

      return data;
    },
  });

  const handleFormChange = (field: keyof MealPlanFormData, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: MealPlanInput = {
      ...formData,
      days: 7, // Ensure a weekly plan is generated
    };

    mutation.mutate(payload);
  };

  const loadSavedMealPlan = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.SAVE_MEALPLAN, { cache: 'no-store' });
      if (!res.ok) return;

      const json = (await res.json()) as MealPlanResponse;
      if (json.mealPlan) {
        setSavedMealPlan(json.mealPlan);
      }
    } catch (error) {
      console.error('Failed to load saved meal plan:', error);
    }
  };

  // Load last saved meal plan on mount
  useEffect(() => {
    loadSavedMealPlan();
  }, []);

  const currentMealPlan = mutation.data?.mealPlan ?? savedMealPlan;

  return {
    formData,
    handleFormChange,
    handleSubmit,
    mutation,
    currentMealPlan,
    savedMealPlan,
    loadSavedMealPlan,
  };
}
