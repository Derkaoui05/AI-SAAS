import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

type AccentType = 'blue' | 'emerald' | 'purple';

type AccentColorStyles = {
  bg: string;
  border: string;
  text: string;
  shadow: string;
};

type TestimonialType = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
  accent: AccentType;
};

const testimonials: TestimonialType[] = [
  {
    name: 'Sarah Johnson',
    role: 'Busy Mom of 3',
    quote:
      "MealPlan has been a lifesaver! My picky eaters actually ask for seconds now, and I've saved hours each week on meal planning.",
    rating: 5,
    avatar: '/nicole.webp',
    accent: 'blue',
  },
  {
    name: 'Michael Chen',
    role: 'Fitness Coach',
    quote:
      'Finally, a meal planner that understands macros and fitness goals. My clients love the variety and I love the results!',
    rating: 5,
    avatar: '/nicole.webp',
    accent: 'emerald',
  },
  {
    name: 'Priya Patel',
    role: 'Plant-Based Foodie',
    quote:
      "The vegetarian options are incredible! I've discovered amazing recipes I never would have found on my own.",
    rating: 5,
    avatar: '/nicole.webp',
    accent: 'purple',
  },
];

const accentColors: Record<AccentType, AccentColorStyles> = {
  blue: {
    bg: 'bg-blue-500/10',
    border: 'ring-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    shadow: 'shadow-blue-500/5',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'ring-emerald-500/20',
    text: 'text-emerald-600 dark:text-emerald-400',
    shadow: 'shadow-emerald-500/5',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'ring-purple-500/20',
    text: 'text-purple-600 dark:text-purple-400',
    shadow: 'shadow-purple-500/5',
  },
};

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_100%_20%,theme(colors.primary.DEFAULT)/8,transparent)]" />
      <div className="absolute top-40 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-64 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(0deg,transparent_24px,theme(colors.border/60)_25px),linear-gradient(90deg,transparent_24px,theme(colors.border/60)_25px)] bg-[size:28px_28px]" />

      {/* Decorative elements */}
      <div className="absolute top-12 left-12 w-24 h-24 border border-primary/20 rounded-lg rotate-12 opacity-20" />
      <div className="absolute bottom-12 right-12 w-32 h-32 border border-accent/20 rounded-full opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-amber-500" />
            Customer Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Loved by <span className="text-amber-500">Thousands</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community of happy customers who've transformed their eating habits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const accentColor = accentColors[testimonial.accent];

            return (
              <div
                key={index}
                className={`group rounded-2xl p-[1px] bg-gradient-to-br from-border via-background to-border shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${accentColor.shadow}`}
              >
                <Card className={`p-8 transition-all duration-300 border border-border bg-card`}>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <div className="relative">
                    <div className={`absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 rounded-full ${accentColor.bg} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl`} />
                  </div>

                  <p className="text-foreground/80 mb-8 text-lg leading-relaxed relative">
                    <Quote className="absolute -top-4 -left-2 w-8 h-8 text-muted-foreground/40" />
                    <span className="italic">{testimonial.quote}</span>
                  </p>

                  <div className="flex items-center mt-auto pt-4 border-t border-border">
                    <div className={`relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-offset-2 ${accentColor.border} ring-offset-background mr-4`}>
                      <Image
                        width={48}
                        height={48}
                        src={testimonial.avatar || '/placeholder.svg'}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      <div className={`${accentColor.text}`}>{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
