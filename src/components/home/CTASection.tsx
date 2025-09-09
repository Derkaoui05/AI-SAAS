import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
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
  );
}
