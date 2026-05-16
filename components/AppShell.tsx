'use client'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-full w-full max-w-md flex-1 px-5 pb-8 pt-5">
      {children}
    </div>
  )
}
