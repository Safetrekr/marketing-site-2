// src/lib/data/verticals/churches.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'

export const CHURCHES_VERTICAL: VerticalDetailData = {
  id: 'churches',
  name: 'Churches & Faith-Based Organizations',
  iconName: 'Church',

  // Hero
  heroHeadline: 'Mission trips deserve mission-grade safety planning.',
  heroSubheadline:
    'Churches send volunteers to serve in communities worldwide -- often in places where infrastructure is limited and risk is real. Safetrekr gives mission teams the planning, screening, intelligence, and emergency preparedness that the mission deserves.',

  // The Challenge
  challengeIntro:
    'Faith-based organizations send more people on international travel than most corporations. Mission trips, service projects, youth retreats, and conferences involve volunteers of every age -- many traveling internationally for the first time. The safety planning rarely matches the ambition of the mission.',
  challenges: [
    {
      title: 'Volunteer Screening Inconsistency',
      description:
        'Churches rely on volunteers for everything -- including supervising children during travel. Background check requirements vary by denomination and state. Screening is often handled through manual forms with no central tracking of who has been checked, when the check expires, or whether new requirements have taken effect.',
    },
    {
      title: 'International Travel to Complex Environments',
      description:
        'Mission trips often go to regions with limited infrastructure, political instability, or active security concerns. Risk assessment is informal -- based on past experience or denominational familiarity with a region -- rather than on current intelligence data.',
    },
    {
      title: 'Emergency Plans That Live in a Binder',
      description:
        'Emergency preparedness for mission trips is typically a phone tree and a contact sheet. Rally points, medical facilities, and evacuation routes are not mapped. When a crisis occurs at 2 AM in a foreign country, the mission team leader is making decisions from memory, not from a system.',
    },
    {
      title: 'No Documentation Trail',
      description:
        'When a church board, a parent, or a denomination asks what safeguards were in place for a trip, the answer depends on which mission team leader kept notes. There is no centralized record of planning decisions, volunteer screenings, or safety measures.',
    },
    {
      title: 'Well-Intentioned But Untrained Teams',
      description:
        'Mission team volunteers are motivated by service, not by safety operations. They receive minimal training on emergency response, risk mitigation, or crisis communication. The safety planning burden falls on the trip leader, who is also coordinating logistics, fundraising, and ministry activities.',
    },
  ],

  // The Safetrekr Response
  responseIntro:
    'Safetrekr provides the operational backbone for mission trip safety -- so trip leaders can focus on the mission while the platform handles the screening, documentation, intelligence, and emergency preparedness.',
  responses: [
    {
      title: 'Comprehensive Volunteer Screening',
      description:
        "5 background check types (criminal, sex offender, driving, employment, education) across 3 integrated providers. A compliance matrix shows every volunteer's screening status at a glance. Expiration monitoring ensures checks stay current.",
      featureRef: 'Background check system',
    },
    {
      title: 'International Risk Intelligence',
      description:
        'Real-time monitoring of destination countries for security, weather, health, transport, and political risks. Alerts are risk-scored and analyst-triaged. Mission teams receive only what is relevant, delivered on schedule.',
      featureRef: 'Intelligence engine',
    },
    {
      title: 'Three-Tier Evacuation Planning',
      description:
        'Shelter in place, local evacuation, and full relocation protocols. Rally points with GPS coordinates. Safe houses with approval workflows. Medical facility directories with trauma capability levels. Emergency kit profile recommendations based on trip characteristics.',
      featureRef: 'Protection system',
    },
    {
      title: 'SMS Emergency Broadcast',
      description:
        'Mission team leaders can send SMS broadcast messages to all trip participants directly from the app. Chaperones receive alerts. Participants acknowledge receipt. Every communication documented.',
      featureRef: 'Emergency broadcast',
    },
    {
      title: 'Complete Audit Trail',
      description:
        'From volunteer screening through trip completion, every action is logged. When a church board or denomination asks what safeguards were in place, the answer is specific, timestamped, and attributed.',
      featureRef: 'Audit trail system',
    },
  ],

  // Regulatory and Compliance
  regulatoryIntro:
    'Church travel safety operates within denominational policies, state volunteer screening laws, and international travel advisories. Safetrekr supports compliance with these overlapping frameworks.',
  regulations: [
    {
      name: 'Safe Sanctuaries',
      fullName: 'Safe Sanctuaries / Similar Denominational Policies',
      description:
        'Many denominations (United Methodist, Southern Baptist, others) have adopted policies requiring background screening, training, and supervision standards for adults working with children and youth.',
      safetrekrAlignment:
        'Background check compliance matrix with 5 check types. Certification tracking with expiration monitoring. Document collection for training completion records.',
      verified: true,
    },
    {
      name: 'State Screening Laws',
      fullName: 'State-Level Volunteer Screening Requirements',
      description:
        'Most states require background checks for adults in supervisory roles over minors. Requirements vary by state (check types, frequency, registry searches).',
      safetrekrAlignment:
        '5 background check types available through 3 providers. Compliance matrix tracks per-participant, per-check-type status. Automated reminders for expiring screenings.',
      verified: true,
    },
    {
      name: 'State Department Advisories',
      fullName: 'U.S. State Department Travel Advisories',
      description:
        'Travel advisories provide risk levels (1-4) for international destinations. Organizations have a duty to be aware of advisory levels for mission trip destinations.',
      safetrekrAlignment:
        'TarvaRI intelligence engine monitors international destinations. Real-time alert delivery includes government advisory data. Documented awareness of destination conditions.',
      verified: true,
    },
    {
      name: 'Child Protection Policies',
      fullName: 'Organizational Child Protection Policies',
      description:
        'Churches that serve children are expected to maintain child protection policies including screening, training, supervision ratios, and incident response.',
      safetrekrAlignment:
        'Configurable requirements per trip: chaperone ratios, required screenings, training certifications, document collection. The system enforces policy compliance -- it does not rely on memory.',
      verified: true,
    },
  ],

  // Feature Spotlights
  featureSpotlights: [
    {
      title: '5 Background Check Types',
      description:
        'Criminal history, sex offender registry, driving record, employment verification, education verification -- integrated with Checkr, Sterling, and GoodHire. One compliance matrix for every volunteer.',
      metric: '5 check types, 3 providers',
      iconName: 'ShieldCheck',
    },
    {
      title: 'Rally Points and Safe Houses',
      description:
        'Designated assembly locations and vetted safe locations with GPS coordinates, approval workflows, and automatic geofence creation. Geofences alert on entry (rally points) and exit (safe houses).',
      metric: 'GPS-linked geofencing',
      iconName: 'MapPin',
    },
    {
      title: 'Offline-First Mobile App',
      description:
        'Mission teams in areas with limited connectivity access safety information, emergency contacts, and checklists offline. All critical trip data cached locally on device.',
      metric: 'Works without connectivity',
      iconName: 'WifiOff',
    },
    {
      title: 'Real-Time Alert Delivery',
      description:
        'Intelligence alerts delivered to trip leaders and participants with severity classification and acknowledgment tracking. Every alert receipt is documented.',
      metric: 'Proof of delivery',
      iconName: 'Bell',
    },
  ],

  // Differentiator Callout
  accountabilityQuestion:
    '"When a parent asks: \'Who reviewed the safety plan before my child went on that mission trip?\' -- what is your answer?"',
  accountabilityAnswer:
    'With Safetrekr, the answer is: "An independent safety analyst reviewed the trip across 18 dimensions and approved it before departure. Every volunteer was screened. Every emergency plan was documented. Here is the complete record." The mission team focused on serving. The analyst focused on safety. Both are documented.',

  // Case Study Placeholder
  caseStudy: {
    verticalType: 'Church / Faith-Based Organization',
    suggestedTitle:
      'How [Church Name] Protected 150 Volunteers Across 8 International Mission Trips',
    suggestedMetrics: [
      'Volunteer screening completion rate',
      'Time from trip planning to analyst approval',
      'Number of international destinations monitored',
      'Emergency preparedness documentation coverage',
    ],
    placeholderCopy:
      'We are partnering with churches and faith-based organizations to measure the impact of structured mission trip safety. If your organization sends teams domestically or internationally, schedule a briefing to see how Safetrekr documents every safeguard from volunteer screening through trip completion.',
  },

  // Objection Hook
  objectionQuestion:
    '"Our mission teams have traveled safely for decades."',
  objectionAnswer:
    'We do not doubt that. Your mission leaders are dedicated, experienced, and careful. Safetrekr does not replace their dedication -- it documents it. When your church board, your denomination, or a parent asks what safeguards were in place, the answer moves from "we trust our team leaders" to "here is the documented record of every screening, every safety review, and every emergency plan -- verified by an independent analyst."',

  // CTA
  ctaMicrocopy:
    'Tell us about your mission program. We will show you how Safetrekr documents safety for every trip your church sends.',

  // SEO
  seoTitle:
    'Safetrekr for Churches -- Mission Trip Safety with Independent Review',
  seoDescription:
    'Mission trips deserve mission-grade safety planning. Safetrekr provides volunteer screening, international risk assessment, evacuation planning, and documented accountability for church travel.',
  seoKeywords: [
    'church mission trip safety',
    'mission trip risk management',
    'church volunteer screening',
    'faith-based travel safety platform',
  ],
}
