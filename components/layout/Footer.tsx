import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-sm font-semibold text-foreground">
              Orúkọ Mùsùlùmí
            </span>
            <p className="text-xs text-muted-foreground">
              Bridging Yorùbá names back to their Arabic origins
            </p>
          </div>

          <nav
            className="flex items-center gap-4 text-xs text-muted-foreground"
            aria-label="Footer navigation"
          >
            <Link href="/contribute" className="transition-colors hover:text-foreground">
              Contribute a name
            </Link>
            <span aria-hidden="true" className="text-border">
              ·
            </span>
            <a
              href="mailto:abdulhafizaderemi@gmail.com"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </nav>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground/70 sm:text-left">
          All name meanings are curated by human experts. AI is used only as an
          assistant — no AI-generated content is published without review.
        </p>
      </div>
    </footer>
  )
}
