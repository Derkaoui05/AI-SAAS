import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            💚 Fresh, tasty, and tailored for you
          </div>
          <div className="flex items-center gap-3">
            <ChefHat className="h-9 w-9 text-primary" />
            <span className="text-xl font-semibold tracking-tight text-foreground">PurePLate</span>
          </div>
          <p className="max-w-2xl text-balance text-sm text-muted-foreground">
            Build joyful eating habits with adorable guidance, bite-sized tips, and chef-kissed
            plans.
          </p>
          <div className="w-full">
            <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-card p-3 shadow-sm backdrop-blur">
              <form className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Get cute weekly nutrition notes"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button
                  type="button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Explore</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/mealplan"
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              >
                Meal plan
              </Link>
              <Link
                href="/subscribe"
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              >
                Pricing
              </Link>
              <Link
                href="/profile"
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              >
                Profile
              </Link>
              <Link
                href="/create-profile"
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              >
                Create profile
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Guides</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/sign-up" className="transition-colors hover:text-foreground">
                  Getting started
                </Link>
              </li>
              <li>
                <Link href="/mealplan" className="transition-colors hover:text-foreground">
                  Weekly planner
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="transition-colors hover:text-foreground">
                  Compare plans
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@example.com"
                  className="transition-colors hover:text-foreground"
                >
                  Support
                </a>
              </li>
              <li>
                <Link
                  href="/api/profile/subscription-status"
                  className="transition-colors hover:text-foreground"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Follow</h3>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/Derkaoui05"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-full border border-border bg-card p-2 text-foreground/80 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 50 50"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"
                  ></path>
                </svg>
              </Link>
              <Link
                href="https://instagram.com/thusspokeyassir/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-border bg-card p-2 text-foreground/80 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17" cy="7" r="1.2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} PurePlate. All rights reserved | Designed by{' '}
            <Link
              target="_blank"
              className="font-bold text-primary hover:border-b-2 hover:border-primary hover:pb-0.5 duration-700 transition-colors"
              href="https://derkaoui.netlify.app"
            >
              Derkaoui Yassir
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
