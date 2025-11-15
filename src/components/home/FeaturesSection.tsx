'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CalendarCheck, HeartPulse, Utensils } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Utensils className="text-primary-foreground w-6 h-6" />,
    title: 'Personalized Recipes',
    description:
      'AI-curated recipes that match your taste preferences, cooking skills, and dietary restrictions perfectly.',
    color: 'from-emerald-500 to-emerald-600',
    gradient: 'from-emerald-500/10 to-emerald-600/10',
    iconBg: 'bg-emerald-500',
    accent: 'text-emerald-500 dark:text-emerald-400',
    hoverRing: 'ring-emerald-500/40',
  },
  {
    icon: <HeartPulse className="text-primary-foreground w-6 h-6" />,
    title: 'Smart Nutrition',
    description:
      'Keto, vegan, gluten-free, or any diet—get nutritionist-approved plans tailored to your health goals.',
    color: 'from-cyan-500 to-blue-600',
    gradient: 'from-cyan-500/10 to-blue-600/10',
    iconBg: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    accent: 'text-cyan-600 dark:text-cyan-400',
    hoverRing: 'ring-cyan-500/40',
  },
  {
    icon: <CalendarCheck className="text-primary-foreground w-6 h-6" />,
    title: 'Effortless Planning',
    description:
      'Auto-generated grocery lists and meal schedules that save time and eliminate food waste.',
    color: 'from-purple-500 to-purple-600',
    gradient: 'from-purple-500/10 to-purple-600/10',
    iconBg: 'bg-purple-500',
    accent: 'text-purple-600 dark:text-purple-400',
    hoverRing: 'ring-purple-500/40',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24  relative overflow-hidden">
      {/* Background accents using theme tokens */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24px,theme(colors.border/40)_25px),linear-gradient(90deg,transparent_24px,theme(colors.border/40)_25px)] bg-[size:30px_30px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-muted text-foreground border border-border hover:bg-muted/80 transition-colors"
          >
            Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-foreground tracking-tight">
            The Power of{' '}
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Intelligent
            </span>{' '}
            Nutrition
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge AI with nutrition science to create meal plans that fit your
            lifestyle perfectly—no compromises.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-[1px] shadow-2xl transition-all duration-500 hover:scale-[1.03]`}
            >
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${feature.color}`}
              />

              <Card className={`relative overflow-hidden bg-card border border-border rounded-2xl transition-all duration-300 group-hover:border-border/80 ring-2 ring-transparent group-hover:${feature.hoverRing}`}>
                {/* Internal Card Background Accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50`} />
                <div className="absolute -right-16 -bottom-16 w-32 h-32 rounded-full bg-foreground/5 opacity-50 blur-xl" />

                <CardHeader className="pb-4 relative z-10">
                  <div className="mb-4">
                    {/* Icon with Hover Effect */}
                    <div className={`${feature.iconBg} p-4 rounded-xl w-14 h-14 flex items-center justify-center transition-all duration-300 group-hover:scale-[1.08] shadow-xl`}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground tracking-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </CardDescription>
                  {/* Call to Action with Accent Color */}
                  <Link
                    href={`/features#${feature.title.replace(/\s/g, '-').toLowerCase()}`}
                    className={`flex items-center text-sm font-medium ${feature.accent} group-hover:translate-x-1 transition-transform duration-300 w-fit`}
                  >
                    Explore {feature.title.split(' ')[0]} <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Advanced "AI Nutrition Coach" Section */}
        <div className="mt-24">
          <div className="rounded-3xl p-1 bg-gradient-to-r from-primary/30 via-primary/20 to-accent/30 shadow-2xl">
            <div className="bg-card rounded-[calc(1.5rem-1px)] p-8 md:p-12 relative overflow-hidden border border-border">
              {/* Internal Dynamic Background */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_300px_at_75%_50%,theme(colors.primary.DEFAULT),transparent)]" />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24px,theme(colors.border/50)_25px),linear-gradient(90deg,transparent_24px,theme(colors.border/50)_25px)] bg-[size:24px_24px]" />

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div>
                  <Badge className="mb-4 bg-primary/15 text-primary border border-primary/25 hover:bg-primary/25">
                    ⭐ Premium AI Coach
                  </Badge>
                  <h3 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                    Your 24/7 AI Nutrition <span className="text-primary">Companion</span>
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Get personalized advice, meal adjustments, and deep nutrition insights from your
                    AI coach that learns and adapts to your progress and preferences over time.
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm mb-6">
                    <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">Real-Time Feedback</span>
                    <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">Goal Calibration</span>
                    <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">Progress Tracking</span>
                  </div>

                  <Link href="/premium-coach" passHref>
                    <button className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                      Upgrade to Premium <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </Link>
                </div>

                {/* Chat Mockup */}
                <div className="relative h-64 md:h-80 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl" />
                  <div className="w-full max-w-md bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-primary-foreground text-xs font-bold">AI</span>
                      </div>
                      <div className="bg-muted rounded-xl rounded-tl-none p-3 text-foreground/90 text-sm">
                        I noticed you've been skipping breakfast. Would you like me to suggest some quick, protein-rich options that fit your schedule?
                      </div>
                    </div>
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-primary rounded-xl rounded-tr-none p-3 text-primary-foreground text-sm">
                        Yes, please! I need options I can prepare in under 5 minutes.
                      </div>
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-foreground/80 text-xs font-bold">You</span>
                      </div>
                    </div>
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
