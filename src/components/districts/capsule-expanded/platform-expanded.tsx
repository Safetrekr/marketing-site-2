/**
 * PlatformExpanded -- Z3 expanded content for the Platform capsule.
 *
 * Shows 4 dashboard portal icons with labels.
 *
 * @module platform-expanded
 */

const PORTALS = [
  { label: 'ADMIN', desc: 'Manage org & users' },
  { label: 'ANALYST', desc: 'Review & assess' },
  { label: 'TRAVELER', desc: 'Check-in & alerts' },
  { label: 'HQ', desc: 'Oversight & reports' },
] as const

export function PlatformExpanded() {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <span
        className="font-mono text-[8px] tracking-[0.12em] uppercase"
        style={{ color: 'rgba(var(--ambient-ink-rgb), 0.35)' }}
      >
        FOUR DASHBOARDS
      </span>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {PORTALS.map((portal) => (
          <div key={portal.label} className="flex flex-col">
            <span
              className="font-mono text-[9px] font-medium tracking-[0.06em]"
              style={{ color: 'var(--color-ember-bright)' }}
            >
              {portal.label}
            </span>
            <span
              className="font-sans text-[9px]"
              style={{ color: 'rgba(var(--ambient-ink-rgb), 0.45)' }}
            >
              {portal.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
