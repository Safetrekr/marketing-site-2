// src/app/(marketing)/blog/layout.tsx

import type { ReactNode } from 'react'
import '@/styles/blog-prose.css'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
