import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Sparkles, Star, Users } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden  min-h-[85vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Background Gradients/Mesh */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Subtle radial gradient at the top using primary token */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        {/* Subtle mesh/noise effect */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.05" className="fill-background" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left column - Text content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="bg-muted text-foreground border border-border hover:bg-muted/80 transition-colors cursor-pointer mx-auto lg:mx-0 shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              AI-Powered Nutrition <span className="text-primary ml-1">2.0</span>
            </Badge>

            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-foreground">
                Your Perfect
                <span className="block relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Meal Plan
                </span>
              </h1>
              <h2 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold text-foreground/90">
                Awaits You
              </h2>
            </div>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed mx-auto lg:mx-0">
              Transform your eating habits with intelligent, personalized meal planning. Smart
              grocery lists, nutrition tracking, and effortless cooking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all shadow-md"
              >
                <Link href="/sign-up" className="flex items-center">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hover:bg-accent hover:text-accent-foreground"
              >
                <Link href="#demo">Watch Demo</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="pt-8 border-t border-border flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
              {[
                { icon: Users, value: '50K+', label: 'Happy Users' },
                { icon: Star, value: '4.9/5', label: 'App Rating' },
                { icon: Clock, value: '5+ Hours', label: 'Saved Weekly' },
              ].map((stat, index) => (
                <div key={index} className="text-center transition-all hover:scale-[1.03]">
                  <div className="flex items-center justify-center gap-2 text-primary mb-1">
                    <stat.icon className="w-5 h-5" />
                    <span className="text-xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image (Mockup) */}
          <div className="lg:col-span-6 relative hidden lg:flex justify-center">
            {/* Floating Card Design */}
            <div className="relative bg-card border border-border rounded-[2rem] p-4 shadow-2xl">
              <div className="aspect-[3/4] w-[320px] rounded-3xl overflow-hidden relative border border-border/80">
                {/* Placeholder for actual image/mockup */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm p-6">
                  <p className="text-lg font-semibold text-primary mb-2">The Perfect Meal Plan</p>
                  <ul className="list-none space-y-2 text-muted-foreground text-left w-full max-w-xs">
                    <li className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" /> Macros Calculated
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-pink-500" /> Flavor Profile Match
                    </li>
                    <li className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-green-500" /> 30 Min Prep Time
                    </li>
                  </ul>
                </div>
                {/* Subtle ring */}
                <div className="absolute inset-0 border-4 border-primary/30 rounded-3xl animate-pulse" />
              </div>

              {/* Floating UI element */}
              <div className="absolute -right-8 -top-8 bg-card/90 backdrop-blur-sm border border-border rounded-xl p-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">New</p>
                    <p className="text-sm font-medium text-foreground">Smart Planner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
