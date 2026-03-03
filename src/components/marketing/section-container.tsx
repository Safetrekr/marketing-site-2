// src/components/marketing/section-container.tsx

import { cn } from '@/lib/utils'

type SectionContainerProps = React.ComponentPropsWithoutRef<'section'> & {
  /** Semantic element: 'section' (default) or 'div' */
  as?: 'section' | 'div'
}

export function SectionContainer({
  children,
  className,
  as: Element = 'section',
  ...rest
}: SectionContainerProps) {
  return (
    <Element className={cn('py-24 lg:py-32', className)} {...rest}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
      </div>
    </Element>
  )
}
