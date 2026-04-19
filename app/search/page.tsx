import type { Metadata } from 'next'
import { search } from '@/lib/search'
import { ResultCard } from '@/components/result/ResultCard'
import { NoMatchState } from '@/components/result/NoMatchState'
import { SearchForm } from '@/components/search/SearchForm'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata(
  { searchParams }: SearchPageProps
): Promise<Metadata> {
  const { q } = await searchParams
  const query = q?.trim() ?? ''
  return {
    title: query
      ? `Results for "${query}"`
      : 'Search',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = (q ?? '').trim()

  // Run search server-side — no client round-trip needed
  const result = query ? search(query) : null

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">

      <div className="mb-8">
        <SearchForm initialQuery={query} />
      </div>

      {result && result.variant.confidence !== 'high' && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3"
        >
          <span className="mt-0.5 text-amber-500" aria-hidden="true">⚠</span>
          <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-400">
            <strong>Probable match —</strong> this result was found via approximate
            matching, not an exact entry in our database. The mapping may not be
            definitive. Consider{' '}
            <a
              href={`/contribute?name=${encodeURIComponent(query)}`}
              className="underline underline-offset-2"
            >
              suggesting a correction
            </a>{' '}
            if you know the exact origin.
          </p>
        </div>
      )}

      {!query && (
        <p className="text-center text-sm text-muted-foreground">
          Enter a name above to search.
        </p>
      )}

      {query && result && <ResultCard result={result} />}
      {query && !result && <NoMatchState query={query} />}

    </div>
  )
}
