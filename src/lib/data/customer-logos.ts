// src/lib/data/customer-logos.ts

import type { CustomerLogo } from '@/lib/interfaces/social-proof'

/**
 * Customer logos for the logo bar.
 *
 * HOW TO ADD A LOGO:
 * 1. Obtain written permission from the customer to display their logo
 * 2. Add the SVG logo to /public/images/logos/customers/
 *    - Must be white/light color (displayed on dark background)
 *    - Recommended: single-color SVG, max 200px wide, 48px tall
 *    - If only a color logo is available, convert to white/monochrome
 * 3. Add an entry to this array
 * 4. Run `pnpm typecheck` to verify
 * 5. Deploy -- the logo appears automatically
 */
export const CUSTOMER_LOGOS: CustomerLogo[] = [
  // --- Add customer logos here as permissions are obtained ---
]

/** Minimum number of logos needed for the logo bar to render. */
export const LOGO_BAR_MINIMUM = 3
