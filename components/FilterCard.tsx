'use client'

import { SelectField } from '@/components/SelectField'

interface FilterCardProps {
  strategy: string
  symbol: string
  strategies: string[]
  symbols: string[]
  onStrategyChange: (value: string) => void
  onSymbolChange: (value: string) => void
  footer?: React.ReactNode
}

export function FilterCard({
  strategy,
  symbol,
  strategies,
  symbols,
  onStrategyChange,
  onSymbolChange,
  footer,
}: FilterCardProps) {
  return (
    <div className="overflow-hidden rounded-xl bg-[var(--surface)] ring-1 ring-[var(--separator)]">
      <div className="grid grid-cols-2 gap-3 p-4">
        <SelectField
          label="策略"
          value={strategy}
          options={strategies}
          onChange={onStrategyChange}
        />
        <SelectField
          label="品种"
          value={symbol}
          options={symbols}
          onChange={onSymbolChange}
        />
      </div>
      {footer ? (
        <div className="border-t border-[var(--separator)] bg-[var(--background)]/50 px-4 py-2.5">
          {footer}
        </div>
      ) : null}
    </div>
  )
}
