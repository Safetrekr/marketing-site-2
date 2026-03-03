// src/lib/data/verticals/index.ts

import type { VerticalDetailData } from '@/lib/interfaces/solutions'
import type { VerticalId, VerticalMeta } from '@/lib/interfaces/social-proof'
import { K12_VERTICAL } from './k12'
import { HIGHER_ED_VERTICAL } from './higher-ed'
import { CHURCHES_VERTICAL } from './churches'
import { YOUTH_SPORTS_VERTICAL } from './youth-sports'
import { BUSINESS_VERTICAL } from './business'

export const VERTICAL_DETAIL_MAP: Record<string, VerticalDetailData> = {
  k12: K12_VERTICAL,
  'higher-ed': HIGHER_ED_VERTICAL,
  churches: CHURCHES_VERTICAL,
  'youth-sports': YOUTH_SPORTS_VERTICAL,
  business: BUSINESS_VERTICAL,
}

export const VALID_VERTICAL_SLUGS = Object.keys(VERTICAL_DETAIL_MAP)

/** Display metadata for verticals — used by social proof components. */
export const VERTICAL_META: Record<VerticalId, VerticalMeta> = {
  k12: { id: 'k12', label: 'K-12', icon: 'GraduationCap' },
  'higher-ed': { id: 'higher-ed', label: 'Higher Ed', icon: 'GraduationCap' },
  churches: { id: 'churches', label: 'Church', icon: 'Church' },
  'youth-sports': { id: 'youth-sports', label: 'Youth Sports', icon: 'Trophy' },
  business: { id: 'business', label: 'Business', icon: 'Briefcase' },
}
