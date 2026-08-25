<p align="center">
  <img src="public/logo.png" alt="The Small Print" width="360">
</p>

<p align="center"><em>A scientific publication for general readers, designed with the editorial experience of a scientific journal.</em></p>

[thesmallprint.pub](https://thesmallprint.pub) is a bilingual (English/Spanish) publication
that takes real scientific studies in medicine, biomedicine, and computational biology, and translates them
honestly for curious readers. Each article ends with **The Small Print §**: the nuances,
the honest interpretation, and what the headlines will probably get wrong.

Written and edited by Diana Chiang Jurado. Built with [Astro](https://astro.build).

## Project structure

```text
/
├── public/
│   ├── images/articles/<issue>/   # article hero images, one per language
│   └── CNAME                      # custom domain for GitHub Pages
├── src/
│   ├── content/
│   │   ├── articles/              # English articles (.md)
│   │   └── articles-es/           # Spanish articles (.md)
│   ├── content.config.ts          # shared frontmatter schema for both collections
│   ├── layouts/Layout.astro       # base layout: fonts, Open Graph / Twitter meta
│   ├── pages/
│   │   ├── index.astro            # English homepage
│   │   ├── about.astro            # meet the author (EN)
│   │   ├── about-tsp.astro        # about the publication (EN)
│   │   ├── articles/[slug].astro       # article page (EN)
│   │   ├── articles/[slug]-pdf.astro   # print-friendly PDF version (EN)
│   │   └── es/                    # Spanish equivalents of everything above
│   └── styles/global.css
└── zenodo/                        # tooling to deposit each article on Zenodo for a DOI
```

## Writing an article

Add a Markdown file to `src/content/articles/` (English) and, when the translation is
ready, a matching one in `src/content/articles-es/`. Frontmatter fields:

| Field | Notes |
|---|---|
| `title`, `deck`, `date`, `issue`, `topic`, `readTime` | required |
| `tags` | array, used for keywords (falls back to `topic` if omitted) |
| `image`, `imageAlt` | featured image — see below |
| `theSmallPrint` | the § section, written as flowing prose (paragraphs separated by a blank line) |
| `paperTitle`, `paperAuthors`, `paperJournal`, `paperYear`, `paperDOI`, `paperURL` | citation for the original paper, shown at the end of the article |
| `translationSlug` | filename (no extension) of the sibling-language version, for the language switch link |

The homepage automatically features whichever article has the highest number in `issue`
— no flag to flip by hand when you publish a new one.

### Featured image

Export from Canva at **1600×900px (16:9)**, subject centered (it gets cropped
differently in the homepage banner, the homepage card, and the article page).
JPEG or WebP, keep it under ~300KB — this project serves images as-is with no
build-time optimization.

Save it to `public/images/articles/<issueNN>/<article-slug>.jpg` and point `image` in
the frontmatter at that path. One image per language (each `.md` file has its own).

## Commands

Run from the project root:

| Command | Action |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Build the static site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Zenodo (DOIs)

See [`zenodo/README.md`](zenodo/README.md) for how to generate deposit metadata and
create a DOI for a published article.

## Deploy

Pushing to `main` builds and deploys automatically to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), serving at the custom
domain configured in `public/CNAME` and `astro.config.mjs`.
