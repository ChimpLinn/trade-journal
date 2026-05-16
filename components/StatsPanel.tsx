'use client'

import type { TradeStats } from '@/types/trade'

interface StatsPanelProps {
  stats: TradeStats
  compact?: boolean
}

export function StatsPanel({ stats, compact }: StatsPanelProps) {
  const items = [
    { label: '总单数', value: String(stats.totalTrades) },
    { label: '胜率', value: `${stats.winRate}%` },
    {
      label: '总盈亏',
      value: `${stats.totalPnL > 0 ? '+' : ''}${stats.totalPnL}R`,
      tone:
        stats.totalPnL > 0
          ? 'text-[var(--success)]'
          : stats.totalPnL < 0
            ? 'text-[var(--danger)]'
            : 'text-[var(--foreground)]',
    },
  ]

  if (!compact) {
    items.push(
      { label: '最大连胜', value: String(stats.maxWinStreak) },
      { label: '最大连亏', value: String(stats.maxLoseStreak) }
    )
  }

  return (
    <div
      className={`grid gap-2.5 ${compact ? 'grid-cols-3' : 'grid-cols-2'}`}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl bg-[var(--surface)] px-3 py-3 ring-1 ring-[var(--separator)]"
        >
          <p className="text-[13px] text-[var(--secondary-label)]">{item.label}</p>
          <p
            className={`mt-0.5 text-[16px] font-semibold tracking-tight ${'tone' in item && item.tone ? item.tone : 'text-[var(--foreground)]'}`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}
