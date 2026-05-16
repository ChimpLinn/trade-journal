'use client'

import { FormEvent, useState } from 'react'
import { SubPageHeader } from '@/components/SubPageHeader'
import { usePreferences } from '@/contexts/PreferencesContext'

function ManageList({
  title,
  items,
  current,
  onSelect,
  onAdd,
  onRemove,
  onRename,
  placeholder,
}: {
  title: string
  items: string[]
  current: string
  onSelect: (value: string) => void
  onAdd: (name: string) => boolean
  onRemove: (name: string) => void
  onRename: (oldName: string, newName: string) => Promise<boolean>
  placeholder: string
}) {
  const [input, setInput] = useState('')
  const [editing, setEditing] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [renameError, setRenameError] = useState<string | null>(null)

  const handleAdd = (e: FormEvent) => {
    e.preventDefault()
    if (onAdd(input)) setInput('')
  }

  const startEdit = (name: string) => {
    setEditing(name)
    setEditValue(name)
    setRenameError(null)
  }

  const cancelEdit = () => {
    setEditing(null)
    setEditValue('')
    setRenameError(null)
  }

  const saveEdit = async () => {
    if (!editing) return
    setSaving(true)
    setRenameError(null)
    const ok = await onRename(editing, editValue)
    setSaving(false)
    if (ok) {
      cancelEdit()
    } else {
      setRenameError('名称无效或已存在')
    }
  }

  return (
    <section className="rounded-2xl bg-[var(--surface)] p-4 ring-1 ring-[var(--separator)]">
      <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">{title}</h2>

      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-xl border-0 bg-[var(--background)] px-3 py-2.5 text-sm outline-none ring-1 ring-[var(--separator)] focus:ring-2 focus:ring-[var(--primary)]/35"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-medium text-white"
        >
          添加
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((item) => {
          const active = item === current
          const isEditing = editing === item

          return (
            <li
              key={item}
              className="rounded-xl bg-[var(--background)] px-3 py-2.5"
            >
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full rounded-lg bg-[var(--surface)] px-3 py-2 text-sm outline-none ring-1 ring-[var(--primary)]"
                    autoFocus
                  />
                  {renameError && (
                    <p className="text-xs text-[var(--danger)]">{renameError}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => void saveEdit()}
                      className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
                    >
                      {saving ? '保存中…' : '保存'}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="rounded-lg px-3 py-1.5 text-xs text-[var(--secondary-label)]"
                    >
                      取消
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className={`min-w-0 flex-1 truncate text-left text-sm font-medium ${
                      active ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'
                    }`}
                  >
                    {item}
                    {active && (
                      <span className="ml-2 text-xs text-[var(--secondary-label)]">当前</span>
                    )}
                  </button>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="text-xs text-[var(--primary)]"
                    >
                      重命名
                    </button>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemove(item)}
                        className="text-xs text-[var(--danger)]"
                      >
                        删除
                      </button>
                    )}
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default function SettingsPage() {
  const {
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
    ready,
  } = usePreferences()

  if (!ready) {
    return <p className="text-center text-sm text-[#8E8E93]">加载中…</p>
  }

  return (
    <div className="space-y-5 pb-4">
      <SubPageHeader title="设置" />

      <ManageList
        title="策略"
        items={strategies}
        current={strategy}
        onSelect={setStrategy}
        onAdd={addStrategy}
        onRemove={removeStrategy}
        onRename={renameStrategy}
        placeholder="新策略名称"
      />

      <ManageList
        title="品种"
        items={symbols}
        current={symbol}
        onSelect={setSymbol}
        onAdd={addSymbol}
        onRemove={removeSymbol}
        onRename={renameSymbol}
        placeholder="自定义品种"
      />
    </div>
  )
}
