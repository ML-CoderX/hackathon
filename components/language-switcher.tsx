'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { LanguageCode } from '@/lib/i18n/translations'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages: { code: LanguageCode; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
  ]

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as LanguageCode)}
        className="px-3 py-1 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
