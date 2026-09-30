# Issue 03 brief — PCOS gets a new name: PMOS

Status: brief ready, mostly verified — one source conflict still open (see checklist). Draft not started.
Target: publish before end of October 2026 (after issue 02).
Topic: "Women's health" / "Salud de la mujer"

## Verification checklist — mostly done, open items below

- [x] Main paper title, journal, DOI, license — confirmed via Crossref.
- [x] Companion JAMA IM study — confirmed against the corrected PDF Diana provided.
- [ ] **Unresolved conflict**: duration of the consensus process. ContemporaryOBGYN and National
  Geographic say 14 years; the University of Oulu's own press release says 15 years. Also unclear
  whether support is one blended ~84% figure (Oulu's release) or split 85.6% patients / 76.1%
  professionals (other outlets) — these may be citing different survey questions. Needs the Lancet
  PDF to resolve before drafting; the homepage teaser currently avoids stating a specific number.
- [x] Prevalence "1 in 8" — confirmed directly in the companion JAMA IM letter's own text.
- [x] Published criticism of the rename — confirmed, exists.
- [x] Official Spanish name — confirmed.
- [x] Decided with Diana: list the first 6 of the Lancet paper's 72 authors, then "et al."
  (Vancouver/ICMJE convention, same one The Lancet itself uses).
- [ ] PubMed ID 42119588 — could not confirm or rule out; drop from frontmatter unless resolved.

## The main paper

- Title (confirmed via Crossref): "Polyendocrine metabolic ovarian syndrome, the new name for
  polycystic ovary syndrome: a multistep global consensus process."
- The Lancet, vol. 407, issue 10545, pp. 2329–2339. Published online 12 May 2026.
- DOI: 10.1016/S0140-6736(26)00717-8. Open access, CC BY 4.0.
- 72 authors (global consortium). First author: Helena J. Teede. Terhi Piltonen is among the
  named authors (14th of 14 listed before "and 58 additional co-authors" in the Crossref record);
  press coverage describes her as co-leading the process, but the author list itself does not
  mark formal co-leadership. Decided: `paperAuthors` lists the first 6 + "et al." (Vancouver/
  ICMJE convention) — "Teede HJ, Bahri Khomami M, Morman R, Laven JSE, Joham AE, Costello MF, et al."
- `[VERIFY]` PubMed ID 42119588 — could not confirm or rule out.
- Article type: consensus statement, not an experimental study. Say so clearly.
- Process numbers: 56 organizations, more than 14,300 people with the condition specifically out
  of more than 22,000 total survey respondents (patients + clinicians + researchers combined —
  two different groups, not conflicting numbers), 3-year transition, integration into the 2028
  international guideline update — all corroborated by multiple outlets.
  **Still conflicting, needs the Lancet PDF**: process duration is reported as both 14 years
  (ContemporaryOBGYN, National Geographic) and 15 years (University of Oulu's own press release).
  Support is reported as both a single blended ~84% (Oulu) and a split 85.6% patients / 76.1%
  professionals (other outlets) — possibly different survey questions, not necessarily a real
  conflict, but unconfirmed either way. Do not state a specific duration or a single % in the
  article until this is resolved against the primary text.
- Likely source of the patient/professional survey figures above: Teede HJ, Moran LJ, Morman R,
  et al. "Polycystic ovary syndrome perspectives from patients and health professionals on
  clinical features, current name, and renaming: a longitudinal international online survey."
  EClinicalMedicine. 2025;84:103287 (cited as ref. 3 in the companion JAMA IM letter below).

## Companion study (supporting evidence) — verified against the corrected PDF (see note)

- Piltonen TT, Kuusiniemi E, Teede H, for the WENDY Research Group. "Ovarian Cysts in Polycystic
  Ovary Syndrome." JAMA Intern Med. 2026;186(8):1041–1043.
- Accepted 15 March 2026; published online 11 May 2026. DOI: 10.1001/jamainternmed.2026.1370.
  Open access, CC-BY.
- **Note on the correction**: this letter was corrected on 15 June 2026 (the original online text
  had "with PCOS" and "without" reversed in the Results). The version Diana provided is the
  corrected reprint (August 2026 print issue) — safe to cite. Do not use any copy dated/cached
  before 15 June 2026.
- Prevalence, stated in the letter itself with citation: "The syndrome affects 1 of 8 women,
  about 170 million reproductive-aged women globally and 10 million in the US." Confirms the
  brief's "about 1 in 8" estimate directly from a primary source.
- Extra context worth using in the article: in a global survey of 7,000 respondents, 85% of
  patients and 62% of clinicians wrongly associated PCOS with ovarian cysts — this is the
  misconception the study addresses.
- Cohort: Women's Health Study (WENDY), 1,918 women aged 33–37 enrolled (May 2020–Oct 2022) at
  2 Finnish university clinics; 1,904 included in this analysis (1,591 without PCOS, 313 with
  PCOS, Rotterdam criteria). After excluding hormonal-contraceptive users: 1,235 analyzed
  (1,012 without PCOS, 223 with PCOS). Brief's "nearly 2,000" refers to the recruited/analyzed
  cohort (1,904–1,918); the direct PCOS-vs-no-PCOS comparison uses the smaller n=1,235 subsample
  — use that figure when citing the actual comparison.
- Exact finding (Results, verbatim): "There were no differences between the groups in the
  prevalence of ovarian (dominant) follicles, endometriomas, or simple, paraovarian, hemorrhagic,
  or dermoid cysts." Meanwhile PCOS ovaries did show far more follicles (62.1% vs 12.2% with
  ≥20 follicles, OR 11.8) and larger volume (40.8% vs 5.4% with ≥10 mL, OR 12.2) — both part of
  the diagnostic criteria, not "cysts." Corpus luteum was actually *less* prevalent in the PCOS
  group (27.6% vs 37.2%), consistent with persistent anovulation into the mid-30s.
- Limitations, as stated by the authors: racially homogeneous population (97.6% White European),
  ultrasound performed on random cycle days, by 5 different clinicians.
- Funding: Dr Piltonen reported grants from the Research Council of Finland, Roche and Novo
  Nordisk for WENDY data collection. No other disclosures.

## Working titles

- EN: "The syndrome that was named after something it doesn't have"
  (alt: "Goodbye PCOS: why a name change matters")
- ES: "El síndrome que llevaba el nombre de algo que no tiene"
  (alt: "Adiós, ovario poliquístico: por qué importa un cambio de nombre")

## Opening context

What the condition is in plain words: common hormonal condition (about 1 in 8 women worldwide,
confirmed directly in the companion JAMA IM letter: ~170 million reproductive-aged women globally,
10 million in the US),
irregular or absent ovulation, higher androgens, insulin resistance, higher cardiometabolic risk,
leading cause of infertility. Explain the Rotterdam criteria simply (2 of 3: irregular ovulation,
signs of high androgens, "polycystic" ovary appearance on ultrasound). Explain that the "cysts" are
actually immature follicles, not true cysts.

## What the study found — subsection ideas (mini-conclusions)

1. **The "cysts" in the name were never really cysts** — follicles vs cysts; the JAMA IM finding.
2. **The ovary is only one part of the story** — the syndrome is hormonal and metabolic, whole-body.
3. **A name decided by patients as well as doctors** — a years-long process (sources conflict:
   14 vs 15 years, `[VERIFY]` against the Lancet PDF), 56 patient and professional organizations,
   global surveys and workshops. More than 14,300 people with the condition consulted directly,
   out of more than 22,000 total survey respondents (patients, clinicians and researchers
   combined). Support: reported as both ~84% blended and 85.6% patients / 76.1% professionals
   split — `[VERIFY]` which is accurate before drafting.
4. **What changes, and when** — 3-year transition; guidelines, medical records and research
   classifications; integration into the 2028 international guideline update. Diagnostic criteria
   do not change.

## Why it matters

The authors argue the old name delayed diagnosis and made care inadequate because the condition
wasn't taken seriously, and led women and doctors to focus on the ovaries rather than metabolic and
cardiovascular risk. Connection to Diana's field: cardiometabolic risk. Names shape what gets
screened, funded and researched.

## What it does not prove

- A consensus is expert and patient agreement, not new data on causes or treatment.
- Changing the name does not change the biology, the diagnosis or the treatment.
- No evidence yet that renaming improves diagnosis or outcomes; that will need to be measured in the coming years.
- The companion study: one country, one age group (33–37), cross-sectional; industry co-funding.
- Published criticism of the rename, confirmed: some long-time patient advocates have voiced
  concern about losing the name recognition and visibility PCOS built over decades, and about
  what a sudden name change means for organizations, research databases and communities built
  around the old name. Some patients diagnosed for years also find the switch disorienting.
  Worth a line in the article for balance.

## The Small Print § (ideas)

- Language is a medical tool: a misleading name has consequences for real people.
- What headlines will get wrong: "PCOS no longer exists" or "PCOS was a misdiagnosis".
  It still exists; only the name changed. People already diagnosed don't need a new diagnosis.
- In Spanish: official translation confirmed — "Síndrome Ovárico Metabólico Poliendocrino" (SOMP),
  also referred to as PMOS in Spanish-language coverage. Supported by the Spanish Society of
  Endocrinology and Nutrition (SEEN).

## Frontmatter draft (fill in once approved)

Per `CLAUDE.md`'s conventions, no `articleDOI` until Diana creates the Zenodo deposit.

| Field | Value |
|---|---|
| `issue` | "Issue 03" |
| `topic` | "Women's health" |
| `paperTitle` | Polyendocrine metabolic ovarian syndrome, the new name for polycystic ovary syndrome: a multistep global consensus process |
| `paperAuthors` | "Teede HJ, Bahri Khomami M, Morman R, Laven JSE, Joham AE, Costello MF, et al." |
| `paperJournal` | The Lancet |
| `paperYear` | 2026 |
| `paperDOI` | 10.1016/S0140-6736(26)00717-8 |
| `paperURL` | https://doi.org/10.1016/S0140-6736(26)00717-8 |
| `date`, `readTime`, `tags`, `image`, `imageAlt`, `translationSlug` | TBD — decide when drafting |
