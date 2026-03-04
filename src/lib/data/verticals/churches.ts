// src/lib/data/verticals/churches.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'

export const CHURCHES_VERTICAL: VerticalDetailData = {
  id: 'churches',
  name: 'Churches & Mission Organizations',
  iconName: 'Church',

  // Hero
  heroHeadline: 'Mission trips deserve mission-grade safety planning.',
  heroSubheadline:
    'Churches send volunteers to serve in communities worldwide -- often in places where infrastructure is limited and risk is real. Safetrekr gives mission teams the planning, screening, intelligence, and emergency preparedness that the mission deserves.',

  // The Challenge
  challengeIntro:
    'The safety gap in ministry travel: the person planning your mission trip or youth retreat is a pastor, a volunteer, or a ministry staff member. They are called to serve, not trained in emergency management.',
  challenges: [
    {
      title: 'Volunteer Leaders, Not Safety Professionals',
      description:
        'The person planning your mission trip or youth retreat is a pastor, a volunteer, or a ministry staff member. Their safety plan is assembled from Google searches and past experience -- and it has never been tested.',
    },
    {
      title: 'Remote and High-Risk Destinations',
      description:
        'Mission trips go where the need is greatest -- often to locations with limited medical infrastructure, political instability, or civil unrest. Planning safe travel to these destinations requires intelligence and expertise that most ministry teams do not have access to.',
    },
    {
      title: 'Insurance Expects Documentation You Do Not Have',
      description:
        'Church insurance policies increasingly require documented safety plans, volunteer screening records, and evidence of reasonable precautions for group travel. Most churches can produce a sign-up sheet and a prayer list, but not a structured safety record that satisfies an insurer or a board.',
    },
    {
      title: 'Tight Ministry Budgets',
      description:
        'Professional risk management feels out of reach when your trip budget is funded by bake sales and congregational giving. But a single trip-related incident can cost $50,000 to $500,000 or more in legal fees, settlements, and insurance increases -- far more than the cost of preparation.',
    },
  ],

  // The Safetrekr Response
  responseIntro:
    'Your ministry team focuses on the mission. A trained Safetrekr analyst handles the safety planning -- reviewing your trip across 18 dimensions, mapping emergency resources, and producing the documentation your insurer requires.',
  responses: [
    {
      title: 'A Professional Safety Analyst for Every Trip',
      description:
        'Your ministry team focuses on the mission. A trained Safetrekr analyst handles the safety planning -- reviewing your trip across 18 dimensions, mapping emergency resources at every destination, building evacuation plans, and producing the documentation your insurer requires.',
      featureRef: 'Analyst review workflow',
    },
    {
      title: 'Volunteer Screening Built into the Workflow',
      description:
        'Background check processing for all adult volunteers and leaders directly within the trip workflow. Five check types through three integrated providers -- or record results from your existing screening provider. Organization-level tracking maintains clearance records across trips. $35/person domestic, $65/person international.',
      featureRef: 'Background check system',
    },
    {
      title: 'Traveler App for Every Participant',
      description:
        'Team members, chaperones, and families access the Safetrekr Traveler App with live safety checklists, real-time alerts, emergency preparedness information on-device, and document submission. Your team leader sees exactly who has received safety guidance and who has not.',
      featureRef: 'Traveler App',
    },
    {
      title: 'Per-Trip Pricing for Ministry Budgets',
      description:
        'Starting at $450 for a domestic day trip. About $15 per traveler for a group of 30. No subscription. No per-user fees. No setup costs. Pay only for the trips you plan. Recurring annual trips receive a 25% discount starting in year two.',
      featureRef: 'Pricing model',
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
