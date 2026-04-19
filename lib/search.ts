import type { CanonicalName, NameVariant, SearchResult } from '@/lib/types'
import { normalize, similarity } from '@/lib/normalize'
import canonicalNamesData from '@/data/canonical-names.json'
import variantsData from '@/data/variants.json'

const canonicalNames = canonicalNamesData as CanonicalName[]
const variants = variantsData as NameVariant[]

/**
 * Build lookup maps for O(1) access.
 * These are module-level constants — evaluated once at import time.
 */
const canonicalById = new Map<string, CanonicalName>(
  canonicalNames.map((c) => [c.id, c])
)

const variantByNormalized = new Map<string, NameVariant>(
  variants.map((v) => [v.normalized_variant, v])
)

/** Fuzzy match threshold — similarity must be above this to be considered */
const FUZZY_THRESHOLD = 0.7

/**
 * Search for a Yorùbá name variant and return the best canonical match.
 *
 * Strategy:
 * 1. Normalise the input
 * 2. Try an exact lookup against the normalized_variant index
 * 3. If no exact match, run fuzzy similarity against all variants
 * 4. Return the best match above the threshold, or null
 */
export function search(rawQuery: string): SearchResult | null {
  const query = normalize(rawQuery)

  if (!query) return null

  // ── 1. Exact match ─────────────────────────────────────────────────────────
  const exactVariant = variantByNormalized.get(query)
  if (exactVariant) {
    const canonical = canonicalById.get(exactVariant.canonical_name_id)
    if (canonical) {
      return { canonical, variant: exactVariant, query: rawQuery }
    }
  }

  // ── 2. Fuzzy match ─────────────────────────────────────────────────────────
  let bestScore = 0
  let bestVariant: NameVariant | null = null

  for (const variant of variants) {
    const score = similarity(query, variant.normalized_variant)
    if (score > bestScore) {
      bestScore = score
      bestVariant = variant
    }
  }

  if (bestScore >= FUZZY_THRESHOLD && bestVariant) {
    const canonical = canonicalById.get(bestVariant.canonical_name_id)
    if (canonical) {
      // Downgrade confidence for fuzzy matches
      const adjustedVariant: NameVariant = {
        ...bestVariant,
        confidence:
          bestVariant.confidence === 'high'
            ? 'medium'
            : bestVariant.confidence,
      }
      return { canonical, variant: adjustedVariant, query: rawQuery }
    }
  }

  return null
}

/** Return all variants (for sample chips, browse, etc.) */
export function getAllVariants(): NameVariant[] {
  return variants
}

/** Return all canonical names */
export function getAllCanonicalNames(): CanonicalName[] {
  return canonicalNames
}
