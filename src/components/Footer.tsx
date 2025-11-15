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
            Build joyful eating habits with adorable guidance, bite-sized tips, and chef-kissed plans.
          </p>
          <div className="w-full">
            <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-card p-3 shadow-sm backdrop-blur">
              <form className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Get cute weekly nutrition notes"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
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
              <Link href="/mealplan" className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm">
                Meal plan
              </Link>
              <Link href="/subscribe" className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm">
                Pricing
              </Link>
              <Link href="/profile" className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm">
                Profile
              </Link>
              <Link href="/create-profile" className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/90 transition hover:bg-accent hover:text-accent-foreground hover:shadow-sm">
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
                <a href="mailto:support@example.com" className="transition-colors hover:text-foreground">
                  Support
                </a>
              </li>
              <li>
                <Link href="/api/profile/subscription-status" className="transition-colors hover:text-foreground">
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.218.682-.484 0-.238-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.455-1.158-1.11-1.467-1.11-1.467-.908-.622.069-.609.069-.609 1.004.071 1.531 1.035 1.531 1.035.893 1.533 2.343 1.09 2.914.834.091-.649.35-1.09.636-1.341-2.221-.253-4.556-1.113-4.556-4.952 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.851.004 1.707.115 2.507.338 1.9"
                    clipRule="evenodd"
                  />
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
            © {new Date().getFullYear()} Healthcare. All rights reserved | Designed by{' '}
            <Link target="_blank" className="font-bold text-primary" href="https://derkaoui.netlify.app">
              Yassir
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
