import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-up(.*)?',
  '/subscribe(.*)',
  '/api/webhook(.*)', // Stripe webhook must be publicly accessible
]);

const isSignUpRoute = createRouteMatcher(['/sign-up(.*)?']);
const isCreateProfileRoute = createRouteMatcher(['/create-profile(.*)?']);

export default clerkMiddleware(async (auth, req) => {
  const userAuth = await auth();
  const { userId } = userAuth;
  const { pathname, origin } = req.nextUrl;
  console.log('Middleware Info: ', userId, pathname, origin);

  if (!isPublicRoute(req) && !userId) {
    // Redirect to sign-in page if not authenticated
    return NextResponse.redirect(new URL('/sign-up', origin));
  }

  // Send authenticated users through profile creation once
  if (userId && isSignUpRoute(req)) {
    return NextResponse.redirect(new URL('/create-profile', origin));
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
