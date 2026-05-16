'use client'

import { useState } from 'react'
import type { TradeResult } from '@/types/trade'

type Direction = '+' | '-'

interface TradePadProps {
  onResultReady: (result: TradeResult) => void
  disabled?: boolean
}

export function TradePad({ onResultReady, disabled }: TradePadProps) {
  const [direction, setDirection] = useState<Direction | null>(null)
  const [multiplier, setMultiplier] = useState<1 | 2 | null>(null)

  const selectDirection = (d: Direction) => {
    setDirection(d)
    if (multiplier !== null) {
      finish(d, multiplier)
    }
  }

  const selectMultiplier = (m: 1 | 2) => {
    setMultiplier(m)
    if (direction !== null) {
      finish(direction, m)
    }
  }

  const finish = (d: Direction, m: 1 | 2) => {
    const sign = d === '+' ? 1 : -1
    const result = (sign * m) as TradeResult
    setDirection(null)
    setMultiplier(null)
    onResultReady(result)
  }

  const baseBtn =
    'trade-pad-btn trade-pad-cell w-full rounded-2xl font-semibold shadow-sm transition active:scale-[0.98] disabled:opacity-50'

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => selectDirection('+')}
        className={`${baseBtn} text-white ${
          direction === '+'
            ? 'bg-[#067a68] ring-2 ring-[var(--success)] ring-offset-2 ring-offset-[var(--background)]'
            : 'bg-[var(--success)]'
        }`}
      >
        +
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => selectMultiplier(1)}
        className={`${baseBtn} bg-[var(--surface)] text-[var(--foreground)] ${
          multiplier === 1
            ? 'ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)]'
            : 'ring-1 ring-[var(--separator)]'
        }`}
      >
        1
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => selectDirection('-')}
        className={`${baseBtn} text-white ${
          direction === '-'
            ? 'bg-[#c2185b] ring-2 ring-[var(--danger)] ring-offset-2 ring-offset-[var(--background)]'
            : 'bg-[var(--danger)]'
        }`}
      >
        −
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => selectMultiplier(2)}
        className={`${baseBtn} bg-[var(--surface)] text-[var(--foreground)] ${
          multiplier === 2
            ? 'ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)]'
            : 'ring-1 ring-[var(--separator)]'
        }`}
      >
        2
      </button>
    </div>
  )
}
