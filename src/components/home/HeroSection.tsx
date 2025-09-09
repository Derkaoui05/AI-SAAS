'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Sparkles, Star, Users } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
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
            Transform your eating habits with AI-powered meal planning. Personalized recipes, smart
            grocery lists, and nutrition tracking—all in one place.
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
  );
}
