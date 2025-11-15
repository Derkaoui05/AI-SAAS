'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { availablePlans } from '../../lib/plans';

type SubscribeResponse = {
  url: string;
};

type SubscribeError = {
  error: string;
};

async function SubscribeToPlan(
  planType: string,
  userId: string,
  email: string,
): Promise<SubscribeResponse> {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ planType, userId, email }),
  });

  if (!response.ok) {
    const errorData: SubscribeError = await response.json();
    throw new Error(errorData.error || 'Failed to create checkout session.');
  }
  const data: SubscribeResponse = await response.json();
  return data;
}

function Subscribe() {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.id;
  const email = user?.emailAddresses[0]?.emailAddress || '';

  const { mutate, isPending } = useMutation<SubscribeResponse, Error, { planType: string }>(
    {
      mutationFn: async ({ planType }) => {
        if (!userId) throw new Error('User not authenticated.');
        return SubscribeToPlan(planType, userId, email);
      },
      onMutate: () => {
        toast.loading('Creating checkout session...');
      },
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: () => {
        toast.error('Failed to create checkout session. Please try again later.');
      },
    },
  );

  function HandleSubscribe(planType: string) {
    if (!userId) {
      router.push('/sign-up');
      return;
    }
    mutate({ planType });
  }

  return (
    <section className="relative overflow-hidden bg-background">
      {/* background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(0deg,transparent_24px,theme(colors.border/60)_25px),linear-gradient(90deg,transparent_24px,theme(colors.border/60)_25px)] bg-[size:28px_28px]" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20">Plans</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">
            Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started on our weekly plan or upgrade to monthly or yearly when you’re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availablePlans.map((plan, key) => (
            <Card
              key={key}
              className={`relative bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-border/80 ${
                plan.isPopular ? 'ring-2 ring-primary shadow-primary/20' : ''
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="text-3xl font-bold mt-2 text-foreground">
                  ${plan.amount}{' '}
                  <span className="text-sm font-normal text-muted-foreground">/ {plan.interval}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  onClick={() => HandleSubscribe(plan.interval)}
                  disabled={isPending}
                  className="w-full"
                  variant={plan.isPopular ? 'default' : 'outline'}
                >
                  {isPending ? 'Processing...' : 'Get Started'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Subscribe;
