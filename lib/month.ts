import { getTradeMonth } from '@/lib/calc'

/** YYYY-MM */
export function getCurrentViewMonth(): string {
  return getTradeMonth()
}

export function parseTradeMonth(month: string): { year: number; month: number } {
  const [y, m] = month.split('-').map(Number)
  return { year: y, month: m }
}

export function formatMonthLabel(month: string): string {
  const { year, month: m } = parseTradeMonth(month)
  return `${year}年${m}月`
}

export function shiftMonth(month: string, delta: number): string {
  const { year, month: m } = parseTradeMonth(month)
  const date = new Date(year, m - 1 + delta, 1)
  return getTradeMonth(date)
}

export function composeMonth(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`
}

export function getYearOptions(
  centerYear = new Date().getFullYear(),
  span = 6
): number[] {
  const years: number[] = []
  for (let y = centerYear - span; y <= centerYear + 2; y += 1) {
    years.push(y)
  }
  return years
}

export const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}月`,
}))
