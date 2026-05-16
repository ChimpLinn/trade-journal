'use client'

import { useEffect } from 'react'
import { formatResult } from '@/lib/calc'
import { RISK_LABELS } from '@/lib/risk'
import type { RiskLevel } from '@/types/trade'

interface ToastProps {
  message: string | null
  onClose: () => void
  duration?: number
}

export function Toast({ message, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [message, onClose, duration])

  if (!message) return null

  return (
    <div
      className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 animate-toast-in rounded-2xl bg-[#1C1C1E]/90 px-5 py-3 shadow-lg backdrop-blur-sm"
      role="status"
    >
      <span className="text-[15px] font-medium text-white">✔ {message}</span>
    </div>
  )
}

export function tradeRecordedMessage(result: number, risk?: RiskLevel) {
  const base = `已记录 ${formatResult(result)}`
  return risk ? `${base} · ${RISK_LABELS[risk]}` : base
}
