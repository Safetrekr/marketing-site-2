// src/lib/data/verticals/youth-sports.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'

export const YOUTH_SPORTS_VERTICAL: VerticalDetailData = {
  id: 'youth-sports',
  name: 'Youth Sports',
  iconName: 'Trophy',

  // Hero
  heroHeadline:
    'Tournament travel is complex. Protecting your athletes is not optional.',
  heroSubheadline:
    'Youth sports organizations send athletes, coaches, and volunteers across state lines for tournaments, camps, and competitions. Safetrekr documents the screening, safety planning, and emergency preparedness that athletes\' parents and governing bodies expect.',

  // The Challenge
  challengeIntro:
    'Youth sports travel is uniquely complex: minors under the supervision of non-parental adults, multi-jurisdictional travel, rapid roster changes, and a web of compliance requirements that most organizations track in spreadsheets -- if they track them at all.',
  challenges: [
    {
      title: 'Coach and Volunteer Screening Across Jurisdictions',
      description:
        'Tournaments cross state lines. Background check requirements vary by state and by governing body. Tracking who has been screened, what type of check was performed, and when it expires is a manual process that breaks down with roster changes and multi-team travel.',
    },
    {
      title: 'SafeSport Compliance Tracking',
      description:
        'The U.S. Center for SafeSport requires trained and certified adults in supervisory roles. Certification expires. Tracking completion, expiration, and renewal for every coach, assistant, and volunteer across every team is an administrative burden that falls on volunteer coordinators.',
    },
    {
      title: 'Medical Consent and Emergency Contacts for Minors',
      description:
        'Every traveling minor needs medical consent forms and emergency contact information on file. Forms are collected on paper, stored in a binder, and carried by a team manager. If the binder is in the hotel and the emergency is at the venue, the forms are inaccessible.',
    },
    {
      title: 'Multi-Team Travel Coordination',
      description:
        'Tournaments involve multiple teams traveling to the same location with different schedules, different lodging, and different adult supervisors. There is no centralized view of who is where, who is responsible, and who has been screened.',
    },
    {
      title: 'Real-Time Communication During Events',
      description:
        'When weather, security, or venue issues arise during a tournament, team managers rely on group texts and phone trees. There is no broadcast system, no acknowledgment tracking, and no documentation that critical safety information reached every adult responsible for athletes.',
    },
  ],

  // The Safetrekr Response
  responseIntro:
    'Safetrekr gives youth sports organizations the same level of documented safety management that schools and corporations use -- adapted for the realities of tournament travel, multi-team coordination, and governing body compliance.',
  responses: [
    {
      title: 'Background Check Compliance Matrix',
      description:
        'Every adult with supervisory responsibility -- coaches, assistants, volunteers, team managers -- tracked in a participant-by-check matrix. 5 check types. 3 providers. Six-status tracking from not started through cleared.',
      featureRef: 'Background check system',
    },
    {
      title: 'Certification Tracking with Expiration Monitoring',
      description:
        '12 predefined certification types including SafeSport, CPR, First Aid, AED, and coaching certifications. Expiration monitoring flags certifications that are expiring or expired. Automated reminders before deadlines.',
      featureRef: 'Certification tracking',
    },
    {
      title: 'Structured Medical Consent Collection',
      description:
        'Digital medical consent and emergency contact collection with role-based targeting. Automated reminders at 7, 3, and 1 day before deadline. Accessible on every authorized device -- not locked in a binder at the hotel.',
      featureRef: 'Document collection',
    },
    {
      title: 'SMS Emergency Broadcast',
      description:
        'Coaches and team managers can send SMS broadcasts to all trip participants. Alerts are delivered immediately. Acknowledgment is tracked and documented. When the tournament venue issues a weather delay, every parent and coach receives the message -- with proof.',
      featureRef: 'Emergency broadcast',
    },
    {
      title: 'Independent Analyst Review',
      description:
        'Every tournament trip is reviewed by an independent safety analyst before departure. The analyst verifies screening compliance, emergency preparedness, and trip logistics. The review is documented for governing body audits.',
      featureRef: 'Analyst review workflow',
    },
  ],

  // Regulatory and Compliance
  regulatoryIntro:
    'Youth sports travel operates under a patchwork of federal, state, and governing body requirements. Safetrekr helps organizations maintain compliance across all of them.',
  regulations: [
    {
      name: 'SafeSport',
      fullName: 'U.S. Center for SafeSport / SafeSport Trained',
      description:
        'Requires trained and certified adults in supervisory roles within amateur sports organizations. Certification must be current and renewed per governing body timelines.',
      safetrekrAlignment:
        'Certification tracking with 12 predefined types including SafeSport. Expiration monitoring flags lapsed certifications. Compliance status visible at a glance per participant.',
      verified: true,
    },
    {
      name: 'State Background Check Mandates',
      fullName: 'Varies by state',
      description:
        'Many states require background checks for adults who supervise minors in organized activities, including youth sports. Check types and frequencies vary.',
      safetrekrAlignment:
        '5 background check types across 3 providers. Compliance matrix tracks per-participant, per-check-type status. Organizations can configure which check types are required per trip.',
      verified: true,
    },
    {
      name: 'Minor Medical Consent',
      fullName: 'State-level parental consent laws',
      description:
        'Parental or guardian medical consent is required for minors participating in travel activities. Organizations must have current consent forms accessible during travel.',
      safetrekrAlignment:
        'Document collection system with role-based targeting (parents/guardians). Configurable due dates with automated reminders. Forms accessible on authorized devices during travel.',
      verified: true,
    },
    {
      name: 'AED/EAP Requirements',
      fullName: 'Varies by state and governing body',
      description:
        'Some states and governing bodies require Automated External Defibrillator availability and Emergency Action Plans for organized athletic events.',
      safetrekrAlignment:
        'Emergency preparedness configuration includes medical facility directories and emergency kit profiles. Certification tracking covers AED and First Aid certifications for supervisory adults.',
      verified: true,
    },
  ],

  // Feature Spotlights
  featureSpotlights: [
    {
      title: 'Certification Tracking',
      description:
        'SafeSport, CPR, First Aid, AED, coaching certifications, and more. 12 predefined types with expiration monitoring. Automated reminders before deadlines. Valid, expiring, and expired statuses at a glance.',
      metric: '12 certification types',
      iconName: 'Award',
    },
    {
      title: 'Background Check Matrix',
      description:
        "One view showing every adult's screening status across every required check type. Criminal, sex offender, driving, employment, education. Six statuses per check. No spreadsheet required.",
      metric: '5 check types, 6 statuses',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Geo-Triggered Checklists',
      description:
        "Context-appropriate safety checklists delivered to coaches' and team managers' devices when they arrive at tournament venues. Venue-specific information, emergency contacts, and safety protocols -- on the device, not in a binder.",
      metric: 'Delivered at venue arrival',
      iconName: 'MapPin',
    },
    {
      title: 'Real-Time Alerts with Acknowledgment',
      description:
        'Weather, security, or venue alerts delivered to every authorized adult. Acknowledgment tracked per recipient. Proof that the coach at Field 3 received the lightning delay notice at 2:47 PM.',
      metric: 'Proof of receipt',
      iconName: 'Bell',
    },
  ],

  // Differentiator Callout
  accountabilityQuestion:
    '"When a parent asks: \'How do you verify that every adult traveling with my child has been screened and certified?\' -- what is your answer?"',
  accountabilityAnswer:
    'With Safetrekr, the answer is a compliance matrix: every adult, every check type, every certification -- with status, date, and expiration. An independent analyst verifies the complete picture before departure. The documentation is not a spreadsheet you maintain. It is a verified record the platform enforces.',

  // Case Study Placeholder
  caseStudy: {
    verticalType: 'Youth Sports Organization',
    suggestedTitle:
      'How [Organization Name] Managed SafeSport Compliance for 30 Teams Across 12 Tournaments',
    suggestedMetrics: [
      'SafeSport certification compliance rate',
      'Background check completion rate at departure',
      'Time from trip creation to analyst approval',
      'Number of emergency broadcasts sent with acknowledgment tracking',
    ],
    placeholderCopy:
      'We are partnering with youth sports organizations to measure the impact of structured travel safety on compliance and parent confidence. If your organization coordinates tournament travel, schedule a briefing to see how Safetrekr tracks every screening, certification, and safety measure for every trip.',
  },

  // Objection Hook
  objectionQuestion:
    '"We are a volunteer-run organization. We do not have bandwidth for another platform."',
  objectionAnswer:
    'The 10-step wizard asks questions your team managers already know: destination, dates, roster, lodging. Safetrekr does not create new work -- it structures the work you are already doing and adds the screening verification and independent review that your volunteers cannot do alone. The platform carries the compliance burden. Your volunteers carry the mission.',

  // CTA
  ctaMicrocopy:
    'Tell us about your travel program. We will show you how Safetrekr tracks screening, certifications, and safety for every tournament trip.',

  // SEO
  seoTitle:
    'Safetrekr for Youth Sports -- Tournament Travel Safety and SafeSport Compliance',
  seoDescription:
    'Tournament travel is complex. Protecting your athletes is not optional. Safetrekr provides coach screening, medical consent, certification tracking, and real-time alerts for youth sports travel.',
  seoKeywords: [
    'youth sports travel safety',
    'SafeSport compliance tracking',
    'tournament travel management',
    'youth athlete travel safety platform',
  ],
}
