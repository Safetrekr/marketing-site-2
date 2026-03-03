/**
 * Shared OG Image Template
 *
 * Generates a branded 1200x630 PNG image for social sharing using the
 * Next.js `ImageResponse` API (Satori renderer). Implements the Oblivion
 * HUD / mission-control aesthetic with the Safetrekr green color scheme.
 *
 * Architecture: Each marketing page's `opengraph-image.tsx` imports
 * `generateOgImage()` and passes page-specific content. The template
 * handles all layout, styling, and visual composition.
 *
 * Satori constraints observed:
 * - Flexbox only (no CSS Grid)
 * - All colors as literal hex/rgba (no CSS variables)
 * - position: absolute supported for overlays
 * - No backdrop-filter, no transforms, no animations
 * - Font files loaded as ArrayBuffer
 */

import { ImageResponse } from 'next/og'
import { loadOgFonts } from './fonts'
import {
  OG_WIDTH,
  OG_HEIGHT,
  COLOR_VOID,
  COLOR_SURFACE,
  COLOR_BORDER,
  COLOR_EMBER,
  COLOR_TEXT_PRIMARY,
  COLOR_TEXT_SECONDARY,
  COLOR_TEXT_TERTIARY,
  FONT_SANS,
  FONT_MONO,
  TITLE_SIZE,
  TITLE_WEIGHT,
  TITLE_LINE_HEIGHT,
  TITLE_LETTER_SPACING,
  TITLE_MAX_WIDTH,
  DESCRIPTION_SIZE,
  DESCRIPTION_WEIGHT,
  DESCRIPTION_LINE_HEIGHT,
  DESCRIPTION_LETTER_SPACING,
  DESCRIPTION_MAX_WIDTH,
  CANVAS_PADDING,
  TITLE_TOP_GAP,
  DESCRIPTION_TOP_GAP,
  ACCENT_LINE_WIDTH,
  ACCENT_LINE_HEIGHT,
  BOTTOM_ROW_TOP_GAP,
  LOGO_HEIGHT,
  CORNER_ARM_LENGTH,
  CORNER_OFFSET,
  BADGE_FONT_SIZE,
  BADGE_LETTER_SPACING,
  BADGE_BORDER_RADIUS,
  BADGE_PADDING_X,
  BADGE_PADDING_Y,
  DOMAIN_FONT_SIZE,
  DOMAIN_LETTER_SPACING,
  WORDMARK_FONT_SIZE,
  RADIAL_GLOW,
  type OgPageConfig,
  type BadgeIcon,
} from './og-constants'

// ---------------------------------------------------------------------------
// Badge Icon Components (geometric shapes for Satori)
// ---------------------------------------------------------------------------

function BadgeIconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1L3 3.5V7.5C3 10.5 5.2 13.3 8 14C10.8 13.3 13 10.5 13 7.5V3.5L8 1Z"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  )
}

function BadgeIconProcess() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            backgroundColor: COLOR_EMBER,
          }}
        />
      ))}
    </div>
  )
}

function BadgeIconGrid() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '14px',
        gap: '2px',
      }}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '1px',
            border: `1px solid ${COLOR_EMBER}`,
          }}
        />
      ))}
    </div>
  )
}

function BadgeIconBuilding() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
      <div
        style={{
          width: '3px',
          height: '8px',
          border: `1px solid ${COLOR_EMBER}`,
        }}
      />
      <div
        style={{
          width: '3px',
          height: '12px',
          border: `1px solid ${COLOR_EMBER}`,
        }}
      />
      <div
        style={{
          width: '3px',
          height: '10px',
          border: `1px solid ${COLOR_EMBER}`,
        }}
      />
    </div>
  )
}

function BadgeIconBars() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
      <div
        style={{
          width: '3px',
          height: '6px',
          backgroundColor: COLOR_EMBER,
          borderRadius: '1px',
        }}
      />
      <div
        style={{
          width: '3px',
          height: '10px',
          backgroundColor: COLOR_EMBER,
          borderRadius: '1px',
        }}
      />
      <div
        style={{
          width: '3px',
          height: '14px',
          backgroundColor: COLOR_EMBER,
          borderRadius: '1px',
        }}
      />
    </div>
  )
}

