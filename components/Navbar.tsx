"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { Menu, X, Moon, Sun, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import LocaleSwitcher from "./LocaleSwitcher"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const t = useTranslations()
  
  const routes = [
    { href: `/${pathname.split('/')[1] || 'uz'}`, label: t('Home') },
    { href: `/${pathname.split('/')[1] || 'uz'}/military`, label: t('Military') },
    { href: `/${pathname.split('/')[1] || 'uz'}/history`, label: t('History') },
    { href: `/${pathname.split('/')[1] || 'uz'}/facts`, label: t('Facts') },
    { href: `/${pathname.split('/')[1] || 'uz'}/videos`, label: t('Videos') },
  ]

  const currentLocale = pathname.split('/')[1] || 'uz'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
              <span className="font-bold text-xl">NATIONAL24</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex relative">
              <Input
                type="search"
                placeholder={t('Search')}
                className="w-64 pl-8"
              />
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
            <LocaleSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium"
                    >
                      {route.label}
                    </Link>
                  ))}
                  <div className="relative mt-4">
                    <Input
                      type="search"
                      placeholder={t('Search')}
                      className="w-full pl-8"
                    />
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
