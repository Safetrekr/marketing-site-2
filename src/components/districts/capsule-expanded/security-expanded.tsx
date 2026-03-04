/**
 * SecurityExpanded -- Z3 expanded content for the Security capsule.
 *
 * Shows compliance badge grid with certifications and specs.
 *
 * @module security-expanded
 */

const BADGES = [
  { code: 'SOC 2', desc: 'Type II certified' },
  { code: 'AES-256', desc: 'Data encryption' },
  { code: 'RLS', desc: 'Row-level security' },
  { code: 'RBAC', desc: 'Role-based access' },
  { code: '2FA', desc: 'Multi-factor auth' },
  { code: 'AUDIT', desc: 'Full trail logging' },
] as const

export function SecurityExpanded() {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <span
        className="font-mono text-[8px] tracking-[0.12em] uppercase"
        style={{ color: 'rgba(var(--ambient-ink-rgb), 0.35)' }}
      >
        COMPLIANCE MATRIX
      </span>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {BADGES.map((badge) => (
          <div key={badge.code} className="flex items-center gap-1.5">
            <span
              className="font-mono text-[9px] font-medium tracking-[0.04em]"
              style={{ color: 'var(--color-ember-bright)', minWidth: 44 }}
            >
              {badge.code}
            </span>
            <span
              className="font-sans text-[9px]"
              style={{ color: 'rgba(var(--ambient-ink-rgb), 0.45)' }}
            >
              {badge.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
