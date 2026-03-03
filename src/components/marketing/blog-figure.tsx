// src/components/marketing/blog-figure.tsx

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface BlogFigureProps {
  src: string
  alt: string
  caption?: string
  attribution?: string
  width?: number
  height?: number
  className?: string
}

export function BlogFigure({
  src,
  alt,
  caption,
  attribution,
  width = 800,
  height = 450,
  className,
}: BlogFigureProps) {
  return (
    <figure className={cn('my-8', className)}>
      <div className="overflow-hidden rounded-xl border border-white/[0.06]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      {(caption || attribution) && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-text-tertiary)]">
          {caption}
          {attribution && (
            <span className="block text-xs italic">{attribution}</span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
