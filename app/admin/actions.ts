"use server"

import { z } from "zod"
import { promises as fs } from "node:fs"
import path from "node:path"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { ContributionSubmission, NameVariant } from "@/lib/types"
import { normalize } from "@/lib/normalize"

// ── Paths ────────────────────────────────────────────────────────────────────

const PENDING_FILE = path.join(
  process.cwd(),
  "data",
  "pending-contributions.json",
)
const VARIANTS_FILE = path.join(process.cwd(), "data", "variants.json")

// ── Auth guard ───────────────────────────────────────────────────────────────

async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  const secret = process.env.ADMIN_SECRET
  if (!secret || token !== secret) {
    redirect("/admin/login")
  }
}

// ── Login action ─────────────────────────────────────────────────────────────

export type LoginState = { error?: string }

export async function adminLogin(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const entered = formData.get("password") as string
  const secret = process.env.ADMIN_SECRET

  if (!secret || entered !== secret) {
    return { error: "Incorrect password." }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_token", secret, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  })

  redirect("/admin")
}

// ── Approve action ────────────────────────────────────────────────────────────

const approveSchema = z.object({
  submission_id: z.string(),
  canonical_name_id: z.string().min(1, "Canonical name ID is required"),
  yoruba_pronunciation: z.string().default(""),
  confidence: z.enum(["high", "medium", "low"]).default("medium"),
})

export async function approveSubmission(
  _prev: unknown,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin()

  console.log({ formData })

  const result = approveSchema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    const fieldErrors = z.treeifyError(result.error).properties

    return {
      error:
        fieldErrors?.canonical_name_id?.errors[0] ||
        fieldErrors?.yoruba_pronunciation?.errors[0] ||
        fieldErrors?.confidence?.errors[0] ||
        fieldErrors?.submission_id?.errors[0] ||
        "An error occurred while approving the submission.",
    }
  }

  const { submission_id, canonical_name_id, yoruba_pronunciation, confidence } =
    result.data

  // Read pending submissions
  const pendingRaw = await fs.readFile(PENDING_FILE, "utf-8")
  const pending: ContributionSubmission[] = JSON.parse(pendingRaw)
  const submission = pending.find((s) => s.id === submission_id)

  if (!submission) return { error: "Submission not found." }

  // Build new variant
  const newVariant: NameVariant = {
    id: `v-${Date.now()}`,
    input_variant: submission.submitted_name,
    normalized_variant: normalize(submission.submitted_name),
    canonical_name_id,
    yoruba_pronunciation,
    confidence,
    adaptation_notes:
      submission.user_notes ||
      `Approved from community submission on ${new Date().toLocaleDateString()}.`,
  }

  // Append to variants.json
  const variantsRaw = await fs.readFile(VARIANTS_FILE, "utf-8")
  const variants: NameVariant[] = JSON.parse(variantsRaw)
  variants.push(newVariant)
  await fs.writeFile(VARIANTS_FILE, JSON.stringify(variants, null, 2), "utf-8")

  // Remove from pending
  const updated = pending.filter((s) => s.id !== submission_id)
  await fs.writeFile(PENDING_FILE, JSON.stringify(updated, null, 2), "utf-8")

  redirect("/admin")
}

// ── Reject action ─────────────────────────────────────────────────────────────

export async function rejectSubmission(
  _prev: unknown,
  formData: FormData,
): Promise<{ error?: string }> {
  await requireAdmin()

  const submission_id = formData.get("submission_id") as string

  const pendingRaw = await fs.readFile(PENDING_FILE, "utf-8")
  const pending: ContributionSubmission[] = JSON.parse(pendingRaw)
  const updated = pending.filter((s) => s.id !== submission_id)
  await fs.writeFile(PENDING_FILE, JSON.stringify(updated, null, 2), "utf-8")

  redirect("/admin")
}
