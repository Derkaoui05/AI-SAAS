import { Github, Instagram } from 'lucide-react';
import Link from 'next/link';

export function FooterSocial() {
  const socialLinks = [
    {
      href: 'https://github.com/Derkaoui05',
      label: 'GitHub',
      icon: <Github />,
    },
    {
      href: 'https://instagram.com/thusspokeyassir/',
      label: 'Instagram',
      icon: <Instagram />,
    },
  ];

  return (
    <div className="space-y-4 min-h-[120px]">
      <h3 className="text-sm font-semibold">Follow</h3>
      <div className="flex items-center gap-3">
        {socialLinks.map((social) => (
          <Link
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="rounded-full border bg-white/70 p-2 text-foreground/80 transition hover:bg-white hover:shadow-sm dark:bg-slate-900/60"
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
