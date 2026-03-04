// src/lib/data/about-team.ts

import type {
  Leader,
  AgencyBadge,
  TechPartner,
  ContactChannel,
} from '@/lib/interfaces/about-team'

// ---------------------------------------------------------------------------
// Hero + Origin
// ---------------------------------------------------------------------------

export const ABOUT_HERO = {
  title: 'The people behind Safetrekr',
  subtitle:
    'Former U.S. Secret Service agents and school security professionals. We build trip safety that works in the real world.',
} as const

export const ORIGIN_STORY =
  'We spent decades protecting people in high-risk environments\u2014from presidential details to international operations. We watched trip leaders juggle spreadsheets, group texts, and good intentions, trying to keep students safe with tools built for something else. We knew there had to be a better way. Safetrekr gives schools, churches, and youth organizations the same level of safety intelligence and documentation we used in the field\u2014minus the complexity. A professional analyst reviews every trip, real-time intelligence keeps your team informed, and board-ready documentation proves what precautions you took.'

// ---------------------------------------------------------------------------
// Leadership
// ---------------------------------------------------------------------------

export const LEADERS: Leader[] = [
  {
    id: 'mike',
    name: 'Mike Dawson',
    title: 'Co-founder & Chief of Safety Operations',
    photo: '/images/people/mike-dawson.png',
    summary:
      '23 years U.S. Secret Service (Ret.). Turns field intelligence into simple trip playbooks schools can use.',
    owns: [
      'Real-world playbooks for trips (outside-the-wire)',
      'Relationships with schools, churches, and public safety',
      'Threat assessment, risk mitigation, and investigative operations',
    ],
    background: [
      '23 years with U.S. Secret Service (Senior Special Agent, Retired)',
      'Led global fraud investigations, crypto crime ops, and executive protection',
      'Guest lecturer on cryptocurrency fraud and threat finance for international law enforcement',
      'Fraud & Risk Services leadership at GeoComply (fintech, crypto, gaming)',
      'Multiple DHS Exceptional Service Gold Medals & investigative excellence awards',
    ],
  },
  {
    id: 'alan',
    name: 'Alan D.',
    title: 'Chief of Protective Intelligence',
    photo: '/images/people/alan-d.png',
    summary:
      '25 years U.S. Secret Service (Ret.). Merges protective operations with digital forensics for audit-ready evidence.',
    owns: [
      "Protective intelligence & risk: merge physical protection with DFIR (digital forensics & incident response) to harden the product's Evidence Binder",
      'Enterprise & insurer credibility; high-stakes customers (universities, corporates)',
      'Channel relationships (associations, training academies, major retailers)',
    ],
    background: [
      '25 years, U.S. Secret Service Special Agent (Ret.); roles include Presidential Protection, Counter-Surveillance, CAT Team Leader, FLETC Instructor',
      'NCFI (National Computer Forensics Institute): DFIR lab manager/instructor; budget & procurement lead; retired as DSAIC managing daily operations',
      'Post-USSS: Senior Risk Research Specialist, GeoComply (cyber/fraud, identity); Senior Manager, Corporate Security for Fortune 100 companies',
      'CRISC (risk) certified; extensive experience turning investigations into prevention programs',
    ],
  },
  {
    id: 'bobby',
    name: 'Bobby Brasher',
    title: 'Co-founder & Chief of School Security',
    photo: '/images/people/bobby-brasher.png',
    summary:
      'Former Director of School Security at Brook Hill. Turns classroom and field experience into safety playbooks schools actually adopt.',
    owns: [
      'K\u201312 & faith-based safety playbooks; policy templates schools actually adopt',
      'Administrator relationships (Brook Hill network influences 400+ schools); rapid pilots \u2192 policy roll-outs',
      'De-escalation training, drills, audits; evidence standards that pass board/insurer review',
    ],
    background: [
      'Former Director of School Security, The Brook Hill School (private, international boarding)',
      "6 years sworn law enforcement (police officer & sheriff's deputy); POST certified",
      'DOJ-endorsed de-escalation instructor (law enforcement, healthcare, educators); USSS School Threat Assessment trained',
      "Samaritan's Purse International Security Team; consulted schools/churches in Latin America and Africa",
      'Worked security detail at the 2024 Republican National Convention (Milwaukee)',
      'Selected highlights: School Safety Specialist; TCOLE Police Academy & Firearms Instructor; Homeland Security/FEMA SAR; FBI Child-Abduction Rapid Response; Homeland Security Bombing Prevention (IED classification); Texas LTC & DPS PSB Level-II/III/Plain-clothes; Certified Personal Protection Officer',
    ],
  },
]

// ---------------------------------------------------------------------------
// Field Experts -- Agency Badge Grid
// ---------------------------------------------------------------------------

export const FIELD_EXPERTS_INTRO =
  "Safetrekr's analyst bench includes approximately 20 former federal agents and special operators\u2014each with hundreds of domestic and overseas advances, protective operations, and high-risk missions. They review trips, curate safety intelligence, and produce board-ready trip packets that meet board and insurer standards."

export const FIELD_EXPERTS_CALLOUT =
  'All field experts have conducted protective operations alongside U.S. military special operations forces (SOCOM, JSOC, SFOD) across domestic and international venues. They translate decades of advance work, threat assessment, and incident response into trip packets and safety documentation that schools, churches, and youth organizations can actually use.'

