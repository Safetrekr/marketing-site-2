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
    'Field trips are where learning comes alive -- and where liability exposure is highest. Most districts manage trip safety with paper forms, spreadsheet trackers, and email chains. The process works until it does not.',
  challenges: [
    {
      title: 'Consent Collection at Scale',
      description:
        'Parental consent forms are sent home in backpacks, returned to teachers, and filed in folders. Tracking who has returned what -- and following up with who has not -- falls to administrators already managing a dozen other priorities. Missing forms are discovered on departure day.',
    },
    {
      title: 'Chaperone Screening Gaps',
      description:
        'Background checks for volunteer chaperones are managed through separate systems or not managed at all. State requirements vary. Screening status is tracked in spreadsheets that do not alert anyone when a check expires or a new requirement takes effect.',
    },
    {
      title: 'No Independent Safety Review',
      description:
        'The person who plans the trip is the same person who approves it. There is no separation of duties, no second pair of eyes, and no documented evidence that someone independent verified the safety plan before students boarded the bus.',
    },
    {
      title: 'Regulatory Complexity',
      description:
        'FERPA governs student records. COPPA restricts data collection for children under 13. State-level field trip safety mandates vary by jurisdiction. Administrators bear the compliance burden without a system designed to enforce it.',
    },
    {
      title: 'Accountability After the Fact',
      description:
        'When a school board member, a superintendent, or a parent asks what safeguards were in place for a trip, the answer depends on which teacher kept the best records. There is no centralized, timestamped audit trail.',
    },
    {
      title: 'Emergency Preparedness as Afterthought',
      description:
        'Emergency plans exist as a paragraph in a permission slip, not as an operational system. Rally points, medical facilities, and evacuation routes are not mapped, not communicated to chaperones, and not accessible on a phone at 2 AM.',
    },
  ],

  // The Safetrekr Response
  responseIntro:
    'Safetrekr replaces scattered tools with one platform that enforces the process, documents every step, and produces the proof that your district acted with diligence.',
  responses: [
    {
      title: 'Structured Consent and Document Collection',
      description:
        '9 document requirement templates with role-based targeting. Automated reminders at 7, 3, and 1 day before deadline. Administrators see a real-time compliance dashboard -- not a folder of returned slips.',
      featureRef: 'Document collection system',
    },
    {
      title: 'Background Check Compliance Matrix',
      description:
        "5 background check types across 3 integrated providers (Checkr, Sterling, GoodHire). A participant-by-check matrix shows every chaperone's screening status at a glance -- with six-status tracking from not started through cleared.",
      featureRef: 'Background check system',
    },
    {
      title: 'Independent Analyst Review',
      description:
        'Every trip passes through an independent safety analyst who reviews the plan across 18 dimensions before departure. The analyst is not part of the school. Separation of duties is enforced by the platform, not by policy.',
      featureRef: 'Analyst review workflow',
    },
    {
      title: 'Student Data Privacy by Design',
      description:
        'Row Level Security isolates organization data at the database layer. Two-factor authentication. Consent audit trails with timestamped records. Safetrekr is designed with student data privacy requirements in mind from the architecture level.',
      featureRef: 'Data architecture',
    },
    {
      title: 'Complete Audit Trail',
      description:
        'Every action is logged: trip creation, roster additions, document submissions, analyst reviews, approval decisions, checklist acknowledgments. When stakeholders ask questions, you have timestamped, attributed, complete answers.',
      featureRef: 'Audit trail system',
    },
    {
      title: 'Active Emergency Preparedness',
      description:
        'Rally points with GPS coordinates and automatic geofencing. Medical facility directories with trauma capability levels. Three-tier evacuation planning. SMS emergency broadcast to all trip participants. Emergency preparedness is an active system, not a paragraph in a permission slip.',
      featureRef: 'Protection system',
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
