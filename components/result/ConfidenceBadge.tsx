import type { Confidence } from '@/lib/types'
import { cn } from '@/lib/utils'

const CONFIG: Record<
  Confidence,
  { label: string; classes: string; tooltip: string }
> = {
  high: {
    label: 'High confidence',
    classes:
      'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30',
    tooltip:
      'This name was found as an exact match in our curated variants database.',
  },
  medium: {
    label: 'Medium confidence',
    classes:
      'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
    tooltip:
      'This is a probable match. The name was found via approximate matching — verify before relying on it.',
  },
  low: {
    label: 'Low confidence',
    classes:
      'bg-rose-500/10 text-rose-700 border-rose-500/20 dark:text-rose-400 dark:border-rose-500/30',
    tooltip:
      'Weak match. The name may be a distant variant or spelling. Treat this result with caution.',
  },
}

interface ConfidenceBadgeProps {
  confidence: Confidence
  className?: string
}

export function ConfidenceBadge({ confidence, className }: ConfidenceBadgeProps) {
  const { label, classes, tooltip } = CONFIG[confidence]

  return (
    <span
      role="status"
      aria-label={`Match confidence: ${label}`}
      title={tooltip}
      className={cn(
        'inline-flex cursor-help items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        classes,
        className
      )}
    >
      <span
        className={cn('size-1.5 rounded-full', {
          'bg-emerald-500': confidence === 'high',
          'bg-amber-500': confidence === 'medium',
          'bg-rose-500': confidence === 'low',
        })}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}
