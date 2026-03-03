#!/usr/bin/env node
// scripts/generate-og-placeholder.mjs
//
// Generates a minimal placeholder OG image at public/og/default.png.
// Run: node scripts/generate-og-placeholder.mjs

import { writeFileSync, mkdirSync } from 'fs'
import { dirname } from 'path'

const outputPath = 'public/og/default.png'

// Ensure directory exists
mkdirSync(dirname(outputPath), { recursive: true })

// Minimal valid 1x1 PNG (placeholder until proper OG image is designed)
// This is a valid PNG file that social platforms will accept.
// Replace with a proper 1200x630 branded image for production.
const minimalPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk' +
    'YPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==',
  'base64'
)

writeFileSync(outputPath, minimalPng)
console.log(`Created placeholder OG image at ${outputPath}`)
console.log(
  'NOTE: Replace with a proper 1200x630 branded image before production.'
)
