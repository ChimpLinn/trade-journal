'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { FilterCard } from '@/components/FilterCard'
import { MonthList } from '@/components/MonthList'
import { usePreferences } from '@/contexts/PreferencesContext'
import { useTrades } from '@/hooks/useTrades'

type ConfirmType = 'clear' | 'delete' | null

export default function HistoryPage() {
  const {
    strategy,
    symbol,
    strategies,
    symbols,
    setStrategy,
    setSymbol,
    ready,
  } = usePreferences()
  const { trades, loading, error, removeTrades, clearAll } = useTrades(
    strategy,
    symbol,
    ready
  )

  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [confirmType, setConfirmType] = useState<ConfirmType>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const exitSelectMode = useCallback(() => {
    setSelectMode(false)
    setSelectedIds(new Set())
  }, [])

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleConfirm = useCallback(async () => {
    setActionLoading(true)
    setActionError(null)
    try {
      if (confirmType === 'clear') {
        await clearAll()
        exitSelectMode()
      } else if (confirmType === 'delete') {
        await removeTrades(Array.from(selectedIds))
        exitSelectMode()
      }
      setConfirmType(null)
    } catch {
      setActionError('操作失败，请重试')
      setConfirmType(null)
    } finally {
      setActionLoading(false)
    }
  }, [confirmType, clearAll, removeTrades, selectedIds, exitSelectMode])

  const selectedCount = selectedIds.size

  if (!ready) {
    return <p className="text-center text-[15px] text-[#8E8E93]">加载中…</p>
  }

  return (
    <div>
      <header className="mb-5 flex items-center gap-2">
        <Link
          href="/"
          aria-label="返回"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--primary)] ring-1 ring-[var(--separator)] transition active:scale-95"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="ios-headline min-w-0 flex-1 text-[var(--foreground)]">
          数据
        </h1>
        <div className="flex shrink-0 items-center gap-2">
          {selectMode ? (
            <>
              <button
                type="button"
                onClick={exitSelectMode}
                className="rounded-full px-3 py-1.5 text-[14px] font-medium text-[var(--secondary-label)]"
              >
                取消
              </button>
              <button
                type="button"
                disabled={selectedCount === 0}
                onClick={() => setConfirmType('delete')}
                className="rounded-full bg-[var(--danger)] px-3 py-1.5 text-[14px] font-medium text-white disabled:opacity-40"
              >
                删除{selectedCount > 0 ? `(${selectedCount})` : ''}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                disabled={trades.length === 0}
                onClick={() => {
                  setSelectMode(true)
                  setSelectedIds(new Set())
                }}
                className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-[14px] font-medium text-[var(--primary)] ring-1 ring-[var(--separator)] disabled:opacity-40"
              >
                选择
              </button>
              <button
                type="button"
                disabled={trades.length === 0}
                onClick={() => setConfirmType('clear')}
                className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-[14px] font-medium text-[var(--danger)] ring-1 ring-[var(--separator)] disabled:opacity-40"
              >
                清空
              </button>
            </>
          )}
        </div>
      </header>

      {selectMode && (
        <p className="-mt-3 mb-4 text-center text-[13px] text-[var(--secondary-label)]">
          点击记录进行选择
        </p>
      )}

      <div className="mb-5">
        <FilterCard
          strategy={strategy}
          symbol={symbol}
          strategies={strategies}
          symbols={symbols}
          onStrategyChange={(v) => {
            exitSelectMode()
            setStrategy(v)
          }}
          onSymbolChange={(v) => {
            exitSelectMode()
            setSymbol(v)
          }}
        />
      </div>

      {actionError && (
        <p className="mb-4 rounded-xl bg-[var(--danger)]/12 px-4 py-2.5 text-[15px] text-[var(--danger)]">
          {actionError}
        </p>
      )}

      {loading && (
        <p className="text-center text-[15px] text-[#8E8E93]">加载中…</p>
      )}

      {error && (
        <p className="rounded-xl bg-[var(--danger)]/12 px-4 py-2.5 text-[15px] text-[var(--danger)]">
          {error}
        </p>
      )}

      {!loading && !error && (
        <MonthList
          trades={trades}
          selectMode={selectMode}
          selectedIds={selectedIds}
          onToggleSelect={toggleSelect}
        />
      )}

      <ConfirmDialog
        open={confirmType === 'clear'}
        title="清空数据"
        message={`确定清空「${strategy} · ${symbol}」下的全部记录吗？此操作不可恢复。`}
        confirmLabel="清空"
        destructive
        loading={actionLoading}
        onConfirm={() => void handleConfirm()}
        onCancel={() => setConfirmType(null)}
      />

      <ConfirmDialog
        open={confirmType === 'delete'}
        title="删除记录"
        message={`确定删除已选中的 ${selectedCount} 条记录吗？此操作不可恢复。`}
        confirmLabel="删除"
        destructive
        loading={actionLoading}
        onConfirm={() => void handleConfirm()}
        onCancel={() => setConfirmType(null)}
      />
    </div>
  )
}