function BadgeIconLock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="4"
        y="7"
        width="8"
        height="7"
        rx="1"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M6 7V5C6 3.9 6.9 3 8 3C9.1 3 10 3.9 10 5V7"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  )
}

function BadgeIconPeople() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle
        cx="6"
        cy="5"
        r="2"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M2 13C2 10.8 3.8 9 6 9"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
      <circle
        cx="11"
        cy="5"
        r="2"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M11 9C13.2 9 15 10.8 15 13"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  )
}

function BadgeIconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  )
}

function BadgeIconDocument() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="3"
        y="2"
        width="10"
        height="12"
        rx="1"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
      <line
        x1="6"
        y1="6"
        x2="10"
        y2="6"
        stroke={COLOR_EMBER}
        strokeWidth="1"
      />
      <line
        x1="6"
        y1="9"
        x2="10"
        y2="9"
        stroke={COLOR_EMBER}
        strokeWidth="1"
      />
    </svg>
  )
}

function BadgeIconShieldCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1L3 3.5V7.5C3 10.5 5.2 13.3 8 14C10.8 13.3 13 10.5 13 7.5V3.5L8 1Z"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M6 8L7.5 9.5L10 6.5"
        stroke={COLOR_EMBER}
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  )
}

function renderBadgeIcon(icon: BadgeIcon) {
  switch (icon) {
    case 'shield':
      return <BadgeIconShield />
    case 'process':
      return <BadgeIconProcess />
    case 'grid':
      return <BadgeIconGrid />
    case 'building':
      return <BadgeIconBuilding />
    case 'bars':
      return <BadgeIconBars />
    case 'lock':
      return <BadgeIconLock />
    case 'people':
      return <BadgeIconPeople />
    case 'arrow':
      return <BadgeIconArrow />
    case 'document':
      return <BadgeIconDocument />
    case 'shield-check':
      return <BadgeIconShieldCheck />
  }
}

// ---------------------------------------------------------------------------
// Safetrekr Shield Mark (SVG logo for top-left)
// ---------------------------------------------------------------------------

