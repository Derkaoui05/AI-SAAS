import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100%,#f0f9ff,transparent)]" />
      
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden shadow-2xl border border-slate-700/50">
          {/* Background elements */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-10" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_600px_at_70%_-10%,#3b82f6,transparent)]" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_600px_at_10%_100%,#10b981,transparent)]" />
          
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          
          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-24 h-24 border border-blue-400/20 rounded-lg rotate-12 opacity-30" />
          <div className="absolute bottom-8 left-8 w-32 h-32 border border-emerald-400/20 rounded-full opacity-30" />
          
          <div className="relative max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Limited Time Offer</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Ready to Transform Your 
                <span className="relative ml-2">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Kitchen?
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-3 bg-gradient-to-r from-blue-400/30 to-emerald-400/30 blur-sm"></span>
                </span>
              </h2>
              
              <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-slate-300 leading-relaxed">
                Join thousands of users who are eating better, saving time, and loving their meals
                with AI-powered planning
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 w-full max-w-2xl">
                <div className="flex items-start gap-3 group">
                  <div className="bg-emerald-500/10 rounded-lg p-2 group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Personalized Meal Plans</h3>
                    <p className="text-slate-300 text-sm">Tailored to your dietary needs and preferences</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="bg-emerald-500/10 rounded-lg p-2 group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Smart Grocery Lists</h3>
                    <p className="text-slate-300 text-sm">Automatically generated based on your meal plan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="bg-emerald-500/10 rounded-lg p-2 group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Time-Saving Recipes</h3>
                    <p className="text-slate-300 text-sm">Quick and easy meals for busy schedules</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="bg-emerald-500/10 rounded-lg p-2 group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-white">Nutrition Tracking</h3>
                    <p className="text-slate-300 text-sm">Monitor your intake and meet your health goals</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 w-full max-w-md">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 border-0 w-full relative overflow-hidden group"
                >
                  <Link href="/sign-up" className="flex items-center justify-center">
                    <span className="relative z-10">Start Your Free Trial</span>
                    <ArrowRight className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <p>No credit card required • 7-day free trial • Cancel anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
