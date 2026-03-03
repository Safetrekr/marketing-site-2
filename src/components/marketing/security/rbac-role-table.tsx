// src/components/marketing/security/rbac-role-table.tsx

import { cn } from '@/lib/utils'
import type { RBACRole } from '@/lib/interfaces/security'

interface RBACRoleTableProps {
  roles: RBACRole[]
  summary: string
}

export function RBACRoleTable({ roles, summary }: RBACRoleTableProps) {
  return (
    <div>
      <p className="mb-6 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
        {summary}
      </p>
      <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            Safetrekr role-based access control: 10 system roles across 3
            portals
          </caption>
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.04]">
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--color-text-primary)]"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--color-text-primary)]"
              >
                Portal
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-semibold text-[var(--color-text-primary)]"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, i) => (
              <tr
                key={role.name}
                className={cn(
                  'border-b border-white/[0.04]',
                  i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]',
                )}
              >
                <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">
                  {role.name}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                      role.portal === 'Client' &&
                        'bg-[rgba(var(--ember-rgb),0.1)] text-[var(--color-ember-bright)]',
                      role.portal === 'Analyst' &&
                        'bg-[rgba(var(--teal-rgb),0.1)] text-[var(--color-teal-bright)]',
                      role.portal === 'HQ' &&
                        'bg-white/[0.06] text-[var(--color-text-secondary)]',
                    )}
                  >
                    {role.portal}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                  {role.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
