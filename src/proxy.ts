import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-up(.*)?',
  '/subscribe(.*)',
  '/api/webhook(.*)', // Stripe webhook must be publicly accessible
  '/api/check-subscription(.*)',
]);

const isSignUpRoute = createRouteMatcher(['/sign-up(.*)?']);
const isCreateProfileRoute = createRouteMatcher(['/create-profile(.*)?']);
const isMealPlanRoute = createRouteMatcher(['/mealplan(.*)?']);

export default clerkMiddleware(async (auth, req) => {
  const userAuth = await auth();
  const { userId } = userAuth;
  const { pathname, origin } = req.nextUrl;
  if(pathname=== "/api/check-subscription"){
    return NextResponse.next(); // Allow API route to proceed without auth
  }
  console.log('Middleware Info: ', userId, pathname, origin);

  if (!isPublicRoute(req) && !userId) {
    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(new URL('/sign-up', origin));
  }

  // Send authenticated users through profile creation once
  if (userId && isSignUpRoute(req)) {
    return NextResponse.redirect(new URL('/create-profile', origin));
  }
  // Redirect authenticated users to meal plan if they try to access sign-up
  if (isMealPlanRoute(req) && userId) {
    try {
      const response = await fetch(`${origin}/api/check-subscription?userId=${userId}`);
      const data = await response.json();
      if (!data.subscriptionActive) {
        return NextResponse.redirect(new URL('/subscribe', origin));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/subscribe', origin));
    }
    //return NextResponse.redirect(new URL('/mealplan', origin));
  }

  // Optional: prevent direct access to create-profile for signed-out users
  if (!userId && isCreateProfileRoute(req)) {
    return NextResponse.redirect(new URL('/sign-up', origin));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
