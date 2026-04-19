'use server'

import { z } from 'zod'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { ContributionSubmission } from '@/lib/types'

// ── Schema ──────────────────────────────────────────────────────────────────

const contributionSchema = z.object({
  submitted_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be 60 characters or fewer')
    .trim(),
  suggested_mapping: z
    .string()
    .max(120, 'Suggested mapping must be 120 characters or fewer')
    .trim(),
  user_notes: z
    .string()
    .max(500, 'Notes must be 500 characters or fewer')
    .trim(),
})

// ── State type ───────────────────────────────────────────────────────────────

export type ContributeState = {
  status: 'idle' | 'success' | 'error'
  errors?: {
    submitted_name?: string[]
    suggested_mapping?: string[]
    user_notes?: string[]
  }
  message?: string
}

// ── Action ───────────────────────────────────────────────────────────────────

const PENDING_FILE = path.join(process.cwd(), 'data', 'pending-contributions.json')

export async function submitContribution(
  _prevState: ContributeState,
  formData: FormData
): Promise<ContributeState> {
  const raw = {
    submitted_name: formData.get('submitted_name'),
    suggested_mapping: formData.get('suggested_mapping'),
    user_notes: formData.get('user_notes'),
  }

  // Validate
  const parsed = contributionSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      status: 'error',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const { submitted_name, suggested_mapping, user_notes } = parsed.data

  // Build submission record
  const submission: ContributionSubmission = {
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    submitted_name,
    suggested_mapping,
    user_notes,
    status: 'pending',
    reviewer_notes: null,
    submitted_at: new Date().toISOString(),
  }

  // Read → append → write
  try {
    const raw = await fs.readFile(PENDING_FILE, 'utf-8')
    const existing: ContributionSubmission[] = JSON.parse(raw)
    existing.push(submission)
    await fs.writeFile(PENDING_FILE, JSON.stringify(existing, null, 2), 'utf-8')
  } catch {
    return {
      status: 'error',
      message: 'Failed to save your submission. Please try again.',
    }
  }

  return { status: 'success' }
}
