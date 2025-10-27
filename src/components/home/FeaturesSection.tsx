import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, HeartPulse, Utensils, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Utensils className="text-white" />,
    title: 'Personalized Recipes',
    description:
      'AI-curated recipes that match your taste preferences, cooking skills, and dietary restrictions perfectly.',
    color: 'from-emerald-500 to-emerald-600',
    gradient: 'from-emerald-500/20 to-emerald-600/20',
    borderColor: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500',
  },
  {
    icon: <HeartPulse className="text-white" />,
    title: 'Smart Nutrition',
    description:
      'Keto, vegan, gluten-free, or any diet—get nutritionist-approved plans tailored to your health goals.',
    color: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/20',
    iconBg: 'bg-blue-500',
  },
  {
    icon: <CalendarCheck className="text-white" />,
    title: 'Effortless Planning',
    description:
      'Auto-generated grocery lists and meal schedules that save time and eliminate food waste.',
    color: 'from-purple-500 to-purple-600',
    gradient: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500/20',
    iconBg: 'bg-purple-500',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-900/5 to-transparent" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">
            Why Choose MealPlan?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Nutrition Made <span className="text-blue-600">Simple</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge AI with nutrition science to create meal plans that fit your
            lifestyle perfectly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-300 border ${feature.borderColor} shadow-lg hover:-translate-y-1 bg-white backdrop-blur-sm overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-30`} />
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-gradient-to-br from-slate-50/10 to-white/5 rounded-full" />
              
              <CardHeader className="pb-4 relative">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`${feature.iconBg} p-3 rounded-xl w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-slate-600 leading-relaxed mb-4">
                  {feature.description}
                </CardDescription>
                <div className="flex items-center text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform duration-300">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional feature highlight */}
        <div className="mt-20 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_400px_at_70%_50%,#3b82f6,transparent)]" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30">
                Premium Feature
              </Badge>
              <h3 className="text-3xl font-bold text-white mb-4">AI Nutrition Coach</h3>
              <p className="text-slate-300 mb-6">
                Get personalized advice, meal adjustments, and nutrition insights from your AI coach that learns your preferences over time.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="bg-white/10 text-white px-3 py-1 rounded-full">24/7 Guidance</span>
                <span className="bg-white/10 text-white px-3 py-1 rounded-full">Personalized Tips</span>
                <span className="bg-white/10 text-white px-3 py-1 rounded-full">Progress Tracking</span>
              </div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-emerald-500/20 rounded-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 shadow-lg w-full max-w-md">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-white text-sm">
                      I noticed you&apos;ve been skipping breakfast. Would you like me to suggest some quick, protein-rich options that fit your schedule?
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">You</span>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-white text-sm">
                      Yes, please! I need options I can prepare in under 5 minutes.
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
