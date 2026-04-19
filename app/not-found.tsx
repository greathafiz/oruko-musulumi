import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 px-4 text-center">
      <div
        className="font-arabic text-7xl text-primary/20"
        aria-hidden="true"
      >
        404
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-foreground">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          That page doesn&apos;t exist. Try searching for a name instead.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
      >
        Go to search
      </Link>
    </div>
  )
}
