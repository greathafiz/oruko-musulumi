'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function Header() {
  const { setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Orúkọ Mùsùlùmí
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          <Link
            href="/contribute"
            className="
              'hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex px-3 py-1.5 rounded-lg hover:bg-muted"
          >
            Contribute
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button variant="outline" size="icon">
                <SunIcon weight="duotone" className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <MoonIcon weight="duotone" className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            }>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
