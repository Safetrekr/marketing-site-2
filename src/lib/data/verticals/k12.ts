// src/lib/data/verticals/k12.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'

export const K12_VERTICAL: VerticalDetailData = {
  id: 'k12',
  name: 'K-12 Schools',
  iconName: 'GraduationCap',

  // Hero
  heroHeadline:
    'Every field trip. Every student. Every safeguard documented.',
  heroSubheadline:
    'School administrators plan field trips knowing the stakes. Safetrekr gives them a system that documents every safeguard, verifies every background check, and produces the audit trail that school boards, superintendents, and parents expect.',

  // The Challenge
  challengeIntro:
    'The reality of trip safety at most schools: the person responsible for getting 30 students safely to a destination and back is also a teacher, a coach, or a club advisor.',
  challenges: [
    {
      title: 'Your Trip Coordinator Is Already Doing Three Jobs',
      description:
        'The person responsible for safety planning is also a teacher, a coach, or a club advisor. Their safety plan is a spreadsheet, a shared Google Doc, and a printout from the hotel website. Their emergency protocol is a group text.',
    },
    {
      title: 'The Board Asks for Documentation and Gets a Manila Folder',
      description:
        'When a board member or insurer asks what precautions you took, most schools can produce a manila folder and the words "we did our best." That answer is increasingly insufficient as defense costs for educational organizations have nearly doubled -- regardless of prior claims history.',
    },
    {
      title: 'No Real-Time Information During Travel',
      description:
        'When severe weather hits or a security situation develops at your destination, your coordinator finds out from a weather app or a news alert. Getting that information to every chaperone means a group text and hoping everyone sees it.',
    },
    {
      title: 'Rising Liability Exposure',
      description:
        'K-12 institutions reported $203 million in large losses in a single recent reporting period. A single trip-related incident can cost $50,000 to $500,000 or more in legal fees, settlements, and insurance increases -- and the standard for what constitutes "reasonable care" is rising every year.',
    },
  ],

  // The Safetrekr Response
  responseIntro:
    'Safetrekr replaces scattered tools with one platform where a professional safety analyst handles the safety planning -- your coordinator submits the trip in about 15 minutes, the analyst handles the rest.',
  responses: [
    {
      title: 'Professional Analyst Review for Every Trip',
      description:
        'A trained safety analyst -- not an algorithm, not a volunteer parent -- independently reviews your trip across 18 safety dimensions. They verify every location, map nearby hospitals with trauma levels and travel times, build evacuation plans, and document every decision with a full audit trail.',
      featureRef: 'Analyst review workflow',
    },
    {
      title: 'Live Safety Delivery Through the Traveler App',
      description:
        'Every trip participant -- travelers, chaperones, and guardians -- accesses the Safetrekr Traveler App. Safety checklists delivered directly to their devices. Emergency contacts, medical facilities, and evacuation plans accessible on-device. Every acknowledgment is tracked.',
      featureRef: 'Traveler App',
    },
    {
      title: 'Real-Time Intelligence Monitoring',
      description:
        'Safetrekr continuously monitors conditions at your destinations using 11+ authoritative government sources including the National Weather Service, USGS, CDC, and State Department. Alerts are reviewed by a human analyst before reaching your team -- with course-of-action guidance.',
      featureRef: 'Intelligence engine',
    },
    {
      title: 'Board-Ready Trip Packets with Complete Audit Trail',
      description:
        "Role-based trip packets in four variants -- traveler, chaperone, guardian, and administrator -- each containing only the information relevant to that role. Your school's branding appears on every packet. Every alert, checklist, and safety decision documented with timestamps.",
      featureRef: 'Audit trail system',
    },
  ],

  // Regulatory and Compliance
  regulatoryIntro:
    'K-12 field trips operate within a web of federal and state regulations. Safetrekr is architected to support compliance with these requirements -- not to add complexity to them.',
  regulations: [
    {
      name: 'FERPA',
      fullName: 'Family Educational Rights and Privacy Act',
      description:
        'Governs access to and disclosure of student education records. Any system handling student data must protect record confidentiality.',
      safetrekrAlignment:
        'Database-layer data isolation with Row Level Security. Organization-scoped access. Consent audit trails. No cross-organization data leakage.',
      verified: false,
    },
    {
      name: 'COPPA',
      fullName: "Children's Online Privacy Protection Act",
      description:
        'Restricts collection and use of personal information from children under 13. Applies to school-directed technology use.',
      safetrekrAlignment:
        "Safetrekr's data collection is organization-directed, not child-directed. Parental consent workflows are built into the document collection system. Data minimization principles applied to traveler profiles.",
      verified: false,
    },
    {
      name: 'State Field Trip Mandates',
      fullName: 'Varies by jurisdiction',
      description:
        'State-level requirements for field trip approval processes, chaperone ratios, background check types, transportation safety, and emergency preparedness documentation.',
      safetrekrAlignment:
        "Configurable trip defaults allow districts to set chaperone ratios, required data fields, and document requirements per their state's mandates. The 10-step wizard enforces completeness at each stage.",
      verified: false,
    },
    {
      name: 'Volunteer Screening Laws',
      fullName: 'Varies by state',
      description:
        'Background check requirements for adults who interact with students in a supervisory capacity. Some states mandate specific check types (criminal, sex offender registry).',
      safetrekrAlignment:
        '5 background check types available. Compliance matrix tracks status per participant per check type. Expiration monitoring prevents lapsed screenings from going unnoticed.',
      verified: true,
    },
  ],

  // Feature Spotlights
  featureSpotlights: [
    {
      title: '10-Step Trip Planning Wizard',
      description:
        'Walks administrators through every detail a safety reviewer needs -- from basic logistics to emergency preparedness. Enforces completeness at each stage.',
      metric: '10 structured steps',
      iconName: 'ClipboardCheck',
    },
    {
      title: '18-Dimension Analyst Review',
      description:
        'Independent analyst reviews every trip across 18 safety dimensions. Overview, participants, air travel, lodging, venues, itinerary, transportation, safety review, emergency preparedness, documents, background checks, intel alerts, issues, evidence, checklists, packet builder, communications, and approval.',
      metric: '18 review dimensions',
      iconName: 'Shield',
    },
    {
      title: 'Geo-Triggered Safety Checklists',
      description:
        "Context-appropriate safety guidance delivered to students' and chaperones' devices when they enter designated zones. Pre-departure checklists triggered by date. Acknowledgment recorded.",
      metric: 'Delivered to every device',
      iconName: 'MapPin',
    },
    {
      title: 'Fire Safety Assessment',
      description:
        'Lodging review automatically flags rooms above the sixth floor. Accommodation check-in/check-out dates, floor assignments, and contact information documented.',
      metric: 'Automatic floor flagging',
      iconName: 'Flame',
    },
  ],

  // Differentiator Callout
  accountabilityQuestion:
    '"When a school board member asks: \'Who reviewed the safety plan before we sent 40 students on that trip?\' -- what is your answer?"',
  accountabilityAnswer:
    'With Safetrekr, the answer is specific: "An independent safety analyst -- not part of our staff -- reviewed the trip across 18 dimensions and approved it on [date] at [time]. Here is the full review record." Separation of duties is not a policy. It is built into the platform.',

  // Case Study Placeholder
  caseStudy: {
    verticalType: 'K-12 School District',
    suggestedTitle:
      'How [District Name] Documented Safety for 200+ Field Trips in One Year',
    suggestedMetrics: [
      'Time to complete trip planning (before/after)',
      'Consent form completion rate',
      'Background check compliance rate at departure',
      'Number of trips reviewed by independent analyst',
    ],
    placeholderCopy:
      'We are currently partnering with school districts in pilot programs to measure the impact of structured trip safety management. If your district is interested in participating, schedule a briefing to learn how Safetrekr can document every safeguard for every field trip.',
  },

  // Objection Hook
  objectionQuestion:
    '"Our district has managed field trips safely for years without a platform."',
  objectionAnswer:
    'Managing safely and documenting safely are different things. Your teachers and administrators do excellent work. Safetrekr does not replace their judgment -- it documents their diligence. When a parent, a board member, or an attorney asks what safeguards were in place, the difference between "we followed our process" and "here is the timestamped record of every safeguard, reviewed by an independent analyst" is the difference between a verbal assurance and documented proof.',

  // CTA
  ctaMicrocopy:
    'Tell us about your district. We will show you how Safetrekr documents every field trip from planning through completion.',

  // SEO
  seoTitle:
    'Safetrekr for K-12 Schools -- Field Trip Safety Management with Independent Review',
  seoDescription:
    'Every field trip. Every student. Every safeguard documented. Safetrekr replaces paper checklists and scattered spreadsheets with a verified, auditable trip safety platform for school districts.',
  seoKeywords: [
    'school field trip safety management',
    'K-12 trip safety platform',
    'field trip compliance software',
    'school trip safety documentation',
  ],
}
