import type { Metadata } from 'next'
import { ContributeForm } from '@/components/contribute/ContributeForm'
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Contribute a Name',
  description:
    'Suggest a missing Yorùbá Islamic name or correction to help grow this resource.',
}

interface ContributePageProps {
  searchParams: Promise<{ name?: string }>
}

export default async function ContributePage({ searchParams }: ContributePageProps) {
  const { name } = await searchParams
  const initialName = (name ?? '').trim()

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <PencilSimpleIcon weight="duotone" className="size-5" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Contribute
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Suggest a name
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Know a Yorùbá Islamic name that&apos;s missing, or think a mapping is
          incorrect? Submit it here. Every suggestion is reviewed by our team
          before being added.
        </p>
      </div>

      {/* Guidelines callout */}
      <div className="mb-6 rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Good submissions include:</strong>{' '}
          the Yorùbá name as commonly written, the correct Arabic origin (if
          known), and any evidence or reasoning for the mapping. AI-only
          guesses are not sufficient — cite a source or explain the phonology.
        </p>
      </div>

      <ContributeForm initialName={initialName} />
    </div>
  )
}
