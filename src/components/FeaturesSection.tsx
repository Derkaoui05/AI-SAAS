import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, HeartPulse, Utensils } from 'lucide-react';

const features = [
  {
    icon: <Utensils size={28} />,
    title: 'Personalized Recipes',
    description:
      'AI-curated recipes that match your taste preferences, cooking skills, and dietary restrictions perfectly.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: <HeartPulse size={28} />,
    title: 'Smart Nutrition',
    description:
      'Keto, vegan, gluten-free, or any diet—get nutritionist-approved plans tailored to your health goals.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: <CalendarCheck size={28} />,
    title: 'Effortless Planning',
    description:
      'Auto-generated grocery lists and meal schedules that save time and eliminate food waste.',
    color: 'from-purple-500 to-purple-600',
  },
];

export function FeaturesSection() {
  return (
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
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-gradient-to-br from-white to-emerald-50/50"
          >
            <CardHeader className="pb-4">
              <div
                className={`bg-gradient-to-br ${feature.color} p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>
              <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-lg leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
