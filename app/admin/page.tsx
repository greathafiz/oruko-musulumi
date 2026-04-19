import { promises as fs } from 'node:fs'
import path from 'node:path'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ContributionSubmission, CanonicalName } from '@/lib/types'
import { approveSubmission, rejectSubmission } from '@/app/admin/actions'
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@phosphor-icons/react/dist/ssr'

// ── Auth check ───────────────────────────────────────────────────────────────

async function getAdminOrRedirect() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const secret = process.env.ADMIN_SECRET
  if (!secret || token !== secret) {
    redirect('/admin/login')
  }
}

// ── Data loaders ─────────────────────────────────────────────────────────────

async function getPending(): Promise<ContributionSubmission[]> {
  const file = path.join(process.cwd(), 'data', 'pending-contributions.json')
  const raw = await fs.readFile(file, 'utf-8')
  return JSON.parse(raw)
}

async function getCanonicals(): Promise<CanonicalName[]> {
  const file = path.join(process.cwd(), 'data', 'canonical-names.json')
  const raw = await fs.readFile(file, 'utf-8')
  return JSON.parse(raw)
}

// ── Confidence badge colours ──────────────────────────────────────────────────

const CONF_CLASSES = {
  high: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  medium: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  low: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminPage() {
  await getAdminOrRedirect()

  const [pending, canonicals] = await Promise.all([getPending(), getCanonicals()])

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Admin — Pending Submissions</h1>
          <p className="text-sm text-muted-foreground">
            Review and approve or reject community contributions.
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm font-medium text-foreground">
          <ClockIcon weight="duotone" className="size-4 text-amber-500" aria-hidden="true" />
          {pending.length} pending
        </span>
      </div>

      {pending.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 py-16 text-center">
          <CheckCircleIcon weight="duotone" className="size-10 text-emerald-500" aria-hidden="true" />
          <p className="text-sm font-medium text-foreground">All caught up!</p>
          <p className="text-xs text-muted-foreground">No pending submissions to review.</p>
        </div>
      )}

      {pending.length > 0 && (
        <ol className="flex flex-col gap-6" aria-label="Pending submissions">
          {pending.map((sub) => (
            <li
              key={sub.id}
              className="rounded-2xl border border-border/60 bg-card p-5 sm:p-6"
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Submitted name
                  </p>
                  <p className="mt-1 text-lg font-bold text-foreground">
                    {sub.submitted_name}
                  </p>
                </div>
                <time
                  dateTime={sub.submitted_at}
                  className="text-xs text-muted-foreground"
                >
                  {new Date(sub.submitted_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
              </div>

              {sub.suggested_mapping && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-muted-foreground/70">
                    Suggested mapping
                  </p>
                  <p className="text-sm text-foreground">{sub.suggested_mapping}</p>
                </div>
              )}

              {sub.user_notes && (
                <div className="mb-5 rounded-xl bg-muted/30 p-3">
                  <p className="text-xs font-medium text-muted-foreground/70">Notes</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {sub.user_notes}
                  </p>
                </div>
              )}

              <form
                action={approveSubmission}
                className="mb-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
              >
                <input type="hidden" name="submission_id" value={sub.id} />
                <p className="mb-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Approve — fill in details
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label
                      htmlFor={`canonical-${sub.id}`}
                      className="text-xs font-medium text-foreground"
                    >
                      Canonical name *
                    </label>
                    <select
                      id={`canonical-${sub.id}`}
                      name="canonical_name_id"
                      required
                      className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-ring/50 focus:ring-[3px] focus:ring-ring/20"
                    >
                      <option value="">— Select canonical name —</option>
                      {canonicals.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.transliteration} ({c.arabic_name}) — {c.meaning.slice(0, 40)}…
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={`pron-${sub.id}`}
                      className="text-xs font-medium text-foreground"
                    >
                      Yorùbá pronunciation
                    </label>
                    <input
                      id={`pron-${sub.id}`}
                      name="yoruba_pronunciation"
                      type="text"
                      placeholder="e.g. Ab-dúl-sé-mi-ù"
                      className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-ring/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={`conf-${sub.id}`}
                      className="text-xs font-medium text-foreground"
                    >
                      Confidence
                    </label>
                    <select
                      id={`conf-${sub.id}`}
                      name="confidence"
                      defaultValue="medium"
                      className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-ring/50"
                    >
                      {(['high', 'medium', 'low'] as const).map((c) => (
                        <option key={c} value={c} className={CONF_CLASSES[c]}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                  <CheckCircleIcon weight="bold" className="size-4" aria-hidden="true" />
                  Approve &amp; publish
                </button>
              </form>

              <form action={rejectSubmission}>
                <input type="hidden" name="submission_id" value={sub.id} />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                >
                  <XCircleIcon weight="bold" className="size-4" aria-hidden="true" />
                  Reject submission
                </button>
              </form>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
