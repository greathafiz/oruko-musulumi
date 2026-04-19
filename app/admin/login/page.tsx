'use client'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { adminLogin, type LoginState } from '@/app/admin/actions'
import { LockKeyIcon } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/80 disabled:opacity-50"
    >
      {pending ? 'Checking…' : 'Sign in'}
    </button>
  )
}

const initial: LoginState = {}

export default function AdminLoginPage() {
  const [state, action] = useActionState(adminLogin, initial)

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <LockKeyIcon weight="duotone" className="size-8 text-primary" aria-hidden="true" />
          <h1 className="text-lg font-bold text-foreground">Admin access</h1>
          <p className="text-sm text-muted-foreground">
            Enter the admin password to review pending submissions.
          </p>
        </div>

        <form action={action} className="flex flex-col gap-4">
          {state.error && (
            <p role="alert" className="text-center text-sm text-destructive">
              {state.error}
            </p>
          )}
          <input
            id="admin-password-input"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            className={cn(
              'w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm text-foreground',
              'placeholder:text-muted-foreground/50 outline-none',
              'focus:border-ring/50 focus:ring-[3px] focus:ring-ring/20',
              state.error && 'border-destructive'
            )}
          />
          <SubmitButton />
        </form>
      </div>
    </div>
  )
}
