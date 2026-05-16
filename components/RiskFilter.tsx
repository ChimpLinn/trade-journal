'use client'

import { RISK_FILTER_OPTIONS, type RiskFilter } from '@/lib/risk'

interface RiskFilterSelectProps {
  value: RiskFilter
  onChange: (value: RiskFilter) => void
}

export function RiskFilterSelect({ value, onChange }: RiskFilterSelectProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] text-[var(--secondary-label)]">
        风险等级
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as RiskFilter)}
          className="ios-select w-full appearance-none rounded-xl bg-[var(--surface)] py-3 pl-3.5 pr-10 text-[15px] font-medium text-[var(--foreground)] outline-none ring-1 ring-[var(--separator)] focus:ring-2 focus:ring-[var(--primary)]/30"
        >
          {RISK_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--secondary-label)]"
          width="16"
          height="16"
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
      </div>
    </label>
  )
}
