import { FooterBackground } from './footer/FooterBackground';
import { FooterBottom } from './footer/FooterBottom';
import { FooterHero } from './footer/FooterHero';
import { FooterLinks } from './footer/FooterLinks';
import { FooterSocial } from './footer/FooterSocial';

export default function MainFooter() {
  return (
    <footer className="relative border-t bg-gradient-to-b from-pink-50/60 via-white to-sky-50/70 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <FooterBackground />

      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-16">
        <FooterHero />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <FooterLinks />
          <FooterSocial />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
