'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  HeartPulse,
  Quote,
  Sparkles,
  Star,
  Users,
  Utensils,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function HomePageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) return;

    async function confirm() {
      try {
        await fetch('/api/checkout/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        router.replace('/');
      } catch {
        router.replace('/');
      }
    }

    confirm();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10" />
        <div className="relative px-4 py-16 sm:py-24 lg:py-32 max-w-7xl mx-auto">
          <div className="text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Nutrition
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Meal Plan
              </span>
              Awaits
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-emerald-50 leading-relaxed">
              Transform your eating habits with AI-powered meal planning. Personalized recipes,
              smart grocery lists, and nutrition tracking—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
              >
                <Link href="/sign-up" className="flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 bg-transparent"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-emerald-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>50K+ Happy Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Save 5+ Hours/Week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
              Why Choose MealPlan?
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Nutrition Made Simple
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine cutting-edge AI with nutrition science to create meal plans that fit your
              lifestyle perfectly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-white to-emerald-50/50">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="text-white" size={28} />
                </div>
                <CardTitle className="text-2xl mb-2">Personalized Recipes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  AI-curated recipes that match your taste preferences, cooking skills, and dietary
                  restrictions perfectly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <HeartPulse className="text-white" size={28} />
                </div>
                <CardTitle className="text-2xl mb-2">Smart Nutrition</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Keto, vegan, gluten-free, or any diet—get nutritionist-approved plans tailored to
                  your health goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/50">
              <CardHeader className="pb-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CalendarCheck className="text-white" size={28} />
                </div>
                <CardTitle className="text-2xl mb-2">Effortless Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-lg leading-relaxed">
                  Auto-generated grocery lists and meal schedules that save time and eliminate food
                  waste.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-3xl mb-20"
        >
          <div className="px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                Simple Process
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Get Started in Minutes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your personalized meal plan is just three steps away
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <CheckCircle2 size={32} />,
                  title: 'Create Your Profile',
                  description:
                    'Tell us about your dietary preferences, allergies, health goals, and cooking experience.',
                  color: 'from-emerald-500 to-emerald-600',
                },
                {
                  icon: <Utensils size={32} />,
                  title: 'Customize Your Plan',
                  description:
                    'Select cuisines, cooking time, portion sizes, and any specific ingredients you love or avoid.',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  icon: <HeartPulse size={32} />,
                  title: 'Receive & Enjoy',
                  description:
                    'Get your weekly plan with detailed recipes, nutrition info, and organized shopping lists.',
                  color: 'from-purple-500 to-purple-600',
                },
              ].map((step, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div
                      className={`bg-gradient-to-br ${step.color} text-white rounded-2xl h-20 w-20 flex items-center justify-center mb-6 mx-auto shadow-lg`}
                    >
                      {step.icon}
                    </div>
                    <Badge className="mb-4 bg-white/80 text-gray-700 shadow-sm">
                      Step {index + 1}
                    </Badge>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 -right-4 text-gray-300">
                      <ArrowRight size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Customer Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our community of happy customers who&apos;ve transformed their eating habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Busy Mom of 3',
                quote:
                  "MealPlan has been a lifesaver! My picky eaters actually ask for seconds now, and I've saved hours each week on meal planning.",
                rating: 5,
                avatar: '/nicole.webp',
              },
              {
                name: 'Michael Chen',
                role: 'Fitness Coach',
                quote:
                  'Finally, a meal planner that understands macros and fitness goals. My clients love the variety and I love the results!',
                rating: 5,
                avatar: '/nicole.webp',
              },
              {
                name: 'Priya Patel',
                role: 'Plant-Based Foodie',
                quote:
                  "The vegetarian options are incredible! I've discovered amazing recipes I never would have found on my own.",
                rating: 5,
                avatar: '/nicole.webp',
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic relative">
                  <Quote className="inline-block w-[1.1em] h-[1.1em] text-gray-500 align-top mr-1" />
                  {testimonial.quote}
                  <Quote className="inline-block w-[1.1em] h-[1.1em] text-gray-500 align-bottom ml-1 rotate-180" />
                </p>

                <div className="flex items-center">
                  <Image
                    width={48}
                    height={48}
                    src={testimonial.avatar || '/placeholder.svg'}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] opacity-10" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Kitchen?
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-emerald-50 leading-relaxed">
                Join thousands of users who are eating better, saving time, and loving their meals
                with AI-powered planning
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
                >
                  <Link href="/sign-up" className="flex items-center">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
              <p className="text-emerald-200 text-sm">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>
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
