'use client'

import { useCallback, useState } from 'react'
import { EquityChart } from '@/components/EquityChart'
import { FilterCard } from '@/components/FilterCard'
import { HomeToolbar } from '@/components/HomeToolbar'
import { MonthPicker } from '@/components/MonthPicker'
import { RiskPickerModal } from '@/components/RiskPickerModal'
import { SettingsFab } from '@/components/SettingsFab'
import { StatsPanel } from '@/components/StatsPanel'
import { Toast, tradeRecordedMessage } from '@/components/Toast'
import { TradePad } from '@/components/TradePad'
import { usePreferences } from '@/contexts/PreferencesContext'
import { formatMonthLabel } from '@/lib/month'
import { useStats } from '@/hooks/useStats'
import { useTrades } from '@/hooks/useTrades'
import type { RiskLevel, TradeResult } from '@/types/trade'

export default function HomePage() {
  const {
    strategy,
    symbol,
    strategies,
    symbols,
    setStrategy,
    setSymbol,
    viewMonth,
    setViewMonth,
    ready,
  } = usePreferences()
  const { trades, loading, error, addTrade } = useTrades(
    strategy,
    symbol,
    ready,
    viewMonth
  )
  const stats = useStats(trades)
  const [toast, setToast] = useState<string | null>(null)
  const [pendingResult, setPendingResult] = useState<TradeResult | null>(null)
  const [saving, setSaving] = useState(false)

  const handleRiskSelect = useCallback(
    async (risk: RiskLevel) => {
      if (pendingResult === null) return
      setSaving(true)
      try {
        await addTrade(pendingResult, viewMonth, risk)
        setToast(tradeRecordedMessage(pendingResult, risk))
        setPendingResult(null)
      } catch {
        setToast('保存失败，请重试')
      } finally {
        setSaving(false)
      }
    },
    [addTrade, pendingResult, viewMonth]
  )

  if (!ready) {
    return <p className="text-center text-[15px] text-[#8E8E93]">加载中…</p>
  }

  return (
    <>
      <HomeToolbar />

      <div className="space-y-4">
        <FilterCard
          strategy={strategy}
          symbol={symbol}
          strategies={strategies}
          symbols={symbols}
          onStrategyChange={setStrategy}
          onSymbolChange={setSymbol}
          footer={
            <p className="text-center text-[13px] text-[var(--secondary-label)]">
              当前录入 · {formatMonthLabel(viewMonth)}
            </p>
          }
        />

        <MonthPicker
          value={viewMonth}
          onChange={setViewMonth}
          largeNextButton
        />

        <TradePad
          onResultReady={setPendingResult}
          disabled={loading || saving || pendingResult !== null}
        />

        {error && (
          <p className="rounded-xl bg-[var(--danger)]/12 px-4 py-2.5 text-[15px] text-[var(--danger)]">
            {error}
          </p>
        )}

        <StatsPanel stats={stats} compact />
        <EquityChart data={stats.chartData} height={140} />
      </div>

      <RiskPickerModal
        result={pendingResult}
        onSelect={(risk) => void handleRiskSelect(risk)}
        onCancel={() => setPendingResult(null)}
      />

      <SettingsFab />
      <Toast message={toast} onClose={() => setToast(null)} />
    </>
  )
}
