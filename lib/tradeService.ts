import { supabase } from '@/lib/supabase'
import type { RiskLevel, Trade, TradeResult } from '@/types/trade'

export async function fetchTrades(
  strategy: string,
  symbol: string,
  options?: { month?: string; riskLevel?: RiskLevel }
): Promise<Trade[]> {
  let query = supabase
    .from('trades')
    .select('*')
    .eq('strategy', strategy)
    .eq('symbol', symbol)

  if (options?.month) {
    query = query.eq('trade_month', options.month)
  }
  if (options?.riskLevel) {
    query = query.eq('risk_level', options.riskLevel)
  }

  const { data, error } = await query.order('created_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as Trade[]
}

export async function insertTrade(params: {
  strategy: string
  symbol: string
  result: TradeResult
  tradeMonth: string
  riskLevel: RiskLevel
}): Promise<Trade> {
  const { data, error } = await supabase
    .from('trades')
    .insert({
      strategy: params.strategy,
      symbol: params.symbol,
      trade_month: params.tradeMonth,
      result: params.result,
      risk_level: params.riskLevel,
    })
    .select()
    .single()

  if (error) throw error
  return data as Trade
}

export async function deleteTradesByIds(ids: string[]): Promise<void> {
  if (ids.length === 0) return
  const { error } = await supabase.from('trades').delete().in('id', ids)
  if (error) throw error
}

export async function clearTrades(
  strategy: string,
  symbol: string
): Promise<void> {
  const { error } = await supabase
    .from('trades')
    .delete()
    .eq('strategy', strategy)
    .eq('symbol', symbol)

  if (error) throw error
}

export async function renameStrategyInTrades(
  oldName: string,
  newName: string
): Promise<void> {
  const { error } = await supabase
    .from('trades')
    .update({ strategy: newName })
    .eq('strategy', oldName)

  if (error) throw error
}

export async function renameSymbolInTrades(
  oldName: string,
  newName: string
): Promise<void> {
  const { error } = await supabase
    .from('trades')
    .update({ symbol: newName })
    .eq('symbol', oldName)

  if (error) throw error
}
