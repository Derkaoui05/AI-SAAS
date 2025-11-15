'use client';

import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, HeartPulse, Utensils } from 'lucide-react';

const steps = [
  {
    icon: <CheckCircle2 className="text-primary-foreground" size={28} />,
    title: 'Create Your Profile',
    description:
      'Tell us about your dietary preferences, allergies, health goals, and cooking experience.',
    color: 'bg-primary',
    gradient: 'from-primary/20 to-accent/20',
  },
  {
    icon: <Utensils className="text-primary-foreground" size={28} />,
    title: 'Customize Your Plan',
    description:
      'Select cuisines, cooking time, portion sizes, and any specific ingredients you love or avoid.',
    color: 'bg-accent',
    gradient: 'from-accent/20 to-primary/20',
  },
  {
    icon: <HeartPulse className="text-primary-foreground" size={28} />,
    title: 'Receive & Enjoy',
    description:
      'Get your weekly plan with detailed recipes, nutrition info, and organized shopping lists.',
    color: 'bg-secondary',
    gradient: 'from-secondary/20 to-accent/20',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24  relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_100%,var(--primary)_0%,transparent_70%)] opacity-20" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(0deg,transparent_24px,var(--muted-foreground)_25px),linear-gradient(90deg,transparent_24px,var(--muted-foreground)_25px)] bg-[size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Get Started in <span className="text-primary">Minutes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personalized meal plan is just three steps away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="rounded-xl p-[1px] bg-gradient-to-br from-primary/50 via-background to-primary/50 shadow-xl group-hover:shadow-primary/40 transition-all duration-300">
                <div className="bg-card border border-border rounded-[calc(0.75rem-1px)] p-6 h-full relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`${step.color} rounded-xl h-14 w-14 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 shadow-foreground/10`}>
                        {step.icon}
                      </div>
                      <Badge className="bg-muted text-muted-foreground hover:bg-muted/80">Step {index + 1}</Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>

              {index < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 z-10 transform -translate-y-1/2">
                  <div className="bg-card rounded-full p-2 border border-border shadow-md">
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </div>
      </div>
    </section>
  );
}
