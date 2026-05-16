const STRATEGIES_KEY = 'tj_strategies'
const SYMBOLS_KEY = 'tj_symbols'
const CURRENT_STRATEGY_KEY = 'tj_current_strategy'
const CURRENT_SYMBOL_KEY = 'tj_current_symbol'
const VIEW_MONTH_KEY = 'tj_view_month'

const DEFAULT_STRATEGIES = ['趋势突破']
const DEFAULT_SYMBOLS = ['NAS100', '黄金', '白银']

function readList(key: string, defaults: string[]): string[] {
  if (typeof window === 'undefined') return defaults
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return defaults
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || parsed.length === 0) return defaults
    return parsed.filter((x): x is string => typeof x === 'string')
  } catch {
    return defaults
  }
}

function writeList(key: string, list: string[]) {
  localStorage.setItem(key, JSON.stringify(list))
}

export function getStrategies(): string[] {
  return readList(STRATEGIES_KEY, DEFAULT_STRATEGIES)
}

export function getSymbols(): string[] {
  return readList(SYMBOLS_KEY, DEFAULT_SYMBOLS)
}

export function setStrategies(list: string[]) {
  writeList(STRATEGIES_KEY, list)
}

export function setSymbols(list: string[]) {
  writeList(SYMBOLS_KEY, list)
}

export function getCurrentStrategy(): string {
  if (typeof window === 'undefined') return DEFAULT_STRATEGIES[0]
  return localStorage.getItem(CURRENT_STRATEGY_KEY) || DEFAULT_STRATEGIES[0]
}

export function getCurrentSymbol(): string {
  if (typeof window === 'undefined') return DEFAULT_SYMBOLS[0]
  return localStorage.getItem(CURRENT_SYMBOL_KEY) || DEFAULT_SYMBOLS[0]
}

export function setCurrentStrategy(value: string) {
  localStorage.setItem(CURRENT_STRATEGY_KEY, value)
}

export function setCurrentSymbol(value: string) {
  localStorage.setItem(CURRENT_SYMBOL_KEY, value)
}

export function getViewMonth(): string {
  if (typeof window === 'undefined') {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  }
  const stored = localStorage.getItem(VIEW_MONTH_KEY)
  if (stored && /^\d{4}-\d{2}$/.test(stored)) return stored
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function setViewMonth(value: string) {
  localStorage.setItem(VIEW_MONTH_KEY, value)
}
