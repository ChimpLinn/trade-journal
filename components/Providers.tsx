'use client'

import { PreferencesProvider } from '@/contexts/PreferencesContext'
import { AppShell } from '@/components/AppShell'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PreferencesProvider>
      <AppShell>{children}</AppShell>
    </PreferencesProvider>
  )
}
