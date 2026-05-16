import type { RiskLevel } from '@/types/trade'

export const RISK_LEVELS: RiskLevel[] = ['high', 'medium', 'low']

export const RISK_LABELS: Record<RiskLevel, string> = {
  high: '高风险',
  medium: '中风险',
  low: '低风险',
}

export const RISK_COLORS: Record<
  RiskLevel,
  { text: string; bg: string; border: string }
> = {
  high: {
    text: 'text-[#e91e63]',
    bg: 'bg-[#e91e63]/12',
    border: 'border-[#e91e63]/30',
  },
  medium: {
    text: 'text-[#f59e0b]',
    bg: 'bg-[#f59e0b]/12',
    border: 'border-[#f59e0b]/35',
  },
  low: {
    text: 'text-[#089981]',
    bg: 'bg-[#089981]/12',
    border: 'border-[#089981]/30',
  },
}

export type RiskFilter = 'all' | RiskLevel

export const RISK_FILTER_OPTIONS: { value: RiskFilter; label: string }[] = [
  { value: 'all', label: '全部风险' },
  { value: 'high', label: '高风险' },
  { value: 'medium', label: '中风险' },
  { value: 'low', label: '低风险' },
]
