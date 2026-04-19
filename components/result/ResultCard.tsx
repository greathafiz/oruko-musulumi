import Link from 'next/link'
import { ArrowCounterClockwise, PencilSimple } from '@phosphor-icons/react/dist/ssr'
import type { SearchResult } from '@/lib/types'
import { ConfidenceBadge } from '@/components/result/ConfidenceBadge'
import { CategoryBadge } from '@/components/result/CategoryBadge'

interface ResultCardProps {
  result: SearchResult
}

export function ResultCard({ result }: ResultCardProps) {
  const { canonical, variant, query } = result

  return (
    <article
      className="w-full space-y-6"
      aria-label={`Search result for ${query}`}
    >
      <div className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <ConfidenceBadge confidence={variant.confidence} />
          <CategoryBadge category={canonical.category} />
        </div>

        <div className="mb-2 text-right" lang="ar" dir="rtl">
          <p
            className="font-arabic text-4xl leading-relaxed text-foreground sm:text-5xl"
            aria-label={`Arabic: ${canonical.arabic_name}`}
          >
            {canonical.arabic_name}
          </p>
        </div>

        <p className="text-right text-sm font-medium italic text-muted-foreground sm:text-base">
          {canonical.transliteration}
        </p>

        {canonical.pronunciation_en && (
          <div className="mt-3 flex justify-end">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
              <span aria-hidden="true">🔊</span>
              <span aria-label="Pronunciation guide">
                /{canonical.pronunciation_en}/
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
          Meaning
        </h2>
        <p className="text-base font-medium leading-relaxed text-foreground sm:text-lg">
          {canonical.meaning}
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            Yorùbá Adaptation
          </h2>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/40 p-3">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
              Yorùbá form
            </p>
            <p className="font-medium text-foreground">{variant.input_variant}</p>
            {variant.yoruba_pronunciation && (
              <p className="mt-0.5 text-xs italic text-muted-foreground">
                {variant.yoruba_pronunciation}
              </p>
            )}
          </div>
          <div className="rounded-xl bg-muted/40 p-3 text-right" lang="ar" dir="rtl">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50" dir="ltr">
              Arabic origin
            </p>
            <p className="font-arabic text-lg font-medium text-foreground">
              {canonical.arabic_name}
            </p>
            <p className="mt-0.5 text-xs italic text-muted-foreground" dir="ltr">
              {canonical.transliteration}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {variant.adaptation_notes}
        </p>
      </div>

      {canonical.origin_notes && (
        <div className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            Islamic Context
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {canonical.origin_notes}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
        <Link
          href="/"
          id="result-search-again-link"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowCounterClockwise className="size-3.5" aria-hidden="true" />
          Search another name
        </Link>
        <Link
          href={`/contribute?name=${encodeURIComponent(query)}`}
          id="result-suggest-correction-link"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
        >
          <PencilSimple className="size-3" aria-hidden="true" />
          Suggest a correction
        </Link>
      </div>
    </article>
  )
}
