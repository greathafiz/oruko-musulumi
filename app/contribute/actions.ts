"use server"
import { z } from "zod"
import type { ContributionSubmission } from "@/lib/types"
import { neon } from "@neondatabase/serverless"

// ── Schema ──────────────────────────────────────────────────────────────────

const contributionSchema = z.object({
  submitted_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be 60 characters or fewer")
    .trim(),
  suggested_mapping: z
    .string()
    .max(120, "Suggested mapping must be 120 characters or fewer")
    .trim(),
  user_notes: z
    .string()
    .max(500, "Notes must be 500 characters or fewer")
    .trim(),
})

// ── State type ───────────────────────────────────────────────────────────────

export type ContributeState = {
  status: "idle" | "success" | "error"
  errors?: {
    submitted_name?: string[]
    suggested_mapping?: string[]
    user_notes?: string[]
  }
  message?: string
}

// ── Action ───────────────────────────────────────────────────────────────────

export async function submitContribution(
  _prevState: ContributeState,
  formData: FormData,
): Promise<ContributeState> {
  const raw = {
    submitted_name: formData.get("submitted_name"),
    suggested_mapping: formData.get("suggested_mapping"),
    user_notes: formData.get("user_notes"),
  }

  const parsed = contributionSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      status: "error",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const { submitted_name, suggested_mapping, user_notes } = parsed.data

  const submission: ContributionSubmission = {
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    submitted_name,
    suggested_mapping,
    user_notes,
    status: "pending",
    reviewer_notes: null,
    submitted_at: new Date().toISOString(),
  }

  try {
    const sql = neon(`${process.env.DATABASE_URL}`)

    await sql`
  INSERT INTO pending_contributions (
    id,
    submitted_name,
    suggested_mapping,
    user_notes,
    status,
    reviewer_notes,
    submitted_at
  )
  VALUES (
    ${submission.id},
    ${submission.submitted_name},
    ${submission.suggested_mapping},
    ${submission.user_notes},
    ${submission.status},
    ${submission.reviewer_notes},
    ${submission.submitted_at}
  )
`

    return {
      status: "success",
      message: "Submission saved successfully",
    }
  } catch (error) {
    console.error("Database error:", error)
    return {
      status: "error",
      message: "Failed to save your submission. Please try again.",
    }
  }
}
