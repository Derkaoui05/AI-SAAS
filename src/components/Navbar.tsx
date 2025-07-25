"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SignedOut, SignedIn ,useUser, SignOutButton} from '@clerk/nextjs';

export const Navbar = () => {
  const {isLoaded,isSignedIn,user} = useUser();
  if(!isLoaded) {
    return <div className="flex justify-center items-center h-16 bg-gray-100">Loading...</div>;
  }
  return (
    <>
      <nav className="bg-white shadow-md">
        {" "}
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image 
                src="/logo.jpeg" 
                width={60} 
                height={60} 
                alt="logo" 
                className="rounded-full border-2 border-gray-200 hover:border-blue-500 transition-all"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            {' '}
            <SignedIn>
              <Link 
                href="/meallplan" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                MealPlan
              </Link>
              {user?.imageUrl ? (
                <Link href="/profile">
                  <Image 
                    src={user.imageUrl} 
                    width={40} 
                    height={40} 
                    alt='profile' 
                    className="rounded-full border-2 border-gray-200 hover:border-blue-500 transition-all"
                  />
                </Link>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <SignOutButton>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                  Sign Out
                </button>
              </SignOutButton>
            </SignedIn>
            <SignedOut>
                <Link href="/">Home</Link>
                <Link href={isSignedIn ? "/subscribe" : "/sign-up"}>Subscribe</Link>
                <Link href="/sign-up" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">SignUp</Link>
            </SignedOut>
          </div>
        </div>
      </nav>
    </>
  );
};