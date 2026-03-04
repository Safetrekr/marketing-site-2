// src/lib/data/resources.ts

export interface Resource {
  id: string
  title: string
  description: string
  format: 'PDF' | 'Word'
  pages: number
  /** Placeholder download path — will be updated when actual files are available */
  downloadHref: string
}

export const RESOURCES_HERO = {
  title: 'Free Planning Resources',
  subtitle:
    'Professional templates, checklists, and guides to help you plan safer trips. All resources are free to download and use for your organization.',
} as const

export const RESOURCES: Resource[] = [
  {
    id: 'trip-planning-checklist',
    title: 'Trip Planning Checklist',
    description:
      'Comprehensive checklist covering all phases of trip planning from initial concept through safe return. Includes timeline guidance and responsibility assignments.',
    format: 'PDF',
    pages: 4,
    downloadHref: '#',
  },
  {
    id: 'sample-itinerary-template',
    title: 'Sample Itinerary Template',
    description:
      'Professional itinerary template with day-by-day scheduling, location details, activity descriptions, and emergency contact information.',
    format: 'Word',
    pages: 3,
    downloadHref: '#',
  },
  {
    id: 'parent-communication-templates',
    title: 'Parent Communication Templates',
    description:
      'Ready-to-use email templates for trip announcements, permission forms, pre-departure briefings, and post-trip updates. Covers all communication touchpoints.',
    format: 'Word',
    pages: 8,
    downloadHref: '#',
  },
  {
    id: 'risk-assessment-worksheet',
    title: 'Risk Assessment Worksheet',
    description:
      'Structured framework for identifying, evaluating, and mitigating trip-specific risks. Includes risk matrix and mitigation planning tools.',
    format: 'PDF',
    pages: 6,
    downloadHref: '#',
  },
  {
    id: 'emergency-contact-form',
    title: 'Emergency Contact Form',
    description:
      'Fillable form for collecting participant emergency contacts, medical information, and insurance details. Designed for FERPA alignment for educational institutions.',
    format: 'PDF',
    pages: 2,
    downloadHref: '#',
  },
  {
    id: 'post-trip-debrief-guide',
    title: 'Post-Trip Debrief Guide',
    description:
      'Structured debrief framework for capturing lessons learned, incident documentation, and continuous improvement insights after trip completion.',
    format: 'PDF',
    pages: 5,
    downloadHref: '#',
  },
]

export const RESOURCES_PLATFORM_CTA = {
  heading: 'Ready for the full platform?',
  body: "These free resources are just the beginning. With Safetrekr's full platform, you get professional analyst review, board-ready trip packets, real-time intelligence monitoring, and defensible documentation for every trip.",
  primaryLabel: 'Request a Sample Trip Package',
  primaryHref: '/contact',
  secondaryLabel: 'See How It Works',
  secondaryHref: '/how-it-works',
} as const

export const RESOURCES_WHY_DOWNLOAD = [
  {
    title: 'Save Time',
    description:
      'Start with proven templates instead of building from scratch. Our resources are based on safety professionals with experience across K-12, higher education, church, and corporate travel.',
    iconName: 'Zap',
  },
  {
    title: 'Reduce Risk',
    description:
      'Ensure you are covering all critical safety and compliance requirements with professionally-developed checklists and risk assessment tools.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Improve Communication',
    description:
      'Keep parents, board members, and travelers informed with clear communication templates that build confidence and trust.',
    iconName: 'Users',
  },
] as const
