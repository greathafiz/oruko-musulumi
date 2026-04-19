import type { Metadata } from 'next'
import { SearchForm } from '@/components/search/SearchForm'

export const metadata: Metadata = {
  title: 'Orúkọ Mùsùlùmí — Yorùbá Islamic Name Origins',
}

const SAMPLE_NAMES = [
  'Abdulsemiu',
  'Sulaimon',
  'Ibraheem',
  'Faosat',
  'Moriamo',
  'Sikiru',
  'Mutiu',
  'Ramota',
  'Khadijat',
  'Hafsat',
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Enter the name',
    desc: 'Type any Yorùbá Islamic name as you know it — any spelling, with or without tone marks.',
  },
  {
    step: '2',
    title: 'See the Arabic origin',
    desc: 'We show the authentic Arabic form in script and transliteration, with its precise meaning.',
  },
  {
    step: '3',
    title: 'Understand the adaptation',
    desc: 'Learn how and why your name changed when it came into Yorùbá — phonology, oral transmission, and history.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section
        className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-20 sm:px-6"
        aria-labelledby="hero-heading"
      >
        <div className="w-full max-w-2xl space-y-8 text-center">
          <div className="space-y-3">
            <h1
              id="hero-heading"
              className="text-5xl font-black tracking-tight text-foreground"
            >
              Your name was given with intention.
              Know what that intention was
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground">
              Many Yorùbá Islamic names were adapted over generations of oral tradition — beautiful, but often misunderstood. Trace yours back to its Arabic root
            </p>
          </div>

          <div className="mx-auto max-w-xl">
            <SearchForm size="hero" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
              Try a name
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SAMPLE_NAMES.map((name) => (
                <a
                  key={name}
                  href={`/search?q=${encodeURIComponent(name)}`}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-4 py-16 sm:px-6"
        aria-labelledby="how-heading"
      >
        <div className="mx-auto max-w-2xl">
          <h2
            id="how-heading"
            className="mb-10 text-center text-xl font-semibold tracking-tight text-foreground"
          >
            How it works
          </h2>
          <ol className="grid gap-6 grid-cols-1 sm:grid-cols-3" role="list">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <li
                key={title}
                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5"
              >
                <span
                  className="text-2xl text-primary"
                  aria-hidden="true"
                >
                  {step}
                </span>
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/30 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-xl text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Know a name that&apos;s missing? Help grow this resource.
          </p>
          <a
            href="/contribute"
            id="contribute-cta-link"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
          >
            Contribute a name →
          </a>
        </div>
      </section>
    </div>
  )
}
