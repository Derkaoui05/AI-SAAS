'use client';
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
type ApiReponse = {
  message: string;
  error?: string;
};
async function createProfileRequest() {
  const response = await fetch('/api/create-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = (await response.json()) as ApiReponse;
  if (!response.ok) {
    const errorMessage = data?.error || 'Failed to create profile';
    throw new Error(errorMessage);
  }
  return data;
}
function CreateProfile() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { mutate, isPending } = useMutation<ApiReponse, Error>({
    mutationFn: createProfileRequest,
    onSuccess: () => router.push('/subscribe'),
    onError: (error) => console.error('Error creating profile:', error.message),
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;
    if (isPending) return;
    mutate();
  }, [isLoaded, isSignedIn, isPending, mutate]);

  return <div>Processing Sign In....</div>;
}

export default CreateProfile;
