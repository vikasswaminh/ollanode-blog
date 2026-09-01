// ─────────────────────────────────────────────────────────────────────────────
//  PER-PROJECT BRANDING  ·  the ONLY file that changes between blog repos.
//  Owner-locked via CODEOWNERS — the SEO team does not edit this (see CONTRIBUTING.md).
// ─────────────────────────────────────────────────────────────────────────────
export const SITE = {
  brand: 'OllaNode',
  title: 'OllaNode Blog',
  description: 'Guides, tips, and product updates from the OllaNode team.',
  url: 'https://blogs.ollanode.com',
  marketingUrl: 'https://ollanode.com',
  marketingLabel: 'Visit ollanode.com',
  author: 'OllaNode Team',
  accent: '#FF4500',
  tagline: 'Own your infrastructure.',
  locale: 'en',
} as const;

export const NAV = [
  { label: 'Blog', href: '/' },
  { label: 'Tags', href: '/tags/' },
  { label: 'About', href: '/about/' },
];
