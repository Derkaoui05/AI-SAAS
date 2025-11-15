import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden ">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,theme(colors.primary.DEFAULT)/12,transparent)]" />

      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl p-[1px] bg-gradient-to-r from-primary/30 via-primary/20 to-accent/30 shadow-2xl relative overflow-hidden">
          <div className="bg-card rounded-[calc(1.5rem-1px)] p-12 md:p-16 text-foreground relative overflow-hidden border border-border">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(0deg,transparent_24px,theme(colors.border/50)_25px),linear-gradient(90deg,transparent_24px,theme(colors.border/50)_25px)] bg-[size:30px_30px]" />
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(600px_400px_at_70%_-10%,theme(colors.primary.DEFAULT)/25,transparent)]" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(600px_400px_at_10%_100%,theme(colors.accent.DEFAULT)/25,transparent)]" />

            {/* Floating shapes */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" />

            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-24 h-24 border border-primary/20 rounded-lg rotate-12 opacity-30" />
            <div className="absolute bottom-8 left-8 w-32 h-32 border border-accent/20 rounded-full opacity-30" />

            <div className="relative max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Limited Time Offer</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                  Ready to Transform Your
                  <span className="relative ml-2">
                    <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Kitchen?
                    </span>
                    <span className="absolute -bottom-1 left-0 w-full h-3 bg-gradient-to-r from-primary/30 to-accent/30 blur-sm"></span>
                  </span>
                </h2>

                <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
                  Join thousands of users who are eating better, saving time, and loving their meals
                  with AI-powered planning
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 w-full max-w-2xl">
                  <div className="flex items-start gap-3 group">
                    <div className="bg-accent/20 rounded-lg p-2 group-hover:bg-accent/30 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-accent-foreground flex-shrink-0" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-foreground">Personalized Meal Plans</h3>
                      <p className="text-muted-foreground text-sm">Tailored to your dietary needs and preferences</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="bg-accent/20 rounded-lg p-2 group-hover:bg-accent/30 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-accent-foreground flex-shrink-0" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-foreground">Smart Grocery Lists</h3>
                      <p className="text-muted-foreground text-sm">Automatically generated based on your meal plan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="bg-accent/20 rounded-lg p-2 group-hover:bg-accent/30 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-accent-foreground flex-shrink-0" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-foreground">Time-Saving Recipes</h3>
                      <p className="text-muted-foreground text-sm">Quick and easy meals for busy schedules</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="bg-accent/20 rounded-lg p-2 group-hover:bg-accent/30 transition-colors duration-300">
                      <CheckCircle className="w-5 h-5 text-accent-foreground flex-shrink-0" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-foreground">Nutrition Tracking</h3>
                      <p className="text-muted-foreground text-sm">Monitor your intake and meet your health goals</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 w-full max-w-md">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md w-full relative overflow-hidden group">
                  <Link href="/sign-up" className="flex items-center justify-center">
                    <span className="relative z-10">Start Your Free Trial</span>
                    <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <p>No credit card required • 7-day free trial • Cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
