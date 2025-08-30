import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function useCheckoutConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) return;

    async function confirmCheckout() {
      try {
        await fetch('/api/checkout/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        router.replace('/');
      } catch (error) {
        console.error('Checkout confirmation failed:', error);
        router.replace('/');
      }
    }

    confirmCheckout();
  }, [searchParams, router]);
}
