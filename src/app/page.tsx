// app/page.tsx (HomePage)
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2, Utensils, HeartPulse, CalendarCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="px-4 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl mb-16 p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Personalized AI Meal Planner</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
          Eat healthier without the hassle. Our AI creates custom meal plans tailored to your tastes, dietary needs, and goals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
            <Link href="/sign-up">Get Started For Free</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white hover:bg-white/10">
            <Link href="#how-it-works">How It Works</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Choose MealPlan?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine nutrition science with AI to create meal plans that actually work for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Utensils className="text-emerald-600" size={24} />
              </div>
              <CardTitle>Personalized Recipes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get recipes tailored to your taste preferences, cooking skills, and available ingredients.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <HeartPulse className="text-emerald-600" size={24} />
              </div>
              <CardTitle>Diet-Specific Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Whether keto, vegan, gluten-free or other needs, we&apos;ve got you covered with nutritionist-approved plans.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="bg-emerald-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CalendarCheck className="text-emerald-600" size={24} />
              </div>
              <CardTitle>Smart Grocery Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Automatically generated shopping lists that save you time and reduce food waste.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Get your perfect meal plan in just 3 simple steps
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {[
            {
              icon: <CheckCircle2 size={32} />,
              title: "Create Your Profile",
              description: "Tell us about your dietary preferences, allergies, and health goals."
            },
            {
              icon: <Utensils size={32} />,
              title: "Customize Your Plan",
              description: "Select your preferred cuisines, cooking time, and portion sizes."
            },
            {
              icon: <HeartPulse size={32} />,
              title: "Receive & Enjoy",
              description: "Get your weekly plan with recipes, nutrition info, and shopping list."
            }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center max-w-xs mx-auto">
              <div className="bg-emerald-500 text-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <div className="bg-secondary/50 px-3 py-1 rounded-full mb-2 text-sm font-medium">
                Step {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16 bg-secondary/30 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
          <p className="text-muted-foreground">
            Join thousands of happy customers eating better with MealPlan
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah J.",
              role: "Busy Mom",
              quote: "MealPlan has saved me so much time and stress. My picky eaters actually enjoy the meals!",
              rating: "★★★★★"
            },
            {
              name: "Michael T.",
              role: "Fitness Enthusiast",
              quote: "Finally a meal planner that understands my macros and fitness goals. Game changer!",
              rating: "★★★★★"
            },
            {
              name: "Priya K.",
              role: "Vegetarian",
              quote: "The variety of vegetarian options is amazing. I've discovered so many new favorite recipes.",
              rating: "★★★★☆"
            }
          ].map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="mb-4 text-yellow-500">{testimonial.rating}</div>
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <div className="font-medium">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">{testimonial.role}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Eating Habits?</h2>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of users who are eating better and saving time with personalized meal plans
        </p>
        <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/sign-up">Start Your Free Trial</Link>
        </Button>
      </section>
    </div>
  );
}