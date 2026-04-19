import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

const CONFIG: Record<
  NonNullable<Category>,
  { label: string; icon: string; classes: string }
> = {
  'asmaul-husna': {
    label: "Asma'ul Husna",
    icon: '☽',
    classes:
      'bg-violet-500/10 text-violet-700 border-violet-500/20 dark:text-violet-400 dark:border-violet-500/30',
  },
  prophet: {
    label: 'Prophet name',
    icon: '✦',
    classes:
      'bg-sky-500/10 text-sky-700 border-sky-500/20 dark:text-sky-400 dark:border-sky-500/30',
  },
  companion: {
    label: 'Companion name',
    icon: '◈',
    classes:
      'bg-teal-500/10 text-teal-700 border-teal-500/20 dark:text-teal-400 dark:border-teal-500/30',
  },
  classical: {
    label: 'Classical Arabic',
    icon: '◇',
    classes:
      'bg-stone-500/10 text-stone-700 border-stone-500/20 dark:text-stone-400 dark:border-stone-500/30',
  },
  quranic: {
    label: "Qur'anic name",
    icon: '◉',
    classes:
      'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
  },
}

interface CategoryBadgeProps {
  category: Category | null
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  if (!category) return null
  const { label, icon, classes } = CONFIG[category]

  return (
    <span
      aria-label={`Category: ${label}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        classes,
        className
      )}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  )
}
