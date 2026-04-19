'use client'

import { useRouter } from 'next/navigation'
import { useState, useRef, type FormEvent, SyntheticEvent } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SearchFormProps {
  initialQuery?: string
  size?: 'default' | 'hero'
}

export function SearchForm({ initialQuery = '', size = 'default' }: SearchFormProps) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    const trimmed = query.trim()

    if (!trimmed) {
      setError('Please enter a name to search.')
      inputRef.current?.focus()
      return
    }
    if (trimmed.length > 60) {
      setError('Name must be 60 characters or fewer.')
      return
    }

    setError('')
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const isHero = size === 'hero'

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
      aria-label="Name search form"
      noValidate
    >
      <div
        className={cn(
          'flex items-center gap-2 rounded-2xl border border-border bg-card/80',
          'shadow-sm transition-shadow focus-within:shadow-md focus-within:border-ring/50',
          isHero ? 'px-5 py-3' : 'px-4 py-2'
        )}
      >
        <MagnifyingGlass
          weight="duotone"
          className={cn(
            'shrink-0 text-muted-foreground',
            isHero ? 'size-5' : 'size-4'
          )}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id="name-search-input"
          type="text"
          role="searchbox"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="words"
          spellCheck={false}
          placeholder="e.g. Abdulsemiu, Faosat, Ibraheem…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (error) setError('')
          }}
          className={cn(
            'flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60',
            'text-foreground',
            isHero ? 'text-base' : 'text-sm'
          )}
          aria-label="Enter a Yorùbá Islamic name"
          aria-describedby={error ? 'search-error' : undefined}
          aria-invalid={!!error}
        />
        <button
          type="submit"
          id="search-submit-button"
          className={cn(
            'shrink-0 rounded-xl bg-primary px-3 font-medium text-primary-foreground',
            'transition-colors hover:bg-primary/80 active:scale-95',
            isHero ? 'py-2 text-sm' : 'py-1.5 text-xs'
          )}
        >
          Search
        </button>
      </div>

      {error && (
        <p
          id="search-error"
          role="alert"
          className="mt-2 px-1 text-xs text-destructive"
        >
          {error}
        </p>
      )}
    </form>
  )
}
