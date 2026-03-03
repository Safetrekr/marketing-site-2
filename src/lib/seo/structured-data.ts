// src/lib/seo/structured-data.ts

import { SITE_CONFIG } from '@/lib/config/site'

// --- Organization Schema ------------------------------------------------
// Placed on every marketing page via the marketing layout.
// Tells search engines who Safetrekr is as a company.

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logoPath}`,
    description:
      'Enterprise trip safety management platform for organizations that move groups of people.',
    sameAs: [
      `https://www.linkedin.com/company/${SITE_CONFIG.social.linkedin}`,
      `https://twitter.com/${SITE_CONFIG.social.twitter}`,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE_CONFIG.contactEmail,
    },
  }
}

// --- BreadcrumbList Schema -----------------------------------------------
// Placed on every page to help search engines understand site hierarchy.
// Generates breadcrumb rich results in SERPs.

export interface BreadcrumbItem {
  name: string
  path: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_CONFIG.url,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: `${SITE_CONFIG.url}${item.path}`,
      })),
    ],
  }
}

// --- SoftwareApplication Schema ------------------------------------------
// Placed on the landing page (primary SEO homepage).
// Rich result: shows app category, pricing range, OS support.

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_CONFIG.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description:
      'Enterprise trip safety management platform with independent safety analyst review, real-time intelligence, and mobile traveler app.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '450',
      highPrice: '1250',
      priceCurrency: 'USD',
      offerCount: '3',
    },
  }
}

// --- Product Schema with Offers ------------------------------------------
// Placed on the pricing page.
// Rich result: shows pricing tiers directly in SERPs.

export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Safetrekr Trip Safety Management',
    description: 'Per-trip safety management with independent analyst review.',
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Day Trip (T1)',
        price: '450',
        priceCurrency: 'USD',
        description:
          'Single-day trip safety management with route analysis, chaperone coordination, and independent safety review.',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Domestic Overnight (T2)',
        price: '750',
        priceCurrency: 'USD',
        description:
          'Multi-day domestic trip safety management with lodging verification, extended itinerary review, and 24/7 monitoring.',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'International (T3)',
        price: '1250',
        priceCurrency: 'USD',
        description:
          'International trip safety management with country risk intelligence, embassy coordination, and full safety analyst review.',
        availability: 'https://schema.org/InStock',
      },
    ],
  }
}

// --- FAQPage Schema ------------------------------------------------------
// Placed on any page with an FAQ section (pricing, solutions).
// Rich result: shows expandable Q&A directly in SERPs.

export interface FAQItem {
  question: string
  answer: string
}

export function faqPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// --- HowTo Schema --------------------------------------------------------
// Placed on the How It Works page.
// Rich result: shows step-by-step process in SERPs.

export interface HowToStep {
  name: string
  text: string
}

export function howToSchema(steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Safetrekr Works',
    description:
      'A step-by-step overview of how Safetrekr manages trip safety from planning through post-trip reporting.',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}

// --- Article Schema (for case studies) ------------------------------------
// Placed on case study detail pages.
// Rich result: shows article metadata in SERPs.

export function articleSchema(options: {
  headline: string
  description: string
  path: string
  publishedAt: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    url: `${SITE_CONFIG.url}${options.path}`,
    datePublished: options.publishedAt,
    author: options.author
      ? { '@type': 'Person', name: options.author }
      : { '@type': 'Organization', name: SITE_CONFIG.name },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  }
}

// --- BlogPosting Schema (for blog posts) ---------------------------------
// Placed on blog post detail pages.
// Rich result: shows blog post metadata in SERPs.

export function blogPostSchema(options: {
  title: string
  description: string
  slug: string
  date: string
  updatedDate?: string
  authorName: string
  coverImage?: string
  tags?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.title,
    description: options.description,
    url: `${SITE_CONFIG.url}/blog/${options.slug}`,
    datePublished: options.date,
    ...(options.updatedDate && { dateModified: options.updatedDate }),
    author: {
      '@type': 'Person',
      name: options.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    ...(options.tags &&
      options.tags.length > 0 && {
        keywords: options.tags.join(', '),
      }),
  }
}

// --- WebPage Schema (for pages without a more specific type) -------------
// Optional enrichment for pages that do not fit other schema types.

export function webPageSchema(options: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name,
    description: options.description,
    url: `${SITE_CONFIG.url}${options.path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  }
}
