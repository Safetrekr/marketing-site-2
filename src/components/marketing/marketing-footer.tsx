import Link from 'next/link'
import Image from 'next/image'
import { FOOTER_NAV_COLUMNS, FOOTER_LEGAL_LINKS } from '@/lib/config/marketing-nav'

export function MarketingFooter() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-white/[0.06] bg-gradient-to-b from-[var(--color-void)] to-[var(--color-abyss)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Zone 1: Logo + tagline */}
          <div>
            <Link href="/launch" aria-label="Safetrekr home">
              <Image
                src="/images/logos/safetrekr-logo-horiz-light.svg"
                alt="Safetrekr"
                width={120}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              Every traveler accounted for.
            </p>
          </div>

          {/* Zone 2-3: Nav columns */}
          <nav
            aria-label="Footer navigation"
            className="col-span-1 grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3"
          >
            {FOOTER_NAV_COLUMNS.map((column) => (
              <div key={column.heading}>
                <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                  {column.heading}
                </h3>
                <ul className="space-y-0.5">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block py-1.5 text-sm text-[var(--color-text-secondary)] transition-colors duration-200 hover:text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8 md:flex-row md:justify-between">
          {/* Legal links */}
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)]">
            {FOOTER_LEGAL_LINKS.map((item, index) => (
              <span key={item.href} className="inline-flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[var(--color-text-tertiary)]">
                    &middot;
                  </span>
                )}
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ember-bright)]"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-[var(--color-text-tertiary)]">
            &copy; 2026 Safetrekr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
