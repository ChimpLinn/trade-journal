'use client'

export type StatsMode = 'month' | 'all'

interface StatsModeSwitchProps {
  mode: StatsMode
  onChange: (mode: StatsMode) => void
}

export function StatsModeSwitch({ mode, onChange }: StatsModeSwitchProps) {
  return (
    <div className="flex rounded-xl bg-[var(--surface)] p-1 ring-1 ring-[var(--separator)]">
      {(
        [
          { id: 'month' as const, label: '按月统计' },
          { id: 'all' as const, label: '整体统计' },
        ] as const
      ).map((item) => {
        const active = mode === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`flex-1 rounded-[10px] py-2 text-[15px] font-medium transition ${
              active
                ? 'bg-[var(--primary)] text-white shadow-sm'
                : 'text-[var(--secondary-label)]'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
