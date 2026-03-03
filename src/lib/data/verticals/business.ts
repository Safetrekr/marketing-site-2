// src/lib/data/verticals/business.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'

export const BUSINESS_VERTICAL: VerticalDetailData = {
  id: 'business',
  name: 'Business',
  iconName: 'Briefcase',

  // Hero
  heroHeadline: 'Corporate duty of care -- documented, not assumed.',
  heroSubheadline:
    'Every company acknowledges a duty of care for employee travel. Few can prove they act on it. Safetrekr creates the documented, auditable record that legal, insurance, and procurement teams need -- with per-trip pricing that aligns cost to actual travel volume.',

  // The Challenge
  challengeIntro:
    'Corporate travel safety is a recognized obligation that is rarely a documented practice. Duty of care policies exist in employee handbooks. What does not exist is a system that converts that policy into verifiable, auditable action for every trip.',
  challenges: [
    {
      title: 'Duty of Care Is Policy, Not Practice',
      description:
        'Most companies have a duty of care statement in their travel policy. Few have a system that documents what specific safety measures were taken for each trip. The gap between policy and practice is where legal liability concentrates.',
    },
    {
      title: 'Variable Risk, Uniform Response',
      description:
        'An employee traveling to London and an employee traveling to Lagos face different risk profiles. Most corporate travel programs manage both the same way -- with the same approval process, the same (minimal) safety briefing, and the same lack of documentation.',
    },
    {
      title: 'No Centralized Proof',
      description:
        'When legal counsel, insurance providers, or auditors ask what safety measures were in place for a specific trip, the answer requires assembling information from email threads, approval chains, and travel booking systems. There is no single record that proves due diligence.',
    },
    {
      title: 'Annual Contracts and Per-Seat Licensing',
      description:
        'Traditional travel risk management platforms charge annual subscriptions and per-seat licensing. Companies with variable travel volumes pay for capacity they do not use. Small and mid-size companies are priced out entirely.',
    },
    {
      title: 'Compliance Separation of Duties',
      description:
        'Many corporate compliance frameworks require separation of duties -- the person who approves a trip should not be the same person who assesses its safety. Without a dedicated safety review function, this separation exists in policy but not in practice.',
    },
  ],

  // The Safetrekr Response
  responseIntro:
    'Safetrekr gives corporate travel programs the same level of documented safety management that regulated industries require -- without the annual contracts, seat licenses, or implementation projects that make traditional solutions impractical.',
  responses: [
    {
      title: 'Per-Trip Pricing',
      description:
        'No annual contracts. No seat licenses. Pay only when employees travel. Trip pricing is tiered by complexity: T1 (day trip), T2 (domestic overnight), T3 (international). Cost scales with actual travel volume.',
      featureRef: 'Pricing model',
    },
    {
      title: 'Tiered Risk Matching',
      description:
        'Trip complexity determines the safety requirements and analyst assignment level. A domestic day trip receives a different level of review than an international trip to a high-risk destination. The system matches safety rigor to actual risk.',
      featureRef: 'Trip tier system',
    },
    {
      title: 'Independent Analyst Review',
      description:
        'Every trip is reviewed by an independent safety analyst. This is not a checkbox. The analyst reviews 18 dimensions of the trip plan and documents a timestamped approval or rejection with reason codes. Separation of duties is enforced by the platform.',
      featureRef: 'Analyst review workflow',
    },
    {
      title: 'Downloadable Audit Trail',
      description:
        'Every action is logged. The complete trip record -- planning, review, approval, alert delivery, acknowledgments -- is downloadable as documentation for legal, insurance, and procurement review.',
      featureRef: 'Audit trail system',
    },
    {
      title: 'Real-Time Destination Intelligence',
      description:
        'TarvaRI intelligence engine monitors destinations for security, weather, health, transport, and political risks. Alerts are risk-scored, analyst-triaged, and delivered to travelers and travel managers.',
      featureRef: 'Intelligence engine',
    },
  ],

  // Regulatory and Compliance
  regulatoryIntro:
    'Corporate travel safety obligations derive from general duty of care standards, occupational safety regulations, and industry-specific compliance frameworks. Safetrekr is designed to document compliance with these obligations.',
  regulations: [
    {
      name: 'Duty of Care',
      fullName: 'Common Law / Corporate Duty of Care',
      description:
        'Employers have a recognized legal duty to take reasonable steps to protect employees from foreseeable harm during business travel. The standard is measured by what was documented, not what was intended.',
      safetrekrAlignment:
        'End-to-end documentation: planning, independent review, protection systems, alert delivery, acknowledgment tracking. The audit trail is the documentation of reasonable steps.',
      verified: true,
    },
    {
      name: 'OSHA General Duty Clause',
      fullName: 'Occupational Safety and Health Act Section 5(a)(1)',
      description:
        'Employers must provide a workplace "free from recognized hazards." Courts have extended this obligation to travel required as a condition of employment in certain circumstances.',
      safetrekrAlignment:
        'Trip-specific risk assessment documented through the analyst review process. Hazard identification documented across 18 review dimensions. Evidence of mitigation measures recorded.',
      verified: true,
    },
    {
      name: 'ISO 31030',
      fullName: 'ISO 31030:2021 Travel Risk Management',
      description:
        'International standard providing guidance on travel risk management for organizations. Covers risk assessment, duty of care, traveler preparedness, monitoring, and incident response.',
      safetrekrAlignment:
        "Safetrekr's lifecycle (Plan, Review, Protect, Monitor) is designed with ISO 31030's framework in mind. Independent analyst review addresses the risk assessment component. Real-time intelligence addresses monitoring. Emergency preparedness addresses incident response planning.",
      verified: false,
    },
    {
      name: 'GDPR',
      fullName: 'General Data Protection Regulation',
      description:
        'For companies with EU employees or travel to EU destinations, GDPR governs the collection and processing of employee personal data.',
      safetrekrAlignment:
        'GDPR-aware data governance: user-initiated data export, account deletion, consent history, analytics opt-in/out. Database-layer data isolation.',
      verified: true,
    },
  ],

  // Feature Spotlights
  featureSpotlights: [
    {
      title: 'Per-Trip Pricing',
      description:
        'Pay when employees travel. No annual minimums. No seat licenses. Cost aligns with actual travel volume -- not projected headcount.',
      metric: 'No annual contract',
      iconName: 'Receipt',
    },
    {
      title: '18-Dimension Safety Review',
      description:
        'Every trip reviewed across 18 safety dimensions by an independent analyst. Separation of duties is not a policy checkbox -- it is enforced by the platform architecture.',
      metric: '18 dimensions, independent',
      iconName: 'Shield',
    },
    {
      title: 'Downloadable Audit Trail',
      description:
        'Complete trip record -- from planning through completion -- downloadable as documentation. Formatted for legal, insurance, procurement, and compliance review.',
      metric: 'Full lifecycle documentation',
      iconName: 'FileDown',
    },
    {
      title: 'Risk-Scored Intelligence',
      description:
        'Destination monitoring with severity classification and confidence bands. Analyst-triaged before delivery. Travel managers receive only relevant, verified intelligence.',
      metric: 'Risk-scored, analyst-triaged',
      iconName: 'AlertTriangle',
    },
  ],

  // Differentiator Callout
  accountabilityQuestion:
    '"When your legal team asks: \'Can you prove we performed due diligence on employee safety for this trip?\' -- what is your answer?"',
  accountabilityAnswer:
    'With Safetrekr, the answer is a downloadable audit trail: every planning decision, every independent review finding, every alert delivery, and every acknowledgment. An independent analyst -- not your internal team -- reviewed the trip and documented the approval. Due diligence is not an assertion. It is a record.',

  // Case Study Placeholder
  caseStudy: {
    verticalType: 'Corporate / Business',
    suggestedTitle:
      'How [Company Name] Documented Duty of Care for 500 Employee Trips with Per-Trip Pricing',
    suggestedMetrics: [
      'Cost per traveler vs. previous solution',
      'Time from trip submission to analyst approval',
      'Audit documentation completeness rate',
      'Travel manager satisfaction score',
    ],
    placeholderCopy:
      'We are partnering with businesses to measure the impact of documented duty of care on legal readiness and travel program cost. If your company sends employees on domestic or international travel, schedule a briefing to see how Safetrekr documents every safeguard -- with per-trip pricing that scales with your actual travel volume.',
  },

  // Objection Hook
  objectionQuestion: '"We already use a travel management company."',
  objectionAnswer:
    'Travel management companies book flights and hotels. They do not review your safety plan across 18 dimensions, assign an independent analyst, document every safeguard, or generate an audit trail for legal review. Safetrekr does not replace your TMC. It adds the documented safety layer that your TMC does not provide -- and that your legal team will ask about after an incident.',

  // CTA
  ctaMicrocopy:
    'Tell us about your travel program. We will show you how Safetrekr documents duty of care for every business trip.',

  // SEO
  seoTitle:
    'Safetrekr for Business -- Corporate Travel Safety and Duty of Care Documentation',
  seoDescription:
    'Corporate duty of care -- documented, not assumed. Safetrekr provides per-trip safety management with independent analyst review, real-time intelligence, and downloadable audit trails for legal and insurance review.',
  seoKeywords: [
    'corporate travel safety management',
    'duty of care documentation',
    'business travel risk management',
    'corporate travel safety platform',
  ],
}
