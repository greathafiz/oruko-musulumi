export type Confidence = "high" | "medium" | "low"

export type Category =
  | "asmaul-husna"
  | "prophet"
  | "companion"
  | "classical"
  | "quranic"

export interface CanonicalName {
  id: string
  /** Arabic script — e.g. "عَبْدُ السَّمِيع" */
  arabic_name: string
  /** Romanised scholarly transliteration — e.g. "ʿAbd al-Samīʿ" */
  transliteration: string
  /** Lay English pronunciation guide — e.g. "abd-us-sa-MEE" */
  pronunciation_en: string
  /** Theologically accurate meaning */
  meaning: string
  category: Category | null
  /** Optional notes on root, etymology, or Islamic context */
  origin_notes: string | null
}

export interface NameVariant {
  id: string
  input_variant: string
  normalized_variant: string
  canonical_name_id: string
  yoruba_pronunciation: string
  confidence: Confidence
  adaptation_notes: string | null
}

export interface ContributionSubmission {
  id: string
  submitted_name: string
  suggested_mapping: string
  user_notes: string
  status: "pending" | "approved" | "rejected"
  reviewer_notes: string | null
  submitted_at: string // ISO date string
}

export interface SearchResult {
  canonical: CanonicalName
  variant: NameVariant
  query: string
}
