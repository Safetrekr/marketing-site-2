import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['@tarva/ui'],
  images: { unoptimized: true },
}

export default nextConfig
