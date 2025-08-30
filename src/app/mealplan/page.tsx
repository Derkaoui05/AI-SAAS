'use client';

import { MealPlanForm, MealPlanHeader, WeeklyMealPlan } from '@/components/mealplan';
import { useMealPlan } from '@/hooks/useMealPlan';

export default function MealPlanDashboard() {
  const { formData, handleFormChange, handleSubmit, mutation, currentMealPlan } = useMealPlan();

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
            <MealPlanForm
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleSubmit}
              isPending={mutation.isPending}
              error={mutation.error}
            />
          </div>

          {/* Right Panel: Weekly Meal Plan Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <MealPlanHeader isSuccess={mutation.isSuccess} />
              <WeeklyMealPlan
                mealPlan={currentMealPlan}
                isPending={mutation.isPending}
                isSuccess={mutation.isSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