export const AGENCY_BADGES: AgencyBadge[] = [
  {
    id: 'usss',
    name: 'U.S. Secret Service',
    description: 'Presidential & VP Protection, Counter Assault Team',
    image: '/images/squads/usss-badge.png',
    imageType: 'file',
  },
  {
    id: 'nsw',
    name: 'Naval Special Warfare',
    description: 'SEAL Teams',
    image: '/images/squads/navy-seals-insignia.png',
    imageType: 'file',
  },
  {
    id: 'devgru',
    name: 'Naval Special Warfare Development Group',
    description: 'DEVGRU',
    image: '/images/squads/devgru-insignia.png',
    imageType: 'file',
  },
  {
    id: 'arsf',
    name: 'U.S. Army Special Forces',
    description: 'Green Berets',
    image: '/images/squads/army-sf-insignia.png',
    imageType: 'file',
  },
  {
    id: '75th-ranger',
    name: '75th Ranger Regiment',
    description: 'Army Rangers, Direct Action & Reconnaissance',
    image: '/images/squads/75th-ranger-insignia.png',
    imageType: 'file',
  },
  {
    id: '160th-soar',
    name: '160th Special Operations Aviation Regiment',
    description: 'Night Stalkers',
    image: '/images/squads/160th-soar-insignia.png',
    imageType: 'file',
  },
  {
    id: 'jcu',
    name: 'Joint Communications Unit',
    description: 'JSOC Signal & Communications Support',
    image: '/images/squads/jcu-seal.png',
    imageType: 'file',
  },
  {
    id: 'isa',
    name: 'Intelligence Support Activity',
    description: 'JSOC Intelligence, SIGINT/HUMINT',
    image: '/images/squads/isa-badge.jpg',
    imageType: 'file',
  },
  {
    id: 'marsoc',
    name: 'Marine Forces Special Operations Command',
    description: 'MARSOC, Marine Raiders',
    image: '/images/squads/marsoc-seal.png',
    imageType: 'file',
  },
  {
    id: '1st-sow',
    name: '1st Special Operations Wing',
    description: 'AFSOC, Air Force Special Operations',
    image: '/images/squads/1st-sow-insignia.png',
    imageType: 'file',
  },
]

// ---------------------------------------------------------------------------
// Technology & Delivery Partners
// ---------------------------------------------------------------------------

export const FEATURED_PARTNERS: TechPartner[] = [
  {
    id: 'jesse-orrico',
    name: 'Jesse Orrico',
    domain: 'Business & Product',
    photo: '/images/people/jesse-orrico.png',
    tier: 'featured',
  },
  {
    id: 'chris-heerdegen',
    name: 'Chris Heerdegen',
    domain: 'Ops & Monetization',
    photo: '/images/people/chris-heerdegen.png',
    tier: 'featured',
  },
  {
    id: 'justin-tabb',
    name: 'Justin Tabb',
    domain: 'AI & Emerging-Tech',
    photo: '/images/people/justin-tabb.png',
    tier: 'featured',
  },
]

export const ADDITIONAL_PARTNERS: TechPartner[] = [
  {
    id: 'mike-miller',
    name: 'Mike Miller',
    domain: 'Dev/Sec/Ops',
    photo: '/images/people/mike-miller.png',
    tier: 'standard',
  },
  {
    id: 'joe-yin',
    name: 'Joe Yin',
    domain: 'PMO Director',
    photo: '/images/people/joe-yin.png',
    tier: 'standard',
  },
  {
    id: 'david-lindahl',
    name: 'David Lindahl',
    domain: 'AIO/DM Architecture',
    photo: '/images/people/david-lindahl.png',
    tier: 'standard',
  },
]

export const PARTNERS_SUBTITLE =
  "These leaders augment Safetrekr's build velocity and credibility across product, AI, security, and PMO."

// ---------------------------------------------------------------------------
// Contact Channels
// ---------------------------------------------------------------------------

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'partnerships',
    label: 'Partnerships',
    email: 'alan@safetrekr.com',
    iconName: 'Handshake',
  },
  {
    id: 'pilots',
    label: 'Pilots & Customer Delivery',
    email: 'team@safetrekr.com',
    iconName: 'Rocket',
  },
  {
    id: 'media',
    label: 'Media & Investors',
    email: 'founders@safetrekr.com',
    iconName: 'Newspaper',
  },
]

// ---------------------------------------------------------------------------
// Bottom CTA
// ---------------------------------------------------------------------------

export const BOTTOM_CTA = {
  headline: 'Ready to protect your next trip?',
  buttonLabel: 'Request a Sample Trip Package',
  href: '/contact',
} as const

// ---------------------------------------------------------------------------
// Structured Data (JSON-LD)
// ---------------------------------------------------------------------------

export const ABOUT_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Safetrekr',
  url: 'https://www.safetrekr.com',
  description:
    'Trip safety intelligence for schools, churches, and youth organizations.',
  founders: [
    {
      '@type': 'Person',
      name: 'Mike Dawson',
      jobTitle: 'Co-founder & Chief of Safety Operations',
    },
    {
      '@type': 'Person',
      name: 'Bobby Brasher',
      jobTitle: 'Co-founder & Chief of School Security',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'partnerships',
      email: 'alan@safetrekr.com',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'team@safetrekr.com',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'media',
      email: 'founders@safetrekr.com',
    },
  ],
} as const
