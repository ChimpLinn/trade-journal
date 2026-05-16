export type TradeResult = -2 | -1 | 1 | 2

export type RiskLevel = 'high' | 'medium' | 'low'

export interface Trade {
  id: string
  created_at: string
  strategy: string
  symbol: string
  trade_month: string
  result: TradeResult
  risk_level: RiskLevel | null
}

export interface ChartPoint {
  index: number
  pnl: number
}

export interface TradeStats {
  totalTrades: number
  winTrades: number
  winRate: number
  totalPnL: number
  maxWinStreak: number
  maxLoseStreak: number
  chartData: ChartPoint[]
}

export interface RiskLevelStats {
  level: RiskLevel
  stats: TradeStats
}
