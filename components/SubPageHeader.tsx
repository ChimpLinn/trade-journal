'use client'

import Link from 'next/link'

export function SubPageHeader({ title }: { title?: string }) {
  return (
    <header className="mb-5 flex items-center gap-3">
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
      {title ? (
        <h1 className="ios-headline text-[var(--foreground)]">{title}</h1>
      ) : null}
    </header>
  )
}
