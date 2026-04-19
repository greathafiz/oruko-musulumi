'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitContribution, type ContributeState } from '@/app/contribute/actions'
import { cn } from '@/lib/utils'
import { CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react'
import Link from 'next/link'

// ── Submit button (reads pending state from nearest form) ──────────────────

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      id="contribute-submit-button"
      disabled={pending}
      className={cn(
        'w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground',
        'transition-all hover:bg-primary/80 active:scale-[0.98]',
        'disabled:cursor-not-allowed disabled:opacity-50'
      )}
    >
      {pending ? 'Submitting…' : 'Submit suggestion'}
    </button>
  )
}

// ── Field helper ─────────────────────────────────────────────────────────────

function Field({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string
  id: string
  error?: string[]
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && error.length > 0 && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error[0]}
        </p>
      )}
    </div>
  )
}

// ── Input / Textarea shared styles ───────────────────────────────────────────

const inputClass = cn(
  'w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground',
  'placeholder:text-muted-foreground/50 outline-none',
  'transition-shadow focus:border-ring/50 focus:ring-[3px] focus:ring-ring/20',
  'aria-invalid:border-destructive aria-invalid:ring-destructive/20'
)

// ── Main form component ───────────────────────────────────────────────────────

interface ContributeFormProps {
  initialName?: string
}

const initialState: ContributeState = { status: 'idle' }

export function ContributeForm({ initialName = '' }: ContributeFormProps) {
  const [state, action] = useActionState(submitContribution, initialState)

  if (state.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-10 text-center"
      >
        <CheckCircleIcon
          weight="duotone"
          className="size-10 text-emerald-500"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-foreground">
            Thank you for your contribution!
          </h2>
          <p className="text-sm text-muted-foreground">
            Your suggestion has been saved and will be reviewed by our team before being added.
          </p>
        </div>
        <Link
          href="/"
          className="mt-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Back to search
        </Link>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      {/* Top-level error message */}
      {state.status === 'error' && state.message && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3"
        >
          <WarningCircleIcon
            weight="duotone"
            className="mt-0.5 size-4 shrink-0 text-destructive"
            aria-hidden="true"
          />
          <p className="text-sm text-destructive">{state.message}</p>
        </div>
      )}

      <Field
        label="Yorùbá name"
        id="submitted_name"
        error={state.errors?.submitted_name}
        required
      >
        <input
          id="submitted_name"
          name="submitted_name"
          type="text"
          defaultValue={initialName}
          required
          autoComplete="off"
          placeholder="e.g. Abdulsemiu"
          aria-describedby={
            state.errors?.submitted_name ? 'submitted_name-error' : undefined
          }
          aria-invalid={!!state.errors?.submitted_name}
          className={inputClass}
        />
      </Field>

      <Field
        label="Suggested Arabic name or mapping"
        id="suggested_mapping"
        error={state.errors?.suggested_mapping}
      >
        <input
          id="suggested_mapping"
          name="suggested_mapping"
          type="text"
          placeholder="e.g. ʿAbd al-Samīʿ"
          aria-describedby={
            state.errors?.suggested_mapping ? 'suggested_mapping-error' : undefined
          }
          aria-invalid={!!state.errors?.suggested_mapping}
          className={inputClass}
        />
      </Field>

      <Field
        label="Notes or reasoning"
        id="user_notes"
        error={state.errors?.user_notes}
      >
        <textarea
          id="user_notes"
          name="user_notes"
          rows={4}
          placeholder="Why do you think this is the correct mapping? Any linguistic or historical context is helpful."
          aria-describedby={
            state.errors?.user_notes ? 'user_notes-error' : undefined
          }
          aria-invalid={!!state.errors?.user_notes}
          className={cn(inputClass, 'resize-y')}
        />
      </Field>

      <p className="text-xs text-muted-foreground">
        <span className="text-destructive" aria-hidden="true">* </span>
        Required field. No submission is published without expert review.
      </p>

      <SubmitButton />
    </form>
  )
}
