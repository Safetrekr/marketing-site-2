// src/lib/data/verticals/higher-ed.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'

export const HIGHER_ED_VERTICAL: VerticalDetailData = {
  id: 'higher-ed',
  name: 'Higher Education',
  iconName: 'Building2',

  // Hero
  heroHeadline:
    'Study abroad. Exchange programs. Research expeditions. All verified.',
  heroSubheadline:
    "Universities send students, faculty, and researchers across borders and time zones. Safetrekr gives institutional risk management a single system of record -- with independent safety review that creates the separation of duties your compliance framework requires.",

  // The Challenge
  challengeIntro:
    'Higher education travel is high-stakes, high-complexity, and high-visibility. Study abroad programs, faculty research trips, athletic travel, and conference attendance create a web of institutional liability that most risk management offices navigate with spreadsheets and institutional memory.',
  challenges: [
    {
      title: 'International Risk at Scale',
      description:
        'A mid-sized university may operate programs in 20+ countries simultaneously. Each destination carries distinct security, health, political, and infrastructure risks. Risk assessment is often performed once at program inception and rarely updated.',
    },
    {
      title: 'Institutional Liability Exposure',
      description:
        'When a student is harmed abroad, the institution\'s legal exposure depends on what safeguards were documented -- not what safeguards were intended. Risk management offices need proof that due diligence was performed for every trip, not just the high-profile ones.',
    },
    {
      title: 'Compliance Across Departments',
      description:
        'Study abroad, athletics, research, and faculty travel are managed by different offices with different processes. Compliance documentation is siloed. No single system tracks safety measures across all institutional travel programs.',
    },
    {
      title: 'Clery Act Reporting Obligations',
      description:
        'The Clery Act requires reporting of certain crimes at locations associated with the institution, including study abroad sites. Institutions need documented awareness of safety conditions at program locations.',
    },
    {
      title: 'Duty of Care Documentation',
      description:
        'Institutional duty of care for student safety abroad is well-established in case law. What is less established is how institutions document that duty in practice. The gap between policy and documentation is where liability lives.',
    },
  ],

  // The Safetrekr Response
  responseIntro:
    "Safetrekr gives the risk management office, the study abroad team, and the provost's office a shared platform that documents institutional due diligence for every trip -- with independent verification that no internal team can provide alone.",
  responses: [
    {
      title: 'International Destination Intelligence',
      description:
        'TarvaRI intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored with confidence bands and analyst-triaged before delivery. Risk assessment is continuous, not annual.',
      featureRef: 'Intelligence engine',
    },
    {
      title: 'Tiered Analyst Review',
      description:
        "Senior analysts are assigned to international trips. Mid-level analysts handle domestic travel. Every trip is reviewed across 18 dimensions by someone independent of the program office. The review is documented with timestamps and attribution.",
      featureRef: 'Analyst review workflow',
    },
    {
      title: 'Institutional Audit Documentation',
      description:
        'Every trip generates a complete audit trail: planning decisions, roster verification, document collection, analyst review, approval decisions, alert deliveries, and checklist acknowledgments. Downloadable for risk management, legal, and insurance review.',
      featureRef: 'Audit trail system',
    },
    {
      title: 'Visa and Passport Tracking',
      description:
        'International trip planning includes visa and passport documentation tracking per participant. Compliance status is visible at a glance.',
      featureRef: 'Trip planning wizard',
    },
    {
      title: 'Cross-Program Visibility',
      description:
        'All institutional travel -- study abroad, athletics, research, conferences -- managed in one platform. Risk management sees every active trip, every pending review, and every flagged issue from a single dashboard.',
      featureRef: 'Client dashboard',
    },
  ],

  // Regulatory and Compliance
  regulatoryIntro:
    'Universities operate within a regulatory framework that extends institutional obligations beyond the campus. Safetrekr is designed to support compliance with these requirements for all institutional travel.',
  regulations: [
    {
      name: 'Clery Act',
      fullName:
        'Jeanne Clery Disclosure of Campus Security Policy and Campus Crime Statistics Act',
      description:
        'Requires institutions to report campus security policies and crime statistics, including at non-campus locations such as study abroad sites.',
      safetrekrAlignment:
        'Real-time intelligence monitoring for program locations. Documented awareness of safety conditions. Alert acknowledgment tracking provides evidence of institutional awareness.',
      verified: false,
    },
    {
      name: 'FERPA',
      fullName: 'Family Educational Rights and Privacy Act',
      description:
        'Protects student education records. Applies to institutional systems that collect or store student data.',
      safetrekrAlignment:
        'Database-layer data isolation with Row Level Security. Organization-scoped access. No cross-institution data leakage. Consent audit trails.',
      verified: false,
    },
    {
      name: 'Title IX',
      fullName: 'Title IX of the Education Amendments of 1972',
      description:
        'Prohibits sex-based discrimination, including in travel and study abroad contexts. Institutions must address safety and reporting mechanisms for students traveling under institutional programs.',
      safetrekrAlignment:
        'Documented safety review process with independent verification. Issue flagging and tracking within the analyst review workflow. Evidence management for institutional review.',
      verified: false,
    },
    {
      name: 'Institutional Duty of Care',
      fullName: 'Common law / case law precedents',
      description:
        'Courts have established that universities owe a duty of care to students participating in institutional travel programs. The standard requires reasonable steps to protect students from foreseeable harm.',
      safetrekrAlignment:
        'End-to-end documentation of safety measures: planning, independent review, protection systems, traveler delivery, and monitoring. The audit trail is the documentation of reasonable steps.',
      verified: true,
    },
  ],

  // Feature Spotlights
  featureSpotlights: [
    {
      title: 'Real-Time Intelligence Engine',
      description:
        'Multi-source aggregation of security, weather, health, transport, and political risk data for every destination. Alerts scored by confidence with percentile bands. Analyst-triaged before delivery.',
      metric: 'Continuous monitoring',
      iconName: 'Globe',
    },
    {
      title: 'Senior Analyst Assignment',
      description:
        "International trips are assigned to senior analysts with expertise matching the trip's complexity. Every review decision is timestamped and attributed.",
      metric: 'Tiered analyst matching',
      iconName: 'UserCheck',
    },
    {
      title: 'Emergency Evacuation Planning',
      description:
        'Three-tier evacuation protocols: shelter in place, local evacuation, and full relocation. Medical facility directories with trauma capability levels and estimated travel times.',
      metric: '3 evacuation tiers',
      iconName: 'LifeBuoy',
    },
    {
      title: 'Offline-First Traveler App',
      description:
        'Students access safety information, checklists, and emergency contacts on their devices -- even without network connectivity. All critical trip data cached locally.',
      metric: 'Works offline',
      iconName: 'Smartphone',
    },
  ],

  // Differentiator Callout
  accountabilityQuestion:
    '"When the university\'s risk counsel asks: \'Can you demonstrate that an independent party reviewed the safety plan for every study abroad program this year?\' -- what is your answer?"',
  accountabilityAnswer:
    'With Safetrekr, every program trip is reviewed by an independent analyst across 18 dimensions before departure. The review is documented -- not self-reported. When risk counsel or insurance needs proof, the audit trail shows who reviewed what, when, and what they found.',

  // Case Study Placeholder
  caseStudy: {
    verticalType: 'University Study Abroad Program',
    suggestedTitle:
      'How [University Name] Standardized Safety Review for 50+ Study Abroad Programs',
    suggestedMetrics: [
      'Number of international programs reviewed',
      'Time from trip submission to analyst review completion',
      'Compliance documentation coverage rate',
      'Alert response time for international destinations',
    ],
    placeholderCopy:
      'We are partnering with universities to measure the impact of independent safety review on institutional travel programs. If your institution manages study abroad, faculty research, or athletic travel, schedule a briefing to see how Safetrekr documents safety for every trip.',
  },

  // Objection Hook
  objectionQuestion:
    '"Our study abroad office already has a risk assessment process."',
  objectionAnswer:
    'Safetrekr does not replace your risk assessment -- it verifies and documents it independently. Your study abroad team knows the programs. An independent analyst verifies that the safety measures are complete, current, and documented. The difference is not in the quality of your team\'s work. The difference is in the institutional record that proves someone independent checked.',

  // CTA
  ctaMicrocopy:
    "Tell us about your institution's travel programs. We will show you how Safetrekr creates institutional audit documentation for every trip.",

  // SEO
  seoTitle:
    'Safetrekr for Higher Education -- Study Abroad and Institutional Travel Safety',
  seoDescription:
    'Study abroad. Exchange programs. Research expeditions. Faculty travel. Safetrekr gives universities a verified safety platform with independent analyst review and institutional audit documentation.',
  seoKeywords: [
    'study abroad risk management',
    'university travel safety platform',
    'higher education trip safety',
    'institutional travel risk management',
  ],
}
