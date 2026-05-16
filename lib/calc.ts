import { RISK_LEVELS } from '@/lib/risk'
import type { ChartPoint, RiskLevel, RiskLevelStats, Trade, TradeStats } from '@/types/trade'

export function formatResult(result: number): string {
  return result > 0 ? `+${result}` : String(result)
}

export function getTradeMonth(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function computeStats(trades: Trade[]): TradeStats {
  const totalTrades = trades.length
  const winTrades = trades.filter((t) => t.result > 0).length
  const winRate =
    totalTrades === 0 ? 0 : Math.round((winTrades / totalTrades) * 1000) / 10
  const totalPnL = trades.reduce((sum, t) => sum + t.result, 0)

  let maxWinStreak = 0
  let maxLoseStreak = 0
  let winStreak = 0
  let loseStreak = 0

  for (const trade of trades) {
    if (trade.result > 0) {
      winStreak += 1
      loseStreak = 0
      maxWinStreak = Math.max(maxWinStreak, winStreak)
    } else {
      loseStreak += 1
      winStreak = 0
      maxLoseStreak = Math.max(maxLoseStreak, loseStreak)
    }
  }

  let cumulative = 0
  const chartData: ChartPoint[] = trades.map((t, i) => {
    cumulative += t.result
    return { index: i + 1, pnl: cumulative }
  })

  return {
    totalTrades,
    winTrades,
    winRate,
    totalPnL,
    maxWinStreak,
    maxLoseStreak,
    chartData,
  }
}

export function filterTradesByRisk(
  trades: Trade[],
  risk: 'all' | RiskLevel
): Trade[] {
  if (risk === 'all') return trades
  return trades.filter((t) => t.risk_level === risk)
}

export function computeStatsByRisk(trades: Trade[]): RiskLevelStats[] {
  return RISK_LEVELS.map((level) => ({
    level,
    stats: computeStats(trades.filter((t) => t.risk_level === level)),
  }))
}

export function groupTradesByMonth(
  trades: Trade[]
): { month: string; trades: Trade[] }[] {
  const map = new Map<string, Trade[]>()

  for (const trade of trades) {
    const list = map.get(trade.trade_month) ?? []
    list.push(trade)
    map.set(trade.trade_month, list)
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([month, monthTrades]) => ({
      month,
      trades: [...monthTrades].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ),
    }))
}
