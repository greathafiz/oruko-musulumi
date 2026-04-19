/**
 * Normalises a Yorùbá name input into a canonical form for matching.
 *
 * Steps:
 *  1. Trim whitespace
 *  2. Lowercase
 *  3. Remove Yorùbá tonal diacritics (combining marks + precomposed)
 *  4. Remove punctuation and special characters (apostrophes, hyphens, etc.)
 *  5. Collapse internal whitespace / separators to nothing
 *
 * Example: "Abdul Sémi'u" → "abdulsemiu"
 */
export function normalize(input: string): string {
  return input
    .trim()
    .toLowerCase()
    // Decompose precomposed characters (e.g. é → e + combining acute)
    .normalize('NFD')
    // Strip all combining diacritical marks (Unicode category Mn)
    .replace(/[\u0300-\u036f]/g, '')
    // Remove apostrophes, hyphens, dots, underscores
    .replace(/['\-._]/g, '')
    // Remove any remaining non-alphanumeric characters (except spaces temporarily)
    .replace(/[^a-z0-9\s]/g, '')
    // Collapse all whitespace / separators
    .replace(/\s+/g, '')
}

/**
 * Levenshtein distance between two strings.
 * Used as a fallback similarity metric for fuzzy matching.
 */
export function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  // Use a single row DP approach for memory efficiency
  const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i)

  for (let i = 1; i <= m; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= n; j++) {
      const temp = dp[j]
      dp[j] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, dp[j], dp[j - 1])
      prev = temp
    }
  }

  return dp[n]
}

/**
 * Similarity score in [0, 1] — 1 means identical after normalisation.
 * Uses normalised Levenshtein distance.
 */
export function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length)
  if (maxLen === 0) return 1
  return 1 - levenshtein(a, b) / maxLen
}
