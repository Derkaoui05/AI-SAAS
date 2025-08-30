'use client';

import {
  CTASection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  TestimonialsSection,
} from '@/components';
import { useCheckoutConfirmation } from '@/hooks/useCheckoutConfirmation';
import { Suspense } from 'react';

function HomePageClient() {
  // Use custom hook for checkout confirmation logic
  useCheckoutConfirmation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4">
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageClient />
    </Suspense>
  );
}
