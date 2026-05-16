'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  clearTrades,
  deleteTradesByIds,
  fetchTrades,
  insertTrade,
} from '@/lib/tradeService'
import type { RiskLevel, Trade, TradeResult } from '@/types/trade'

export function useTrades(
  strategy: string,
  symbol: string,
  enabled = true,
  month?: string
) {
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    if (!enabled || !strategy || !symbol) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTrades(
        strategy,
        symbol,
        month ? { month } : undefined
      )
      setTrades(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败')
    } finally {
      setLoading(false)
    }
  }, [strategy, symbol, month, enabled])

  useEffect(() => {
    reload()
  }, [reload])

  const addTrade = useCallback(
    async (
      result: TradeResult,
      tradeMonth: string,
      riskLevel: RiskLevel
    ) => {
      const trade = await insertTrade({
        strategy,
        symbol,
        result,
        tradeMonth,
        riskLevel,
      })
      if (!month || trade.trade_month === month) {
        setTrades((prev) => [...prev, trade])
      }
      return trade
    },
    [strategy, symbol, month]
  )

  const removeTrades = useCallback(async (ids: string[]) => {
    await deleteTradesByIds(ids)
    setTrades((prev) => prev.filter((t) => !ids.includes(t.id)))
  }, [])

  const clearAll = useCallback(async () => {
    await clearTrades(strategy, symbol)
    setTrades([])
  }, [strategy, symbol])

  return {
    trades,
    loading,
    error,
    reload,
    addTrade,
    removeTrades,
    clearAll,
  }
}
