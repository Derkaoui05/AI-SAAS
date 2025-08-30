import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
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
];

export function TestimonialsSection() {
  return (
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
        {testimonials.map((testimonial, index) => (
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
  );
}
