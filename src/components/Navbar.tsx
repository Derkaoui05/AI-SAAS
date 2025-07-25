"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SignedOut, SignedIn, useUser, SignOutButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex space-x-4">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/logo.jpeg" 
            width={40} 
            height={40} 
            alt="logo" 
            className="rounded-full border"
          />
          <span className="font-semibold">YourBrand</span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Button asChild variant="ghost">
              <Link href="/mealplan">MealPlan</Link>
            </Button>
            
            <Link href="/profile">
              <Avatar className="h-8 w-8">
                {user?.imageUrl ? (
                  <AvatarImage src={user.imageUrl} />
                ) : (
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>

            <SignOutButton>
              <Button className='bg-red-700' size="sm">
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={isSignedIn ? "/subscribe" : "/sign-up"}>Subscribe</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};