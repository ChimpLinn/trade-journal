'use client'

import { useMemo } from 'react'
import { computeStats } from '@/lib/calc'
import type { Trade } from '@/types/trade'

export function useStats(trades: Trade[]) {
  return useMemo(() => computeStats(trades), [trades])
}
