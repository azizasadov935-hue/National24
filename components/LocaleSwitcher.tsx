"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Globe } from 'lucide-react'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLocale('uz')} className={locale === 'uz' ? 'bg-accent' : ''}>
          O‘zbek
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('ru')} className={locale === 'ru' ? 'bg-accent' : ''}>
          Русский
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('en')} className={locale === 'en' ? 'bg-accent' : ''}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
