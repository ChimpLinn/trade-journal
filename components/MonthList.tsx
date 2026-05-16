'use client'

import { RiskBadge } from '@/components/RiskBadge'
import { formatResult, groupTradesByMonth } from '@/lib/calc'
import { formatMonthLabel } from '@/lib/month'
import type { Trade } from '@/types/trade'

interface MonthListProps {
  trades: Trade[]
  selectMode?: boolean
  selectedIds?: Set<string>
  onToggleSelect?: (id: string) => void
}

export function MonthList({
  trades,
  selectMode = false,
  selectedIds,
  onToggleSelect,
}: MonthListProps) {
  const groups = groupTradesByMonth(trades)

  if (groups.length === 0) {
    return (
      <p className="py-12 text-center text-[15px] text-[var(--secondary-label)]">
        暂无数据
      </p>
    )
  }

  return (
    <div className="space-y-8">
      {groups.map(({ month, trades: monthTrades }) => (
        <section key={month}>
          <h2 className="ios-title2 mb-2 text-[var(--foreground)]">
            {formatMonthLabel(month)}
          </h2>
          <ul className="flex flex-col gap-2">
            {monthTrades.map((trade) => {
              const selected = selectedIds?.has(trade.id) ?? false
              return (
                <li key={trade.id}>
                  <button
                    type="button"
                    disabled={!selectMode}
                    onClick={() => selectMode && onToggleSelect?.(trade.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left transition ${
                      selectMode
                        ? selected
                          ? 'bg-[var(--primary)]/10 ring-1 ring-[var(--primary)]/40'
                          : 'active:bg-[var(--background)]'
                        : 'cursor-default'
                    }`}
                  >
                    {selectMode ? (
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          selected
                            ? 'border-[var(--primary)] bg-[var(--primary)]'
                            : 'border-[var(--separator)] bg-[var(--surface)]'
                        }`}
                        aria-hidden
                      >
                        {selected ? (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : null}
                      </span>
                    ) : null}
                    <span
                      className={`shrink-0 text-[20px] font-medium ${
                        trade.result > 0
                          ? 'text-[var(--success)]'
                          : 'text-[var(--danger)]'
                      }`}
                    >
                      {formatResult(trade.result)}
                    </span>
                    <span className="min-w-0 flex-1" />
                    {trade.risk_level ? (
                      <RiskBadge level={trade.risk_level} />
                    ) : (
                      <span className="w-0" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
