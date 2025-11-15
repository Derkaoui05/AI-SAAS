'use client';

import { MealPlanForm, MealPlanHeader, WeeklyMealPlan } from '@/components/mealplan';
import { useMealPlan } from '@/hooks/useMealPlan';

export default function MealPlanDashboard() {
  const { formData, handleFormChange, handleSubmit, mutation, currentMealPlan } = useMealPlan();

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(0deg,transparent_24px,theme(colors.border/60)_25px),linear-gradient(90deg,transparent_24px,theme(colors.border/60)_25px)] bg-[size:28px_28px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-10 px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">AI-Powered Meal Planning</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            <div className="bg-card rounded-2xl shadow-sm border border-border p-8">
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
    </section>
  );
}
