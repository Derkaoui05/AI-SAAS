"use client";
import { useUser } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
type ApiReponse = {
  message: string,
  error?: string
}
async function createProfileRequest() {
  const response = await fetch('/api/create-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json()
  return data as ApiReponse;
}
function CreateProfile() {
  const {isLoaded,isSignedIn} = useUser();
  const router = useRouter();
  const {mutate,isPending} = useMutation<ApiReponse, Error>({
    mutationFn: createProfileRequest,
    onSuccess: () => router.push('/subscribe'),
    onError: (error) => console.error('Error creating profile:', error.message)
  })

  useEffect(() => {
    if (isLoaded && isSignedIn&& !isPending) {
    // Check if the user has a profile
      mutate();
    }
    }, [isLoaded,isSignedIn])

  return (
    <div>Processing Sign In....</div>
  )
}

export default CreateProfile