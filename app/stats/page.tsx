'use client'

import { useEffect, useMemo, useState } from 'react'
import { EquityChart } from '@/components/EquityChart'
import { FilterCard } from '@/components/FilterCard'
import { MonthPicker } from '@/components/MonthPicker'
import { RiskFilterSelect } from '@/components/RiskFilter'
import { RiskStatsBreakdown } from '@/components/RiskStatsBreakdown'
import { StatsModeSwitch, type StatsMode } from '@/components/StatsModeSwitch'
import { StatsPanel } from '@/components/StatsPanel'
import { SubPageHeader } from '@/components/SubPageHeader'
import { usePreferences } from '@/contexts/PreferencesContext'
import { computeStatsByRisk, filterTradesByRisk } from '@/lib/calc'
import { type RiskFilter } from '@/lib/risk'
import { formatMonthLabel } from '@/lib/month'
import { useStats } from '@/hooks/useStats'
import { useTrades } from '@/hooks/useTrades'

export default function StatsPage() {
  const {
    strategy,
    symbol,
    strategies,
    symbols,
    setStrategy,
    setSymbol,
    viewMonth,
    ready,
  } = usePreferences()

  const [statsMode, setStatsMode] = useState<StatsMode>('month')
  const [statsMonth, setStatsMonth] = useState(viewMonth)
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all')

  useEffect(() => {
    if (viewMonth) setStatsMonth(viewMonth)
  }, [viewMonth])

  const monthFilter = statsMode === 'month' ? statsMonth : undefined
  const { trades, loading, error } = useTrades(
    strategy,
    symbol,
    ready,
    monthFilter
  )

  const filteredTrades = useMemo(
    () => filterTradesByRisk(trades, riskFilter),
    [trades, riskFilter]
  )
  const stats = useStats(filteredTrades)
  const riskBreakdown = useMemo(() => computeStatsByRisk(trades), [trades])

  const scopeLabel =
    statsMode === 'month'
      ? formatMonthLabel(statsMonth)
      : '全部月份（整体）'

  const riskLabel =
    riskFilter === 'all'
      ? '全部风险'
      : riskFilter === 'high'
        ? '高风险'
        : riskFilter === 'medium'
          ? '中风险'
          : '低风险'

  return (
    <div>
      <SubPageHeader title="统计" />

      <div className="mb-4 space-y-4">
        <FilterCard
          strategy={strategy}
          symbol={symbol}
          strategies={strategies}
          symbols={symbols}
          onStrategyChange={setStrategy}
          onSymbolChange={setSymbol}
        />

        <StatsModeSwitch mode={statsMode} onChange={setStatsMode} />

        {statsMode === 'month' && (
          <MonthPicker
            value={statsMonth}
            onChange={setStatsMonth}
            largeNextButton
          />
        )}

        <RiskFilterSelect value={riskFilter} onChange={setRiskFilter} />

        <p className="text-center text-[13px] text-[var(--secondary-label)]">
          {scopeLabel} · {riskLabel}
        </p>
      </div>

      {loading && (
        <p className="text-center text-[15px] text-[#8E8E93]">加载中…</p>
      )}

      {error && (
        <p className="mb-4 rounded-xl bg-[var(--danger)]/12 px-4 py-2.5 text-[15px] text-[var(--danger)]">
          {error}
        </p>
      )}

      {!loading && (
        <div className="space-y-5">
          <StatsPanel stats={stats} />
          <EquityChart data={stats.chartData} height={240} />
          <RiskStatsBreakdown breakdown={riskBreakdown} />
        </div>
      )}
    </div>
  )
}
