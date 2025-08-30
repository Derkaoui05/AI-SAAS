# Footer Components

This directory contains the refactored footer components following clean code principles and best practices.

## Architecture Overview

The footer functionality has been refactored from a single large component into smaller, focused components with clear separation of concerns.

## Component Structure

### Core Components

- **`FooterBackground`** - Handles the decorative background elements (SVG wave and blur effects)
- **`FooterBrand`** - Displays the brand logo and name
- **`FooterHero`** - Contains the main footer content (tagline, brand, newsletter)
- **`FooterLinks`** - Manages the navigation links organized by category
- **`FooterNewsletter`** - Handles the newsletter subscription form
- **`FooterSocial`** - Displays social media links
- **`FooterBottom`** - Contains copyright and legal links

### Main Component

- **`MainFooter`** - Orchestrates all footer components and provides the main footer structure

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

- **Type Safety**: Better TypeScript support with focused components
- **Reusability**: Components can be reused in other parts of the app
- **Consistency**: Centralized patterns and styling
- **Error Handling**: Better error boundaries and user feedback

## Usage Example

```tsx
import MainFooter from '@/components/Footer';

function Layout() {
  return (
    <div>
      {/* Other content */}
      <MainFooter />
    </div>
  );
}
```

## File Structure

```
src/
├── components/
│   ├── Footer.tsx              (Main footer component)
│   └── footer/
│       ├── FooterBackground.tsx
│       ├── FooterBottom.tsx
│       ├── FooterBrand.tsx
│       ├── FooterHero.tsx
│       ├── FooterLinks.tsx
│       ├── FooterNewsletter.tsx
│       ├── FooterSocial.tsx
│       ├── index.ts
│       └── README.md
```

## Best Practices Applied

1. **Separation of Concerns**: UI, layout, and functionality are separated
2. **Single Responsibility Principle**: Each component has one clear purpose
3. **Component Composition**: Small, focused components that compose together
4. **Type Safety**: Proper TypeScript interfaces and props
5. **Accessibility**: Proper ARIA labels and semantic HTML
6. **Performance**: Optimized re-renders and state management
7. **Maintainability**: Easy to modify individual sections
8. **Reusability**: Components can be used in other contexts

## Component Details

### FooterBackground

- Handles decorative SVG wave at the top
- Manages blur effects and background elements
- Pure presentational component

### FooterBrand

- Displays the ChefHat icon and "PurePLate" text
- Simple branding component

### FooterHero

- Contains the main footer message and newsletter
- Composes FooterBrand and FooterNewsletter

### FooterLinks

- Dynamically generates link groups (Explore, Guides, Company)
- Handles both internal and external links
- Configurable link structure

### FooterNewsletter

- Newsletter subscription form
- Email input and subscribe button
- Form validation ready

### FooterSocial

- Social media links (GitHub, Instagram)
- Configurable social platforms
- Proper external link handling

### FooterBottom

- Copyright information
- Legal links (Terms, Privacy, Cookies)
- Responsive layout
