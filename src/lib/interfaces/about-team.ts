// src/lib/interfaces/about-team.ts

/** Leadership team member with expandable bio detail. */
export interface Leader {
  /** Unique identifier for modal targeting and key prop */
  id: string
  /** Full display name */
  name: string
  /** Professional title */
  title: string
  /** Path to headshot photo in /public (relative to domain root) */
  photo: string
  /** 1-sentence summary shown on the card face */
  summary: string
  /** Bullet list: "What [FirstName] owns" -- responsibilities */
  owns: string[]
  /** Bullet list: career highlights and credentials */
  background: string[]
}

/** Agency badge entry in the Field Experts section. */
export interface AgencyBadge {
  id: string
  /** Agency display name */
  name: string
  /** Short description of relevant units/roles */
  description: string
  /** Path to badge image, or null if using icon fallback */
  image: string | null
  /** Whether the badge renders from a file or a Lucide icon */
  imageType: 'file' | 'icon'
  /** Lucide icon component name (only when imageType is 'icon') */
  iconName?: string
}

/** Technology or delivery partner. */
export interface TechPartner {
  id: string
  name: string
  /** Professional domain / role label */
  domain: string
  /** Path to headshot photo in /public */
  photo: string
  /** Display tier: 'featured' gets larger card in 3-col grid; 'standard' gets compact card */
  tier: 'featured' | 'standard'
}

/** Contact channel with mailto link. */
export interface ContactChannel {
  id: string
  /** Channel label (e.g., "Partnerships") */
  label: string
  /** Email address */
  email: string
  /** Lucide icon component name */
  iconName: string
}
