import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**', 'vendor/**', '.claude/**']),
  // Downgrade React compiler strict rules to warnings for existing spatial ZUI code.
  // These files use rAF animation loops, direct DOM writes, and ref-based patterns
  // that are valid for performance-critical spatial rendering but trip the React 19
  // compiler's stricter lint rules. The spatial engine is preserved, not rewritten.
  {
    files: [
      'src/components/ambient/**',
      'src/components/spatial/**',
      'src/components/gateway/**',
      'src/components/districts/**',
      'src/components/stations/**',
      'src/components/telemetry/**',
      'src/components/ai/**',
      'src/components/auth/**',
      'src/components/district-view/**',
      'src/components/ui/**',
      'src/hooks/**',
      'src/stores/**',
    ],
    rules: {
      'react-hooks/immutability': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/purity': 'warn',
    },
  },
])

export default eslintConfig
