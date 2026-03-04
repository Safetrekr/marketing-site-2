/**
 * HowItWorksExpanded -- Z3 expanded content for the How It Works capsule.
 *
 * Shows a 4-phase process flow with descriptions.
 *
 * @module how-it-works-expanded
 */

const PHASES = [
  { label: 'PLAN', desc: 'Risk profile built' },
  { label: 'REVIEW', desc: 'Analyst assessment' },
  { label: 'PROTECT', desc: 'Live trip monitoring' },
  { label: 'DOCUMENT', desc: 'Audit-ready record' },
] as const

export function HowItWorksExpanded() {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <span
        className="font-mono text-[8px] tracking-[0.12em] uppercase"
        style={{ color: 'rgba(var(--ambient-ink-rgb), 0.35)' }}
      >
        SAFETY LIFECYCLE
      </span>
      <div className="flex flex-col gap-1.5">
        {PHASES.map((phase, i) => (
          <div key={phase.label} className="flex items-center gap-2">
            <span
              className="font-mono text-[9px] font-medium tracking-[0.06em]"
              style={{ color: 'var(--color-ember-bright)', minWidth: 52 }}
            >
              {String(i + 1).padStart(2, '0')} {phase.label}
            </span>
            <span
              className="font-sans text-[10px]"
              style={{ color: 'rgba(var(--ambient-ink-rgb), 0.55)' }}
            >
              {phase.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
