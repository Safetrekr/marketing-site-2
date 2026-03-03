// src/lib/blog-authors.ts

export interface BlogAuthor {
  id: string
  name: string
  role: string
  avatar: string // Path relative to /public
  bio: string // 1-2 sentence bio for author cards
}

export const AUTHORS: Record<string, BlogAuthor> = {
  'mike-dawson': {
    id: 'mike-dawson',
    name: 'Mike Dawson',
    role: 'Co-founder & Chief of Safety Operations',
    avatar: '/images/authors/mike-dawson.jpg',
    bio: '23-year U.S. Secret Service veteran. Former Special Agent in Charge of presidential and foreign dignitary protection details.',
  },
  'alan-d': {
    id: 'alan-d',
    name: 'Alan D.',
    role: 'Chief of Protective Intelligence',
    avatar: '/images/authors/alan-d.jpg',
    bio: '25-year U.S. Secret Service veteran. Former lead of protective intelligence operations across domestic and international venues.',
  },
  'bobby-brasher': {
    id: 'bobby-brasher',
    name: 'Bobby Brasher',
    role: 'Co-founder & Chief of School Security',
    avatar: '/images/authors/bobby-brasher.jpg',
    bio: 'Former Director of School Security at Brook Hill. Specialist in K-12 travel safety and campus protection systems.',
  },
  'safetrekr-team': {
    id: 'safetrekr-team',
    name: 'Safetrekr Team',
    role: 'Safetrekr',
    avatar: '/images/logos/safetrekr-mark-dark.svg',
    bio: 'Product updates and announcements from the Safetrekr team.',
  },
}

export function getAuthor(id: string): BlogAuthor | null {
  return AUTHORS[id] ?? null
}
