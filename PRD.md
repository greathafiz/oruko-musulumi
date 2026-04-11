# Product Requirements Document (PRD)

## Product Name - Orúkọ Mùsùlùmí (Name of Muslims)

## 1. Problem Statement

Across Yorubaland and the Yoruba Muslim diaspora, many Islamic names have been **phonologically adapted** into Yoruba forms through centuries of oral transmission. While culturally accepted, this has led to:

- Confusion about the **original Arabic name**
- Uncertainty about the **true Islamic meaning**
- Errors in official documents (passports, certificates)
- Difficulty teaching correct name meanings in Islamic education

Existing baby-name or Islamic-name websites:

- Do not account for **Yoruba-specific adaptations**
- Often give incorrect or oversimplified meanings
- Do not explain _why_ the Yoruba form exists

There is currently **no authoritative, culturally-aware tool** that bridges Yoruba name forms back to their authentic Arabic origins.

---

## 2. Product Vision

To become the **trusted reference platform** for understanding the relationship between Yoruba-adapted Islamic names and their authentic Arabic forms — linguistically, culturally, and religiously.

The product prioritises:

- Accuracy over breadth
- Transparency over certainty
- Cultural respect over automation

---

## 3. Target Users

### Primary Users

- Yoruba Muslims (Nigeria & diaspora)
- Parents researching baby names
- Adults validating their given names
- Islamic teachers / Imams

### Secondary Users

- Schools & madrassahs
- Researchers (linguistics, Islamic studies)
- Developers (via future API access)

---

## 4. Core Use Case (MVP)

**As a user**, I want to enter a Yoruba name and:

- See the most likely original Arabic name
- Understand its authentic meaning
- Learn why the Yoruba form exists
- Know how confident the mapping is

So that I can trust and understand my name (or another person’s name) correctly.

---

## 5. User Flow (MVP)

1. User visits the web app
2. Enters a name (e.g. `Abdulsemiu`)
3. Clicks **Search**
4. Results page displays:
   - Correct Arabic form (Arabic script)
   - Transliteration
   - Meaning
   - Origin / category (if available)
   - Explanation of Yoruba adaptation
   - Confidence indicator

Optional secondary action:

- "Suggest a correction" / "Contribute a variant"

---

## 6. Functional Requirements

### 6.1 Name Search & Matching

#### Input

- Free-text name input
- Accepts multiple spellings, cases, separators, tone marks

#### Processing Steps

1. **Normalisation**
2. **Exact match lookup**
3. **Fuzzy match lookup (fallback)**
4. **Candidate ranking & selection**

#### Output

- Single best match (MVP)
- Clear indication if the match is probabilistic

---

### 6.2 Name Normalisation Rules

Normalisation converts user input into a canonical form for matching.

Includes:

- Lowercasing
- Trimming whitespace
- Removing punctuation & special characters
- Standardising separators (space → hyphen)
- Removing Yoruba tone marks

**Example:**

```ts
"Abdul Semi’u" → "abdul-semiu"
```

---

### 6.3 Matching Logic

#### Exact Matching

- Match against pre-curated variant records
- Returns **High confidence** results

#### Fuzzy Matching

- Activated when no exact match exists
- Uses string similarity and known linguistic patterns
- Returns **Medium or Low confidence** results

---

### 6.4 Results Display

Each result should include:

1. **Arabic Canonical Name**
   - Arabic script
   - Transliteration

2. **Pronunciation**
   - Audio pronunciation for both the correct Arabic form of the name

3. **Meaning**
   - Theologically accurate
   - Concise

4. **Origin / Category** (optional for MVP)
   - Asma’ul Husna compound
   - Prophet name
   - Companion name
   - Classical Arabic name

5. **Yoruba Adaptation Explanation**
   - Short linguistic explanation
   - Focus on phonology and oral transmission

6. **Confidence Indicator**
   - High / Medium / Low
   - Short tooltip explanation

Each result should include:

1. **Arabic Canonical Name**
   - Arabic script
   - Transliteration

