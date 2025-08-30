import { FooterBottom } from './footer/FooterBottom';
import { FooterHero } from './footer/FooterHero';
import { FooterLinks } from './footer/FooterLinks';
import { FooterOptimizer } from './footer/FooterOptimizer';
import { FooterSocial } from './footer/FooterSocial';

export default function MainFooter() {
  return (
    <FooterOptimizer>
      <footer className="relative border-t bg-gradient-to-b from-emerald-100/40 to-teal-100/40 min-h-[400px]">

        <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-16">
          <FooterHero />

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <FooterLinks />
            <FooterSocial />
          </div>

          <FooterBottom />
        </div>
      </footer>
    </FooterOptimizer>
  );
}
