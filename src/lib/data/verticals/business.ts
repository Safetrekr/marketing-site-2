// src/lib/data/verticals/business.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'

export const BUSINESS_VERTICAL: VerticalDetailData = {
  id: 'business',
  name: 'Corporate Travel',
  iconName: 'Briefcase',

  // Hero
  heroHeadline: 'Corporate duty of care -- documented, not assumed.',
  heroSubheadline:
    'Every company acknowledges a duty of care for employee travel. Few can prove they act on it. Safetrekr creates the documented, auditable record that legal, insurance, and procurement teams need -- with per-trip pricing that aligns cost to actual travel volume.',

  // The Challenge
  challengeIntro:
    'The duty of care gap in group travel: organizations that send employees, athletes, or teams on trips carry a legal obligation to protect them. Most can articulate the obligation but cannot produce documented evidence of the precautions they took.',
  challenges: [
    {
      title: 'Duty of Care Without a System Behind It',
      description:
        'Organizations that send employees, athletes, or teams on trips carry a legal obligation to protect them. Most can articulate the obligation but cannot produce documented evidence of the precautions they took for any given trip.',
    },
    {
      title: 'No Real-Time Visibility into Travel Conditions',
      description:
        'When severe weather, a security incident, or a health advisory affects a destination where your people are traveling, most organizations find out the same way their travelers do -- from a news alert. Getting safety guidance to every affected person means phone calls and text chains.',
    },
    {
      title: 'Unstructured Emergency Response',
      description:
        'Most organizations have no pre-established evacuation plans, rally points, or emergency resource mapping for their travel destinations. When a crisis occurs, the first hours are spent gathering information instead of acting on it.',
    },
    {
      title: 'Safety Planning Falls on People with Other Jobs',
      description:
        'The person coordinating team travel, the tournament director, the office manager planning the retreat -- they are not safety professionals. Their emergency planning is a contact list on a spreadsheet and a vague expectation that someone will handle it.',
    },
  ],

  // The Safetrekr Response
  responseIntro:
    'Safetrekr gives corporate and sports organizations the same level of documented safety management that regulated industries require -- with per-trip pricing that aligns cost to actual travel volume.',
  responses: [
    {
      title: 'Documented Duty of Care for Every Trip',
      description:
        'A professional safety analyst independently reviews your trip across 18 dimensions and produces a complete documented record -- emergency preparedness plans, safety checklists, real-time monitoring, and board-ready trip packets with a full audit trail. Defensible evidence of the precautions your organization took.',
      featureRef: 'Analyst review workflow',
    },
    {
      title: 'Real-Time Monitoring with Analyst-Reviewed Alerts',
      description:
        'Continuous monitoring from 11+ authoritative government sources. When conditions change at your destination, alerts are reviewed by a human analyst and routed to your travelers via email, SMS, and in-app delivery -- with course-of-action guidance and acknowledgment tracking.',
      featureRef: 'Intelligence engine',
    },
    {
      title: 'Traveler App for Your Entire Team',
      description:
        'Every traveler gets the Safetrekr Traveler App with live safety checklists, real-time alerts, emergency contacts, medical facilities, and evacuation plans accessible on-device. For sports organizations, parents of minor athletes also access the app. Every acknowledgment is tracked.',
      featureRef: 'Traveler App',
    },
    {
      title: 'Background Checks and Screening',
      description:
        'Five check types through three integrated providers for coaches, chaperones, volunteers, and staff. A compliance matrix shows every participant\'s clearance status. Organization-level tracking maintains records across trips. $35/person domestic, $65/person international.',
      featureRef: 'Background check system',
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
        "Safetrekr's lifecycle (Plan, Review, Connect, Monitor, Document) is designed with ISO 31030's framework in mind. Independent analyst review addresses the risk assessment component. Real-time intelligence addresses monitoring. Emergency preparedness addresses incident response planning.",
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
