'use client'

import { formatResult } from '@/lib/calc'
import { RISK_COLORS, RISK_LABELS, RISK_LEVELS } from '@/lib/risk'
import type { RiskLevel, TradeResult } from '@/types/trade'

interface RiskPickerModalProps {
  result: TradeResult | null
  onSelect: (risk: RiskLevel) => void
  onCancel: () => void
}

export function RiskPickerModal({
  result,
  onSelect,
  onCancel,
}: RiskPickerModalProps) {
  if (result === null) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onCancel}
    >
      <article
        className="w-full max-w-sm animate-modal-in rounded-2xl bg-[var(--surface)] p-5 shadow-xl ring-1 ring-[var(--separator)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="risk-picker-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p
          id="risk-picker-title"
          className="mb-1 text-center text-[13px] text-[var(--secondary-label)]"
        >
          请选择风险等级
        </p>
        <p
          className={`mb-5 text-center text-2xl font-semibold ${
            result > 0 ? 'text-[var(--success)]' : 'text-[var(--danger)]'
          }`}
        >
          {formatResult(result)}
        </p>

        <div className="space-y-2.5">
          {RISK_LEVELS.map((level) => {
            const colors = RISK_COLORS[level]
            return (
              <button
                key={level}
                type="button"
                onClick={() => onSelect(level)}
                className={`w-full rounded-xl border py-3.5 text-[17px] font-semibold transition active:scale-[0.98] ${colors.bg} ${colors.text} ${colors.border}`}
              >
                {RISK_LABELS[level]}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="mt-3 w-full py-2.5 text-[15px] text-[var(--secondary-label)]"
        >
          取消
        </button>
      </article>
    </div>
  )
}
