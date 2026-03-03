export interface MarketingNavItem {
  label: string
  href: string
  external?: boolean
  children?: MarketingNavItem[]
}

export interface MarketingFooterColumn {
  heading: string
  items: MarketingNavItem[]
}

export interface MarketingCTAConfig {
  label: string
  href: string
}
