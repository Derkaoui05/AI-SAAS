# MealPlan Components

This directory contains the refactored mealplan components following clean code principles and best practices.

## Architecture Overview

The mealplan functionality has been refactored from a single large component into smaller, focused components with clear separation of concerns.

## Component Structure

### Core Components

- **`MealPlanForm`** - Handles the meal plan customization form
- **`MealCard`** - Displays individual meal information (breakfast, lunch, dinner, snacks)
- **`DayCard`** - Represents a single day's meal plan
- **`WeeklyMealPlan`** - Manages the weekly meal plan display and loading states
- **`MealPlanHeader`** - Shows the meal plan title and success status

### Custom Hooks

- **`useMealPlan`** - Manages all meal plan business logic, state, and API calls

### Types & Constants

- **`types/mealplan.ts`** - All TypeScript interfaces and types
- **`constants/mealplan.ts`** - Centralized constants and configuration

## Benefits of Refactoring

### Performance Improvements

- **Component Isolation**: Each component can be optimized independently
- **Reduced Re-renders**: Smaller components with focused state
- **Lazy Loading**: Components can be loaded on-demand
- **Better Tree Shaking**: Unused components can be eliminated

### Maintainability Improvements

- **Single Responsibility**: Each component has one clear purpose
- **Easier Testing**: Components can be tested in isolation
- **Better Debugging**: Issues are easier to locate
- **Team Collaboration**: Multiple developers can work on different components

### Code Quality

- **Type Safety**: Improved TypeScript interfaces and types
- **Reusability**: Components can be reused in other parts of the app
- **Consistency**: Centralized constants and patterns
- **Error Handling**: Better error boundaries and user feedback

## Usage Example

```tsx
import { useMealPlan } from '@/hooks/useMealPlan';
import { MealPlanForm, WeeklyMealPlan } from '@/components/mealplan';

function MealPlanPage() {
  const { formData, handleFormChange, handleSubmit, mutation, currentMealPlan } = useMealPlan();

  return (
    <div>
      <MealPlanForm
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        isPending={mutation.isPending}
        error={mutation.error}
      />
      <WeeklyMealPlan
        mealPlan={currentMealPlan}
        isPending={mutation.isPending}
        isSuccess={mutation.isSuccess}
      />
    </div>
  );
}
```

## File Structure

```
src/
├── components/
│   └── mealplan/
│       ├── MealPlanForm.tsx
│       ├── MealCard.tsx
│       ├── DayCard.tsx
│       ├── WeeklyMealPlan.tsx
│       ├── MealPlanHeader.tsx
│       ├── index.ts
│       └── README.md
├── hooks/
│   └── useMealPlan.ts
├── types/
│   └── mealplan.ts
└── constants/
    └── mealplan.ts
```

## Best Practices Applied

1. **Separation of Concerns**: UI, business logic, and data management are separated
2. **Single Responsibility Principle**: Each component has one clear purpose
3. **Custom Hooks**: Business logic extracted into reusable hooks
4. **Type Safety**: Comprehensive TypeScript interfaces and types
5. **Constants**: Magic numbers and strings extracted to constants
6. **Component Composition**: Small, focused components that compose together
7. **Error Handling**: Proper error boundaries and user feedback
8. **Performance**: Optimized re-renders and state updates
