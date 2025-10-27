'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Sparkles, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 min-h-[90vh] flex items-center">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      <div className="absolute h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Nutrition
            </Badge>
            
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                Your Perfect
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {" "}Meal Plan
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-gradient-to-r from-blue-400/30 to-emerald-400/30 blur-sm"></span>
                </span>
              </h1>
              <h2 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold text-white">Awaits</h2>
            </div>
            
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              Transform your eating habits with AI-powered meal planning. Personalized recipes, smart
              grocery lists, and nutrition tracking—all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 border-0"
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
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white backdrop-blur-sm"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">50K+</span>
                </div>
                <p className="text-xs text-slate-400">Happy Users</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.9/5</span>
                </div>
                <p className="text-xs text-slate-400">Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">5+ Hours</span>
                </div>
                <p className="text-xs text-slate-400">Saved Weekly</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-2xl blur-2xl" />
            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-2 shadow-2xl">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                {/* Replace with your actual meal plan image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20" />
                <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                  {/* Placeholder for actual image */}
                  <p className="text-sm">Meal Plan Preview</p>
                </div>
              </div>
              
              {/* Floating UI elements */}
              <div className="absolute -right-12 -top-12 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">AI Generated</p>
                    <p className="text-sm font-medium text-white">Personalized</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-12 -bottom-8 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Nutrition</p>
                    <p className="text-sm font-medium text-white">Optimized</p>
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
