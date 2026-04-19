import Link from 'next/link'
import { MagnifyingGlass, ArrowLeft } from '@phosphor-icons/react/dist/ssr'

interface NoMatchStateProps {
  query: string
}

export function NoMatchState({ query }: NoMatchStateProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div
        className="font-arabic text-6xl text-muted-foreground/20"
        lang="ar"
        aria-hidden="true"
      >
        ؟
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">
          No match found for &ldquo;{query}&rdquo;
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          We couldn&apos;t find a variant matching that name. This could mean the
          name isn&apos;t in our database yet, or the spelling differs significantly.
        </p>
      </div>

      <ul className="w-full max-w-xs space-y-1.5 text-left text-xs text-muted-foreground">
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-primary" aria-hidden="true">→</span>
          Try a different spelling (e.g. &ldquo;Ibraheem&rdquo; vs &ldquo;Ibrahim&rdquo;)
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-primary" aria-hidden="true">→</span>
          Remove hyphens or spaces (e.g. &ldquo;Abdulrazaq&rdquo; not &ldquo;Abdul-Razaq&rdquo;)
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-0.5 text-primary" aria-hidden="true">→</span>
          Remove tone marks if present
        </li>
      </ul>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          id="no-match-back-link"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Search again
        </Link>
        <Link
          href={`/contribute?name=${encodeURIComponent(query)}`}
          id="no-match-contribute-link"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          <MagnifyingGlass className="size-3.5" aria-hidden="true" />
          Suggest this name
        </Link>
      </div>
    </div>
  )
}
