'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  getCurrentStrategy,
  getCurrentSymbol,
  getStrategies,
  getSymbols,
  setCurrentStrategy as persistStrategy,
  setCurrentSymbol as persistSymbol,
  setStrategies as persistStrategies,
  setSymbols as persistSymbols,
  getViewMonth,
  setViewMonth as persistViewMonth,
} from '@/lib/preferences'
import {
  renameStrategyInTrades,
  renameSymbolInTrades,
} from '@/lib/tradeService'

interface PreferencesContextValue {
  strategy: string
  symbol: string
  strategies: string[]
  symbols: string[]
  setStrategy: (value: string) => void
  setSymbol: (value: string) => void
  addStrategy: (name: string) => boolean
  removeStrategy: (name: string) => void
  renameStrategy: (oldName: string, newName: string) => Promise<boolean>
  addSymbol: (name: string) => boolean
  removeSymbol: (name: string) => void
  renameSymbol: (oldName: string, newName: string) => Promise<boolean>
  viewMonth: string
  setViewMonth: (value: string) => void
  ready: boolean
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [strategy, setStrategyState] = useState('趋势突破')
  const [symbol, setSymbolState] = useState('NAS100')
  const [strategies, setStrategiesState] = useState<string[]>(['趋势突破'])
  const [symbols, setSymbolsState] = useState<string[]>(['NAS100', '黄金', '白银'])
  const [viewMonth, setViewMonthState] = useState('')

  useEffect(() => {
    const sList = getStrategies()
    const symList = getSymbols()
    let currentStrategy = getCurrentStrategy()
    let currentSymbol = getCurrentSymbol()

    if (!sList.includes(currentStrategy)) currentStrategy = sList[0]
    if (!symList.includes(currentSymbol)) currentSymbol = symList[0]

    setStrategiesState(sList)
    setSymbolsState(symList)
    setStrategyState(currentStrategy)
    setSymbolState(currentSymbol)
    setViewMonthState(getViewMonth())
    setReady(true)
  }, [])

  const setViewMonth = useCallback((value: string) => {
    setViewMonthState(value)
    persistViewMonth(value)
  }, [])

  const setStrategy = useCallback((value: string) => {
    setStrategyState(value)
    persistStrategy(value)
  }, [])

  const setSymbol = useCallback((value: string) => {
    setSymbolState(value)
    persistSymbol(value)
  }, [])

  const addStrategy = useCallback(
    (name: string) => {
      const trimmed = name.trim()
      if (!trimmed || strategies.includes(trimmed)) return false
      const next = [...strategies, trimmed]
      setStrategiesState(next)
      persistStrategies(next)
      setStrategy(trimmed)
      return true
    },
    [strategies, setStrategy]
  )

  const removeStrategy = useCallback(
    (name: string) => {
      if (strategies.length <= 1) return
      const next = strategies.filter((s) => s !== name)
      setStrategiesState(next)
      persistStrategies(next)
      if (strategy === name) setStrategy(next[0])
    },
    [strategies, strategy, setStrategy]
  )

  const addSymbol = useCallback(
    (name: string) => {
      const trimmed = name.trim()
      if (!trimmed || symbols.includes(trimmed)) return false
      const next = [...symbols, trimmed]
      setSymbolsState(next)
      persistSymbols(next)
      setSymbol(trimmed)
      return true
    },
    [symbols, setSymbol]
  )

  const removeSymbol = useCallback(
    (name: string) => {
      if (symbols.length <= 1) return
      const next = symbols.filter((s) => s !== name)
      setSymbolsState(next)
      persistSymbols(next)
      if (symbol === name) setSymbol(next[0])
    },
    [symbols, symbol, setSymbol]
  )

  const renameStrategy = useCallback(
    async (oldName: string, newName: string) => {
      const trimmed = newName.trim()
      if (!trimmed || trimmed === oldName) return false
      if (strategies.includes(trimmed)) return false
      const next = strategies.map((s) => (s === oldName ? trimmed : s))
      setStrategiesState(next)
      persistStrategies(next)
      if (strategy === oldName) setStrategy(trimmed)
      await renameStrategyInTrades(oldName, trimmed)
      return true
    },
    [strategies, strategy, setStrategy]
  )

  const renameSymbol = useCallback(
    async (oldName: string, newName: string) => {
      const trimmed = newName.trim()
      if (!trimmed || trimmed === oldName) return false
      if (symbols.includes(trimmed)) return false
      const next = symbols.map((s) => (s === oldName ? trimmed : s))
      setSymbolsState(next)
      persistSymbols(next)
      if (symbol === oldName) setSymbol(trimmed)
      await renameSymbolInTrades(oldName, trimmed)
      return true
    },
    [symbols, symbol, setSymbol]
  )

  const value = useMemo(
    () => ({
      strategy,
      symbol,
      strategies,
      symbols,
      setStrategy,
      setSymbol,
      addStrategy,
      removeStrategy,
      renameStrategy,
      addSymbol,
      removeSymbol,
      renameSymbol,
      viewMonth,
      setViewMonth,
      ready,
    }),
    [
      strategy,
      symbol,
      strategies,
      symbols,
      setStrategy,
      setSymbol,
      addStrategy,
      removeStrategy,
      renameStrategy,
      addSymbol,
      removeSymbol,
      renameSymbol,
      viewMonth,
      setViewMonth,
      ready,
    ]
  )

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider')
  }
  return ctx
}
