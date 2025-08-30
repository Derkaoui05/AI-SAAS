import Link from 'next/link';

export function FooterBottom() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { href: '/', label: 'Terms' },
    { href: '/', label: 'Privacy' },
    { href: '/', label: 'Cookies' },
  ];

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row">
      <p>
        © {currentYear} Healtcare. All rights reserved | Designed by{' '}
        <Link
          target="blank"
          className="font-bold text-emerald-600"
          href="https://derkaoui.netlify.app"
        >
          Yassir
        </Link>
      </p>
      <div className="flex items-center gap-4">
        {legalLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
