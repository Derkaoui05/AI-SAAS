'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
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
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 text-foreground">
        <Link href="/" className="flex items-center space-x-2">
          <ChefHat className="h-9 w-9 text-primary" />
          <span className="font-semibold">PurePlate</span>
        </Link>

        <div className="flex items-center gap-4">
          <SignedIn>
            <Button asChild variant="ghost">
              <Link href="/profile">Profile</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/mealplan">MealPlan</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/subscribe">Upgrade</Link>
            </Button>

            <Link href="/profile" className="inline-flex">
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
              <Button variant="destructive" size="sm">
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={isSignedIn ? '/subscribe' : '/sign-up'}>Subscribe</Link>
            </Button>
            <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};