2. **Meaning**
   - Theologically accurate
   - Concise

3. **Origin / Category** (optional for MVP)
   - Asma’ul Husna compound
   - Prophet name
   - Companion name
   - Classical Arabic name

4. **Yoruba Adaptation Explanation**
   - Short linguistic explanation
   - Focus on phonology and oral transmission

5. **Confidence Indicator**
   - High / Medium / Low
   - Short tooltip explanation

---

## 7. Data Model (High-Level)

### 7.1 Canonical Names Table

Stores authoritative Arabic data.

Fields:

- `id`
- `arabic_name`
- `transliteration`
- `pronunciation_en` _(text-based phonetic pronunciation)_
- `meaning`
- `category`
- `origin_notes`

Stores authoritative Arabic data.

Fields:

- `id`
- `arabic_name`
- `transliteration`
- `meaning`
- `category`
- `origin_notes`

---

### 7.2 Variants Table

Maps Yoruba-adapted forms to canonical names.

Fields:

- `id`
- `input_variant`
- `normalized_variant`
- `canonical_name_id`
- `yoruba_pronunciation` _(text-based phonetic guide)_
- `confidence`
- `notes`

Maps Yoruba-adapted forms to canonical names.

Fields:

- `id`
- `input_variant`
- `normalized_variant`
- `canonical_name_id`
- `confidence`
- `notes`

---

### 7.3 Contribution Submissions Table

Stores user-suggested data pending review.

Fields:

- `id`
- `submitted_name`
- `suggested_mapping`
- `user_notes`
- `status` (pending / approved / rejected)
- `reviewer_notes`

---

## 8. Crowdsourcing & Contributions (MVP+)

### 8.1 Contribution Entry Points

Users can:

- Suggest a missing name
- Suggest a correction
- Propose an alternative mapping

Accessible via:

- Result page CTA
- Dedicated "Contribute" page

---

### 8.2 Contribution Workflow

1. User submits a suggestion
2. Entry stored as **Pending**
3. Admin reviews submission
4. Admin either:
   - Approves (adds to variants table)
   - Rejects (with reason)

No user submission is auto-published.

---

### 8.3 Trust & Safety

- No anonymous edits to core data
- Admin-only write access to canonical names
- AI suggestions must be reviewed before approval

---

## 9. Role of AI

### AI Is Used For

- Name normalisation assistance
- Suggesting possible canonical matches
- Generating Yoruba adaptation explanations

### AI Is NOT Used For

- Determining religious meanings
- Creating canonical Arabic data
- Publishing results without verification

AI acts as an **assistant**, not an authority.

---

## 10. Non-Functional Requirements

- Fast response time (<500ms for cached results)
- Mobile-first UI
- Accessible language (no heavy jargon)
- High reliability and correctness

---

## 11. Out of Scope (MVP)

- Full Qur’an or Hadith citations
- Multiple competing matches display
- User accounts & profiles
- Payments or monetisation

---

## 12. Success Metrics

- Successful searches per day
- % of searches returning high-confidence matches
- Number of approved community contributions
- Time spent on result pages

---

## 13. Risks & Mitigations

### Risk: Incorrect religious data

- Mitigation: Manual curation + admin review

### Risk: Over-reliance on AI

- Mitigation: AI never publishes directly

### Risk: Scope creep

- Mitigation: Strict MVP boundaries

---

## 14. Future Enhancements

- API access for third-party apps
- PDF name certificates
- Multilingual explanations (Yoruba / Arabic / English)
- Expanded West African name mappings

- API access for third-party apps
- PDF name certificates
- Multilingual explanations (Yoruba / Arabic / English)
- Expanded West African name mappings

---

## 15. MVP Summary

This product delivers a **focused, trustworthy tool** that:

- Maps Yoruba Islamic names to authentic Arabic origins
- Explains cultural adaptations clearly
- Uses AI responsibly
- Scales through controlled community contributions

The MVP prioritises **credibility first, growth second**.
