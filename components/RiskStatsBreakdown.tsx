'use client'

import { RiskBadge } from '@/components/RiskBadge'
import type { RiskLevelStats } from '@/types/trade'

interface RiskStatsBreakdownProps {
  breakdown: RiskLevelStats[]
}

export function RiskStatsBreakdown({ breakdown }: RiskStatsBreakdownProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-[15px] font-semibold text-[var(--foreground)]">
        分风险等级统计
      </h2>
      <div className="space-y-3">
        {breakdown.map(({ level, stats }) => (
          <article
            key={level}
            className="rounded-xl bg-[var(--surface)] p-4 ring-1 ring-[var(--separator)]"
          >
            <RiskBadge level={level} />
            {stats.totalTrades === 0 ? (
              <p className="mt-3 text-[14px] text-[var(--secondary-label)]">
                暂无该等级交易
              </p>
            ) : (
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <dt className="text-[12px] text-[var(--secondary-label)]">笔数</dt>
                  <dd className="text-[18px] font-semibold">{stats.totalTrades}</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-[var(--secondary-label)]">胜率</dt>
                  <dd className="text-[18px] font-semibold">{stats.winRate}%</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-[var(--secondary-label)]">盈亏</dt>
                  <dd
                    className={`text-[18px] font-semibold ${
                      stats.totalPnL > 0
                        ? 'text-[var(--success)]'
                        : stats.totalPnL < 0
                          ? 'text-[var(--danger)]'
                          : ''
                    }`}
                  >
                    {stats.totalPnL > 0 ? '+' : ''}
                    {stats.totalPnL}R
                  </dd>
                </div>
              </dl>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
