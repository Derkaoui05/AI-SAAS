import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, HeartPulse, Utensils } from 'lucide-react';

const steps = [
  {
    icon: <CheckCircle2 className="text-white" size={28} />,
    title: 'Create Your Profile',
    description:
      'Tell us about your dietary preferences, allergies, health goals, and cooking experience.',
    color: 'bg-blue-500',
    gradient: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: <Utensils className="text-white" size={28} />,
    title: 'Customize Your Plan',
    description:
      'Select cuisines, cooking time, portion sizes, and any specific ingredients you love or avoid.',
    color: 'bg-emerald-500',
    gradient: 'from-emerald-500/20 to-emerald-600/20',
    borderColor: 'border-emerald-500/20',
  },
  {
    icon: <HeartPulse className="text-white" size={28} />,
    title: 'Receive & Enjoy',
    description:
      'Get your weekly plan with detailed recipes, nutrition info, and organized shopping lists.',
    color: 'bg-purple-500',
    gradient: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500/20',
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_100%,#f0fdfa,transparent)]" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20">
            Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Get Started in <span className="text-blue-600">Minutes</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your personalized meal plan is just three steps away
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`${step.color} rounded-xl h-14 w-14 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200">Step {index + 1}</Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {index < 2 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 z-10 transform -translate-y-1/2">
                  <div className="bg-white rounded-full p-2 shadow-md">
                    <ArrowRight className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
