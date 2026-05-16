'use client'

import { formatMonthLabel, shiftMonth } from '@/lib/month'

interface MonthPickerProps {
  value: string
  onChange: (month: string) => void
  largeNextButton?: boolean
}

export function MonthPicker({
  value,
  onChange,
  largeNextButton = false,
}: MonthPickerProps) {
  const goNextMonth = () => {
    onChange(shiftMonth(value, 1))
  }

  return (
    <div className="flex gap-2.5">
      <label className="relative flex min-w-0 flex-1 cursor-pointer items-center rounded-xl bg-[var(--surface)] px-4 py-3.5 ring-1 ring-[var(--separator)]">
        <span className="pointer-events-none text-[17px] font-medium text-[var(--foreground)]">
          {formatMonthLabel(value)}
        </span>
        <input
          type="month"
          value={value}
          onChange={(e) => {
            if (e.target.value) onChange(e.target.value)
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
          aria-label="选择年月"
        />
        <svg
          className="pointer-events-none ml-auto shrink-0 text-[var(--secondary-label)]"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </label>
      <button
        type="button"
        onClick={goNextMonth}
        className={`shrink-0 rounded-xl bg-[var(--primary)] font-semibold text-white shadow-sm transition active:scale-[0.97] ${
          largeNextButton
            ? 'min-w-[96px] px-5 py-3.5 text-[17px]'
            : 'min-w-[80px] px-4 py-3 text-[16px]'
        }`}
      >
        下一月
      </button>
    </div>
  )
}
