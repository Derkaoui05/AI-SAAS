import Link from 'next/link';

interface FooterLinkGroupProps {
  title: string;
  links: Array<{
    href: string;
    label: string;
    isExternal?: boolean;
  }>;
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="space-y-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.href}>
            {link.isExternal ? (
              <a href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterLinks() {
  const linkGroups = [
    {
      title: 'Explore',
      links: [
        { href: '/mealplan', label: 'Meal plan' },
        { href: '/subscribe', label: 'Pricing' },
        { href: '/profile', label: 'Profile' },
        { href: '/create-profile', label: 'Create profile' },
      ],
    },
    {
      title: 'Guides',
      links: [
        { href: '/sign-up', label: 'Getting started' },
        { href: '/mealplan', label: 'Weekly planner' },
        { href: '/subscribe', label: 'Compare plans' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/', label: 'Home' },
        { href: 'mailto:derkaouidev@gmail.com', label: 'Support', isExternal: true },
        { href: '/api/profile/subscription-status', label: 'Status' },
      ],
    },
  ];

  return (
    <>
      {linkGroups.map((group) => (
        <FooterLinkGroup key={group.title} {...group} />
      ))}
    </>
  );
}
