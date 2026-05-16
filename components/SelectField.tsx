'use client'

interface SelectFieldProps {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

function ChevronDown() {
  return (
    <svg
      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--secondary-label)]"
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
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[13px] text-[var(--secondary-label)]">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ios-select w-full appearance-none rounded-xl bg-[var(--background)] py-2.5 pl-3 pr-8 text-[15px] font-medium text-[var(--foreground)] outline-none transition focus:bg-[var(--surface)] focus:ring-2 focus:ring-[var(--primary)]/30"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown />
      </div>
    </label>
  )
}
