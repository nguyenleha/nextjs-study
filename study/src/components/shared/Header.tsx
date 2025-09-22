import Link from 'next/link';

export function Header() {
  // Note: Route groups like (public) and (dashboard) do not appear in the URL.
  const nav = [
    { href: '/', label: 'Root' },
    { href: '/home', label: 'Public Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/settings', label: 'Settings' },
  ];
  return (
    <header style={{ borderBottom: '1px solid #e5e7eb', padding: 12, marginBottom: 16 }}>
      <nav style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} style={{ color: '#2563eb' }}>{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}
