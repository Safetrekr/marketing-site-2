import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-void px-6">
      <div className="w-full max-w-md rounded-[32px] border border-white/[0.08] bg-white/[0.06] p-10 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_0_1px_0_rgba(var(--ember-rgb),0.3),0_0_24px_rgba(var(--ember-rgb),0.1)] backdrop-blur-[16px] backdrop-saturate-[130%]">
        <p className="font-mono text-[64px] font-bold leading-none tracking-wider text-ember-bright">
          404
        </p>
        <h1 className="mt-4 text-[28px] font-bold uppercase tracking-[0.02em] text-[var(--color-text-primary)]">
          Signal Lost
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          The coordinates you requested don&apos;t match any known signal. The page may have been
          moved or decommissioned.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-ember px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-ember-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-bright"
        >
          Return to Base
        </Link>
      </div>
    </main>
  )
}
