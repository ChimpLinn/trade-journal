'use client'

import { RISK_COLORS, RISK_LABELS } from '@/lib/risk'
import type { RiskLevel } from '@/types/trade'

export function RiskBadge({ level }: { level: RiskLevel }) {
  const colors = RISK_COLORS[level]
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[13px] font-medium ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {RISK_LABELS[level]}
    </span>
  )
}
