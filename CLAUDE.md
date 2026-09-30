# The Small Print — project guide for Claude

The Small Print (thesmallprint.pub) is a bilingual (English/Spanish) publication by
Diana Chiang Jurado (PhD, molecular medicine / cardiology). Each issue takes one real,
peer-reviewed scientific paper in medicine, biomedicine, computational biology or AI and
translates it honestly for curious readers with no scientific training.
Not simplified. Not sensationalized. Readable, with the caveats intact.

Static site built with Astro 6 (Node >=22.12.0), deployed to GitHub Pages via
`.github/workflows/deploy.yml` (custom domain through `public/CNAME`).

## Language with Diana

Diana writes in Spanish. Reply to her in neutral Latin American Spanish, without
voseo (use "tú", not "vos"), unless she asks otherwise. The same convention applies
to the Spanish articles themselves — see "Voice and style" below.

## Where things live

- `src/content/articles/` — English articles (`.md`)
- `src/content/articles-es/` — Spanish articles (`.md`)
- `src/content.config.ts` — shared frontmatter schema for both collections
- `src/pages/articles/[slug].astro` and `[slug]-pdf.astro` — article page and print/PDF version (EN)
- `src/pages/es/...` — Spanish equivalents (`articulos/`, `acerca-de`, `autora`)
- `src/pages/impressum*.astro`, `datenschutz*.astro` — German legal pages (DDG § 5 / GDPR). Do not change without Diana's explicit request.
- `public/images/articles/issueNN/` — hero images, one per language
- `zenodo/` — standalone tool (own `package.json`, run `npm install` inside it once) to mint a DOI per article; see `zenodo/README.md` for the full workflow and pre-publish checklist
- `docs/` — editorial briefs and drafts (not published)

## Commands

- `npm run dev` — local server at localhost:4321
- `npm run build` — build to `./dist/`. Run this after any change and fix errors before calling a task done.
- `npm run preview` — preview the build

## Article files

- Filename / slug: `issue-NN-<slug-in-that-language>.md` (e.g. `issue-01-is-coffee-good-for-your-heart.md`,
  `issue-01-le-hace-bien-el-cafe-a-tu-corazon.md`).
- `translationSlug` in each file points to the sibling-language filename (no extension).
- The homepage automatically features the article with the highest `issue` number (by the
  number inside the string, e.g. "Issue 02" > "Issue 01") — no flag to flip by hand.
- Frontmatter conventions (copy issue 01 as the template):
  - `date`: "August 2026" / "Agosto 2026"
  - `issue`: "Issue 01" / "Edición 01"
  - `topic`, `readTime` ("10 min"), `image`, `imageAlt`, `tags`
  - `paperTitle`, `paperAuthors` ("Surname AB, Surname CD, ..."; for papers with more than 6
    authors, list the first 6 followed by "et al.", the Vancouver/ICMJE convention), `paperJournal`,
    `paperYear`, `paperDOI`, `paperURL`
  - `theSmallPrint`: the § section as flowing prose, paragraphs separated by a blank line
  - `articleDOI`: only after Diana creates the Zenodo deposit. Never invent one.

## Article structure (as used in issue 01)

1. `## What the study found` (or "What the review article found")
   - Opens with 1 paragraph of plain-language context the reader needs.
   - Then `###` subsections whose headings are **mini-conclusions**, not topics
     (e.g. "Filtering coffee prevents it from raising your cholesterol").
2. `## Why it matters: <short angle>`
3. `## What it does not prove` — causation vs association, limits of the design, what remains open.
4. `theSmallPrint` frontmatter — the nuance, the honest interpretation, what headlines will get wrong.

Spanish headings: "Qué encontró el estudio", "Por qué importa: ...", "Lo que no demuestra".

## Voice and style

- Write for a smart reader who has never read a methods section. Define every technical term
  inline the first time, in plain words (e.g. what systolic pressure is, what a randomized trial does).
- Explain *how* a finding was obtained, because that is what tells the reader how much to trust it.
- Give real numbers from the paper, with units, and say what they mean.
- Name what the authors themselves concede. Don't hide counterpoints.
- Calm, precise, warm. No hype, no clickbait, no moralizing, no exclamation marks.
- Prefer commas, colons and full stops over em dashes in article prose.
- Short paragraphs; one idea each.
- Spanish is a natural rewrite for Latin American readers, not a literal translation.
  Use neutral Latin American Spanish, without voseo (tuteo is fine: "tú tomas café",
  never "vos tomás café"). Use decimal comma in Spanish (0,39) and decimal point in English (0.39).

## Accuracy rules (non-negotiable)

- Every number, claim and quote must come from the paper itself. If unsure, mark it
  `[VERIFY]` and tell Diana instead of guessing.
- Verify author lists, DOI and year against the paper before publishing.
- Respect the paper's license when reusing figures; credit them.
- Never publish a Zenodo deposit: DOIs are permanent. Only prepare drafts; Diana publishes.

## Git

- Small, descriptive commits. Don't push or deploy unless Diana asks.
