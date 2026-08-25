# Zenodo deposits for The Small Print

Generates Zenodo metadata for each article and, optionally, creates the deposit
(draft) via the Zenodo API, to get an individual DOI per article.

⚠️ **DOIs are permanent.** Once a deposit is published on Zenodo, the DOI cannot be
deleted or reassigned — at most you can upload a new version. That's why the script
never publishes automatically: it only creates/updates a **draft**, and publishing
requires passing `--publish` and also confirming interactively by typing `PUBLISH`.

## 1. One-time setup

### Install dependencies

```bash
cd zenodo
npm install
```

### Get a Zenodo token

1. Log into your personal Zenodo account (not an institutional one) → **Applications**
   → **Personal access tokens** → **New token**.
2. Check the `deposit:write` and `deposit:actions` scopes.
3. Copy the token (Zenodo only shows it once) and export it in your terminal:

```bash
export ZENODO_TOKEN="your-token-here"
```

Recommended: test everything against **sandbox.zenodo.org** first, a separate testing
environment with its own token (obtained the same way, but from
https://sandbox.zenodo.org). Use the `--sandbox` flag in the script to point there.

### Create the "The Small Print" Community

1. On Zenodo (personal account) → **Communities** → **New community**.
2. Identifier: `the-small-print` (must exactly match the value used in
   `metadata-template.json` under `communities[0].identifier`).
3. Display name: "The Small Print". Short description of the editorial project.
4. You don't need to manually curate/approve deposits if you're the only one
   depositing, but you can leave that option on if you'd rather review before a
   deposit gets associated with the community.

### Fill in your ORCID in the template

Edit `zenodo/metadata-template.json` and replace `<ORCID>` with your real ORCID iD
(format `0000-0000-0000-0000`). If you don't have one, get one free at
https://orcid.org/register. It's a fixed value — filled in once here, not per article.

## 2. Generate metadata for an article

```bash
node generate-metadata.js ../src/content/articles/issue-01-is-coffee-good-for-your-heart.md
```

This reads the article's frontmatter and writes
`zenodo/output/issue-01-is-coffee-good-for-your-heart.en.json` with metadata ready
for Zenodo.

Field mapping:

| Article frontmatter | Zenodo field |
|---|---|
| `title` | `title` |
| `deck` + editorial independence notice | `description` |
| `tags` (or `topic` if there are no `tags`) | `keywords` |
| `paperDOI` | `related_identifiers` — `references` relation |
| Article URL on the site (computed) | `related_identifiers` — `isVariantFormOf` relation |
| Article's folder (`articles/` or `articles-es/`) or explicit `language` in the frontmatter | `language` |

The rest of the fields (`upload_type`, `creators`, `license`, `communities`, etc.)
come fixed from `metadata-template.json`.

### The version in the other language (`isTranslationOf`)

Once you've published the English (or Spanish) version of an article and have its
DOI, pass it in when generating the other version to declare the `isTranslationOf`
relation:

```bash
node generate-metadata.js ../src/content/articles-es/issue-01-le-hace-bien-el-cafe-a-tu-corazon.md \
  --translation-doi 10.5281/zenodo.1234567
```

### Other useful options

```bash
# Exact publication date (the frontmatter only has "August 2026", not the day)
node generate-metadata.js ../src/content/articles/issue-01-is-coffee-good-for-your-heart.md --date 2026-08-25

# Where to write the generated JSON
node generate-metadata.js ../src/content/articles/issue-01-is-coffee-good-for-your-heart.md --out /tmp/meta.json
```

The script will warn in the console (⚠) if it couldn't guess the publication date or
if the ORCID is still the placeholder — it doesn't fail, but you should check it
before depositing.

## 3. Create the (draft) deposit on Zenodo

```bash
node generate-metadata.js ../src/content/articles/issue-01-is-coffee-good-for-your-heart.md \
  --deposit \
  --pdf ../path/to/article.pdf \
  --sandbox
```

This creates a new deposit in **draft** mode, uploads the generated metadata, uploads
the PDF, and returns the link to the draft on Zenodo so you can review it by hand.
Drop `--sandbox` when you want to do it against the real Zenodo.

**The deposit is NEVER published at this step.** It stays an editable draft until you
run the command again with `--publish`.

## 4. Publish (irreversible)

```bash
node generate-metadata.js ../src/content/articles/issue-01-is-coffee-good-for-your-heart.md \
  --deposit --publish \
  --pdf ../path/to/article.pdf
```

The script will:
1. Create/update the draft just like in step 3.
2. Show a warning that publishing is permanent, with the link to the draft.
3. Ask you to type `PUBLISH` literally to confirm. Anything else cancels — the draft
   stays intact and you can publish it later by hand from the Zenodo dashboard.

## 5. What to check before publishing (checklist)

Before typing `PUBLISH`, review the draft on Zenodo (the link the script prints) and
confirm:

- [ ] **Title** matches the article's exactly.
- [ ] **ORCID** is yours, not the placeholder.
- [ ] **Description** reads well and ends with the editorial independence line.
- [ ] **License**: CC BY 4.0.
- [ ] **Keywords** are reasonable (if the article had no `tags`, it will have fallen
      back to a single generic keyword from `topic` — consider adding `tags` to the
      frontmatter before depositing).
- [ ] **`related_identifiers`**: the original paper's DOI resolves correctly on
      doi.org, and the article's URL on the site is live in production (not
      localhost) and works.
- [ ] If applicable, the `isTranslationOf` DOI is correct and resolves.
- [ ] **`publication_date`** is the real date, not a date guessed by the script
      (check the ⚠ warning in the console).
- [ ] **Attached PDF** is the final version of the article, not a draft.
- [ ] **Community**: "The Small Print" shows up.
- [ ] **Language**: `eng` for English articles, `spa` for Spanish.

## 6. Show the DOI on the site

Once published, Zenodo gives you a DOI (e.g. `10.5281/zenodo.1234567`). Add it to the
article's frontmatter as `articleDOI`, then commit and push:

```yaml
articleDOI: "10.5281/zenodo.1234567"
```

The article page automatically shows a "Cite this article" box with the official
Zenodo DOI badge once this field is set — no other code changes needed.

## Environment variables

| Variable | What it's for | Default |
|---|---|---|
| `ZENODO_TOKEN` | Authentication with the Zenodo API | — (required for `--deposit`) |
| `SITE_URL` | Base for building the article URL (`isVariantFormOf`) | `https://thesmallprint.pub` |
