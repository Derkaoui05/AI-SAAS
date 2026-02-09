import { CALORIE_LIMITS, FORM_PLACEHOLDERS } from '@/constants/mealplan';
import { Spinner } from '@/components/ui/spinner';
import { MealPlanFormData } from '@/types/mealplan';

interface MealPlanFormProps {
  formData: MealPlanFormData;
  onFormChange: (field: keyof MealPlanFormData, value: string | number | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  error?: Error | null;
}

export function MealPlanForm({
  formData,
  onFormChange,
  onSubmit,
  isPending,
  error,
}: MealPlanFormProps) {
  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-8 sticky top-8">
      <h2 className="text-2xl font-semibold text-primary mb-6">Customize Your Plan</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Diet Type */}
        <div>
          <label htmlFor="dietType" className="block text-sm font-medium text-foreground mb-2">
            Diet Type
          </label>
          <input
            type="text"
            id="dietType"
            value={formData.dietType}
            onChange={(e) => onFormChange('dietType', e.target.value)}
            required
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
            placeholder={FORM_PLACEHOLDERS.DIET_TYPE}
          />
        </div>

        {/* Calories */}
        <div>
          <label htmlFor="calories" className="block text-sm font-medium text-foreground mb-2">
            Daily Calorie Goal
          </label>
          <input
            type="number"
            id="calories"
            value={formData.calories}
            onChange={(e) => onFormChange('calories', Number(e.target.value))}
            required
            min={CALORIE_LIMITS.MIN}
            max={CALORIE_LIMITS.MAX}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
            placeholder={FORM_PLACEHOLDERS.CALORIES}
          />
        </div>

        {/* Allergies */}
        <div>
          <label htmlFor="allergies" className="block text-sm font-medium text-foreground mb-2">
            Allergies or Restrictions
          </label>
          <input
            type="text"
            id="allergies"
            value={formData.allergies}
            onChange={(e) => onFormChange('allergies', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
            placeholder={FORM_PLACEHOLDERS.ALLERGIES}
          />
        </div>

        {/* Preferred Cuisine */}
        <div>
          <label htmlFor="cuisine" className="block text-sm font-medium text-foreground mb-2">
            Preferred Cuisine
          </label>
          <input
            type="text"
            id="cuisine"
            value={formData.cuisine}
            onChange={(e) => onFormChange('cuisine', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder:text-muted-foreground"
            placeholder={FORM_PLACEHOLDERS.CUISINE}
          />
        </div>

        {/* Snacks */}
        <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
          <input
            type="checkbox"
            id="snacks"
            checked={formData.snacks}
            onChange={(e) => onFormChange('snacks', e.target.checked)}
            className="h-5 w-5 accent-primary border-border rounded"
          />
          <label htmlFor="snacks" className="text-sm font-medium text-foreground">
            Include Snacks
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-colors duration-300 ${
            isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isPending ? (
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
      {error && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-destructive rounded-full"></div>
            <span className="text-sm text-destructive font-medium">
              {error.message || 'An unexpected error occurred.'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
