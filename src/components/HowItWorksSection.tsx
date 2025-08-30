import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, HeartPulse, Utensils } from 'lucide-react';

const steps = [
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
];

export function HowItWorksSection() {
  return (
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
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div
                  className={`bg-gradient-to-br ${step.color} text-white rounded-2xl h-20 w-20 flex items-center justify-center mb-6 mx-auto shadow-lg`}
                >
                  {step.icon}
                </div>
                <Badge className="mb-4 bg-white/80 text-gray-700 shadow-sm">Step {index + 1}</Badge>
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
  );
}