function SafetrekrMark() {
  return (
    <svg
      width="34"
      height={LOGO_HEIGHT}
      viewBox="0 0 428 501"
      fill="none"
    >
      <path
        d="M214 0L0 80V280C0 400 91.3 470 214 501C336.7 470 428 400 428 280V80L214 0Z"
        fill={COLOR_TEXT_PRIMARY}
        opacity="0.8"
      />
      <path
        d="M214 40L40 104V280C40 380 115 440 214 465C313 440 388 380 388 280V104L214 40Z"
        fill={COLOR_VOID}
      />
      <path
        d="M214 100L100 150V280C100 350 145 400 214 420C283 400 328 350 328 280V150L214 100Z"
        fill={COLOR_EMBER}
        opacity="0.3"
      />
      <path
        d="M180 260L200 280L260 220"
        stroke={COLOR_TEXT_PRIMARY}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Corner Accent Bracket (HUD targeting aesthetic)
// ---------------------------------------------------------------------------

function CornerAccent({
  position,
}: {
  position: 'top-left' | 'bottom-right'
}) {
  const isTopLeft = position === 'top-left'
  return (
    <div
      style={{
        position: 'absolute',
        top: isTopLeft ? CORNER_OFFSET : undefined,
        left: isTopLeft ? CORNER_OFFSET : undefined,
        bottom: isTopLeft ? undefined : CORNER_OFFSET,
        right: isTopLeft ? undefined : CORNER_OFFSET,
        width: CORNER_ARM_LENGTH,
        height: CORNER_ARM_LENGTH,
        borderTop: isTopLeft ? `1px solid ${COLOR_BORDER}` : 'none',
        borderLeft: isTopLeft ? `1px solid ${COLOR_BORDER}` : 'none',
        borderBottom: isTopLeft ? 'none' : `1px solid ${COLOR_BORDER}`,
        borderRight: isTopLeft ? 'none' : `1px solid ${COLOR_BORDER}`,
      }}
    />
  )
}

// ---------------------------------------------------------------------------
// Main Template
// ---------------------------------------------------------------------------

/**
 * Generate a branded OG image for a Safetrekr marketing page.
 *
 * @param config - Page-specific content (title, description, badge)
 * @returns An `ImageResponse` (extends `Response`) containing a 1200x630 PNG
 */
export async function generateOgImage(
  config: OgPageConfig
): Promise<ImageResponse> {
  const fonts = await loadOgFonts()

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: `${CANVAS_PADDING}px`,
          backgroundColor: COLOR_VOID,
          backgroundImage: RADIAL_GLOW,
          fontFamily: `"${FONT_SANS}"`,
          color: COLOR_TEXT_PRIMARY,
          position: 'relative',
        }}
      >
        {/* Corner accent brackets */}
        <CornerAccent position="top-left" />
        <CornerAccent position="bottom-right" />

        {/* Top row: Logo mark + Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          {/* Safetrekr shield mark */}
          <SafetrekrMark />

          {/* Page badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: `${BADGE_PADDING_Y}px ${BADGE_PADDING_X}px`,
              backgroundColor: COLOR_SURFACE,
              border: `1px solid ${COLOR_BORDER}`,
              borderRadius: `${BADGE_BORDER_RADIUS}px`,
              fontSize: `${BADGE_FONT_SIZE}px`,
              fontFamily: `"${FONT_MONO}"`,
              color: COLOR_TEXT_TERTIARY,
              letterSpacing: BADGE_LETTER_SPACING,
            }}
          >
            {renderBadgeIcon(config.badgeIcon)}
            {config.badgeLabel}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            marginTop: `${TITLE_TOP_GAP}px`,
            fontSize: `${TITLE_SIZE}px`,
            fontWeight: TITLE_WEIGHT,
            lineHeight: TITLE_LINE_HEIGHT,
            maxWidth: `${TITLE_MAX_WIDTH}px`,
            letterSpacing: TITLE_LETTER_SPACING,
            color: COLOR_TEXT_PRIMARY,
          }}
        >
          {config.title}
        </div>

        {/* Description */}
        <div
          style={{
            display: 'flex',
            marginTop: `${DESCRIPTION_TOP_GAP}px`,
            fontSize: `${DESCRIPTION_SIZE}px`,
            fontWeight: DESCRIPTION_WEIGHT,
            lineHeight: DESCRIPTION_LINE_HEIGHT,
            color: COLOR_TEXT_SECONDARY,
            maxWidth: `${DESCRIPTION_MAX_WIDTH}px`,
            letterSpacing: DESCRIPTION_LETTER_SPACING,
          }}
        >
          {config.description}
        </div>

        {/* Flexible spacer */}
        <div style={{ display: 'flex', flex: 1 }} />

        {/* Green accent line */}
        <div
          style={{
            display: 'flex',
            width: `${ACCENT_LINE_WIDTH}px`,
            height: `${ACCENT_LINE_HEIGHT}px`,
            backgroundColor: COLOR_EMBER,
            alignSelf: 'center',
          }}
        />

        {/* Bottom row: Wordmark + Domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: `${BOTTOM_ROW_TOP_GAP}px`,
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: `${WORDMARK_FONT_SIZE}px`,
              color: COLOR_TEXT_SECONDARY,
              fontWeight: DESCRIPTION_WEIGHT,
            }}
          >
            Safetrekr
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: `${DOMAIN_FONT_SIZE}px`,
              fontFamily: `"${FONT_MONO}"`,
              color: COLOR_TEXT_TERTIARY,
              letterSpacing: DOMAIN_LETTER_SPACING,
            }}
          >
            www.safetrekr.com
          </div>
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts,
    }
  )
}
