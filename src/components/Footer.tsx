import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="relative border-t bg-gradient-to-b from-pink-50/60 via-white to-sky-50/70 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute -top-8 left-0 right-0" aria-hidden>
        <svg
          className="w-full text-white dark:text-slate-900"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,58.7C1120,64,1280,64,1360,64L1440,64L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"
          />
        </svg>
      </div>

      <div className="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute right-0 top-28 h-48 w-48 rounded-full bg-sky-300/30 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur dark:bg-slate-900/60">
            💚 Fresh, tasty, and tailored for you
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="PurePLate logo"
              width={44}
              height={44}
              className="rounded-lg shadow-sm ring-1 ring-black/5"
            />
            <span className="text-xl font-semibold tracking-tight">PurePLate</span>
          </div>
          <p className="max-w-2xl text-balance text-sm text-muted-foreground">
            Build joyful eating habits with adorable guidance, bite-sized tips, and chef-kissed
            plans.
          </p>
          <div className="w-full">
            <div className="mx-auto w-full max-w-xl rounded-2xl border bg-white/70 p-3 shadow-sm backdrop-blur dark:bg-slate-900/60">
              <form className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Get cute weekly nutrition notes"
                  className="w-full rounded-xl border bg-background px-3 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground/70 focus:border-primary"
                />
                <button
                  type="button"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Explore</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/mealplan"
                className="rounded-full border bg-white/70 px-3 py-1 text-xs text-foreground/90 transition hover:bg-white hover:shadow-sm dark:bg-slate-900/60"
              >
                Meal plan
              </Link>
              <Link
                href="/subscribe"
                className="rounded-full border bg-white/70 px-3 py-1 text-xs text-foreground/90 transition hover:bg-white hover:shadow-sm dark:bg-slate-900/60"
              >
                Pricing
              </Link>
              <Link
                href="/profile"
                className="rounded-full border bg-white/70 px-3 py-1 text-xs text-foreground/90 transition hover:bg-white hover:shadow-sm dark:bg-slate-900/60"
              >
                Profile
              </Link>
              <Link
                href="/create-profile"
                className="rounded-full border bg-white/70 px-3 py-1 text-xs text-foreground/90 transition hover:bg-white hover:shadow-sm dark:bg-slate-900/60"
              >
                Create profile
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Guides</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/sign-up" className="hover:text-foreground transition-colors">
                  Getting started
                </Link>
              </li>
              <li>
                <Link href="/mealplan" className="hover:text-foreground transition-colors">
                  Weekly planner
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-foreground transition-colors">
                  Compare plans
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@example.com"
                  className="hover:text-foreground transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <Link
                  href="/api/profile/subscription-status"
                  className="hover:text-foreground transition-colors"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Follow</h3>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/Derkaoui05"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-full border bg-white/70 p-2 text-foreground/80 transition hover:bg-white hover:shadow-sm dark:bg-slate-900/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.218.682-.484 0-.238-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.455-1.158-1.11-1.467-1.11-1.467-.908-.622.069-.609.069-.609 1.004.071 1.531 1.035 1.531 1.035.893 1.533 2.343 1.09 2.914.834.091-.649.35-1.09.636-1.341-2.221-.253-4.556-1.113-4.556-4.952 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.851.004 1.707.115 2.507.338 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.696-4.566 4.944.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.748 0 .268.18.58.688.481A10.025 10.025 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://instagram.com/thusspokeyassir/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border bg-white/70 p-2 text-foreground/80 transition hover:bg-white hover:shadow-sm dark:bg-slate-900/60"
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

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row">
          <p>
            © {new Date().getFullYear()} Healtcare. All rights reserved | Designed by{' '}
            <Link className="font-bold text-emerald-600" href="https://derkaoui.netlify.app">
              Yassir
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
