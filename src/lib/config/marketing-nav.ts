import type {
  MarketingNavItem,
  MarketingFooterColumn,
  MarketingCTAConfig,
} from '@/lib/interfaces/marketing-nav'

export const NAV_ITEMS: MarketingNavItem[] = [
  { label: 'Home', href: '/landing' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
  { label: 'About', href: '/about' },
]

export const CTA_CONFIG: MarketingCTAConfig = {
  label: 'Contact',
  href: '/contact',
}

export const FOOTER_NAV_COLUMNS: MarketingFooterColumn[] = [
  {
    heading: 'Product',
    items: [
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Platform', href: '/platform' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security', href: '/security' },
    ],
  },
  {
    heading: 'Solutions',
    items: [
      { label: 'Solutions', href: '/solutions' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'More',
    items: [
      { label: 'Mission Control', href: '/launch' },
    ],
  },
]

export const FOOTER_LEGAL_LINKS: MarketingNavItem[] = [
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Privacy Policy', href: '/legal/privacy' },
]
