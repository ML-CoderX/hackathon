'use client'

import Link from 'next/link'
import { Home, Leaf, Bug, TrendingUp, Settings, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card min-h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
          {t('menu')}
        </h3>

        <Link href="/dashboard">
          <Button
            variant={isActive('/dashboard') ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
          >
            <Home className="w-4 h-4" />
            {t('nav_dashboard')}
          </Button>
        </Link>

        <Link href="/crops">
          <Button
            variant={isActive('/crops') ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
          >
            <Leaf className="w-4 h-4" />
            {t('crop_recommendation')}
          </Button>
        </Link>

        <Link href="/disease-detection">
          <Button
            variant={isActive('/disease-detection') ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
          >
            <Bug className="w-4 h-4" />
            {t('nav_disease')}
          </Button>
        </Link>

        <Link href="/mandi-prices">
          <Button
            variant={isActive('/mandi-prices') ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
          >
            <TrendingUp className="w-4 h-4" />
            {t('nav_mandi')}
          </Button>
        </Link>
      </div>

      <div className="border-t border-border p-4 space-y-2">
        <h3 className="text-xs font-semibold text-muted-foreground px-3 py-2 uppercase tracking-wider">
          {t('account')}
        </h3>

        <Link href="/settings">
          <Button
            variant={isActive('/settings') ? 'default' : 'ghost'}
            className="w-full justify-start gap-3"
          >
            <Settings className="w-4 h-4" />
            {t('settings')}
          </Button>
        </Link>

        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive">
          <LogOut className="w-4 h-4" />
          {t('logout')}
        </Button>
      </div>
    </aside>
  )
}
