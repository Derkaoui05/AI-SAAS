import { FooterBrand } from './FooterBrand';
import { FooterNewsletter } from './FooterNewsletter';

export function FooterHero() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
        💚 Fresh, tasty, and tailored for you
      </div>
      <FooterBrand />
      <p className="max-w-2xl text-balance text-sm text-muted-foreground">
        Build joyful eating habits with adorable guidance, bite-sized tips, and chef-kissed plans.
      </p>
      <FooterNewsletter />
    </div>
  );
}
