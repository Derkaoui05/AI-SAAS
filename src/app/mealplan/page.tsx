// components/MealPlanDashboard.tsx
'use client';

import { Spinner } from '@/components/ui/spinner';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface DailyMealPlan {
  Breakfast?: string;
  Lunch?: string;
  Dinner?: string;
  Snacks?: string;
}

interface WeeklyMealPlan {
  [day: string]: DailyMealPlan;
}

interface MealPlanResponse {
  mealPlan?: WeeklyMealPlan;
  error?: string;
}

interface MealPlanInput {
  dietType: string;
  calories: number;
  allergies: string;
  cuisine: string;
  snacks: boolean;
  days?: number;
}

export default function MealPlanDashboard() {
  const [dietType, setDietType] = useState('');
  const [calories, setCalories] = useState<number>(2000);
  const [allergies, setAllergies] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [snacks, setSnacks] = useState(false);

  // Initialize the mutation using React Query
  const mutation = useMutation<MealPlanResponse, Error, MealPlanInput>({
    mutationFn: async (payload: MealPlanInput) => {
      const response = await fetch('/api/generate-mealplan', {
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

      return response.json();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: MealPlanInput = {
      dietType,
      calories,
      allergies,
      cuisine,
      snacks,
      days: 7, // Ensure a weekly plan is generated
    };

    mutation.mutate(payload);
  };

  // Define the days of the week in order
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Function to retrieve the meal plan for a specific day
  const getMealPlanForDay = (day: string): DailyMealPlan | undefined => {
    if (!mutation.data?.mealPlan) return undefined;

    return mutation.data.mealPlan[day];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">AI-Powered Meal Planning</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get personalized weekly meal plans tailored to your dietary preferences, calorie goals,
            and lifestyle needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel: Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sticky top-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Customize Your Plan</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Diet Type */}
                <div>
                  <label
                    htmlFor="dietType"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Diet Type
                  </label>
                  <input
                    type="text"
                    id="dietType"
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    placeholder="e.g., Vegetarian, Keto, Mediterranean"
                  />
                </div>

                {/* Calories */}
                <div>
                  <label
                    htmlFor="calories"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Daily Calorie Goal
                  </label>
                  <input
                    type="number"
                    id="calories"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    required
                    min={500}
                    max={5000}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    placeholder="e.g., 2000"
                  />
                </div>

                {/* Allergies */}
                <div>
                  <label
                    htmlFor="allergies"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Allergies or Restrictions
                  </label>
                  <input
                    type="text"
                    id="allergies"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    placeholder="e.g., Nuts, Dairy, None"
                  />
                </div>

                {/* Preferred Cuisine */}
                <div>
                  <label
                    htmlFor="cuisine"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Preferred Cuisine
                  </label>
                  <input
                    type="text"
                    id="cuisine"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    placeholder="e.g., Italian, Chinese, No Preference"
                  />
                </div>

                {/* Snacks */}
                <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="snacks"
                    checked={snacks}
                    onChange={(e) => setSnacks(e.target.checked)}
                    className="h-5 w-5 text-blue-600 border-slate-300 rounded "
                  />
                  <label htmlFor="snacks" className="text-sm font-medium text-slate-700">
                    Include Snacks
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={`w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-color duration-500 ${
                    mutation.isPending ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
                  }`}
                >
                  {mutation.isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Spinner />
                      <span>Generating Plan...</span>
                    </div>
                  ) : (
                    'Generate Meal Plan'
                  )}
                </button>
              </form>

              {/* Error Message */}
              {mutation.isError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-red-700 font-medium">
                      {mutation.error?.message || 'An unexpected error occurred.'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Weekly Meal Plan Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Your Weekly Meal Plan</h2>
                {mutation.isSuccess && (
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    ✓ Plan Generated
                  </div>
                )}
              </div>

              {mutation.isSuccess && mutation.data.mealPlan ? (
                <div className="space-y-6">
                  {daysOfWeek.map((day, index) => {
                    const mealPlan = getMealPlanForDay(day);
                    return (
                      <div
                        key={day}
                        className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-slate-800">{day}</h3>
                        </div>

                        {mealPlan ? (
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              {mealPlan.Breakfast && (
                                <div className="bg-white p-4 rounded-lg border border-slate-100">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                      Breakfast
                                    </span>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed">
                                    {mealPlan.Breakfast}
                                  </p>
                                </div>
                              )}

                              {mealPlan.Lunch && (
                                <div className="bg-white p-4 rounded-lg border border-slate-100">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                                    <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                      Lunch
                                    </span>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed">{mealPlan.Lunch}</p>
                                </div>
                              )}
                            </div>

                            <div className="space-y-3">
                              {mealPlan.Dinner && (
                                <div className="bg-white p-4 rounded-lg border border-slate-100">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                                    <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                      Dinner
                                    </span>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed">
                                    {mealPlan.Dinner}
                                  </p>
                                </div>
                              )}

                              {mealPlan.Snacks && (
                                <div className="bg-white p-4 rounded-lg border border-slate-100">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                    <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                      Snacks
                                    </span>
                                  </div>
                                  <p className="text-slate-600 leading-relaxed">
                                    {mealPlan.Snacks}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
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
                  })}
                </div>
              ) : mutation.isPending ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Spinner />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Creating Your Meal Plan
                  </h3>
                  <p className="text-slate-500 text-center max-w-md">
                    Our AI is analyzing your preferences and crafting a personalized weekly meal
                    plan just for you.
                  </p>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-slate-400"
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
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Ready to Get Started?
                  </h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Fill out the form on the left to generate your personalized weekly meal plan
                    based on your dietary preferences and goals.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
