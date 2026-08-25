#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import matter from 'gray-matter';

const SITE_URL = process.env.SITE_URL || 'https://thesmallprint.pub';

const ZENODO_API = {
  production: 'https://zenodo.org/api',
  sandbox: 'https://sandbox.zenodo.org/api',
};

// Zenodo expects ISO 639-2/B three-letter codes, not the two-letter codes we use internally.
const LANGUAGE_CODES = { en: 'eng', es: 'spa' };

const DISCLAIMER = {
  en: 'The Small Print is an independent editorial project. This content does not represent the position of any institution.',
  es: 'The Small Print es un proyecto editorial independiente. Este contenido no representa la posición de ninguna institución.',
};

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
  julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
};

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    } else {
      args._.push(a);
    }
  }
  return args;
}

// Our articles/ and articles-es/ directories share filenames, so language is
// determined by which content collection the file lives in — unless the
// frontmatter declares `language` explicitly, which always wins.
function detectLanguage(filePath, frontmatter) {
  if (frontmatter.language) return frontmatter.language;
  const normalized = filePath.split(path.sep).join('/');
  if (normalized.includes('/articles-es/')) return 'es';
  return 'en';
}

function buildArticleURL(lang, slug) {
  return lang === 'es'
    ? `${SITE_URL}/es/articulos/${slug}`
    : `${SITE_URL}/articles/${slug}`;
}

// Frontmatter dates are free text ("June 2026", "junio 2026"), not precise
// enough for Zenodo's publication_date. This is a best-effort guess (first
// of the month) — always verify before depositing, or pass --date.
function guessPublicationDate(dateStr) {
  if (!dateStr) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const match = dateStr.toLowerCase().trim().match(/([a-záéíóúñ]+)\s+(\d{4})/i);
  if (!match) return null;
  const monthNum = MONTHS[match[1]];
  if (!monthNum) return null;
  return `${match[2]}-${String(monthNum).padStart(2, '0')}-01`;
}

function buildDescription(deck, lang) {
  const disclaimer = DISCLAIMER[lang] || DISCLAIMER.en;
  return `${deck || ''}\n\n${disclaimer}`;
}

function loadTemplate() {
  const templatePath = path.join(import.meta.dirname, 'metadata-template.json');
  return JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
}

function generateMetadata(articlePath, opts) {
  const raw = fs.readFileSync(articlePath, 'utf-8');
  const { data: fm } = matter(raw);

  if (!fm.title) throw new Error(`Article is missing "title" in frontmatter: ${articlePath}`);

  const slug = path.basename(articlePath, path.extname(articlePath));
  const lang = detectLanguage(articlePath, fm);
  const langCode = LANGUAGE_CODES[lang] || LANGUAGE_CODES.en;
  const articleURL = buildArticleURL(lang, slug);

  const template = loadTemplate();
  const metadata = JSON.parse(JSON.stringify(template.metadata));

  metadata.title = fm.title;
  metadata.description = buildDescription(fm.deck, lang);
  metadata.language = langCode;
  metadata.keywords = Array.isArray(fm.tags) && fm.tags.length
    ? fm.tags
    : (fm.topic ? [fm.topic] : []);

  const relatedIdentifiers = [];
  if (fm.paperDOI) {
    relatedIdentifiers.push({ identifier: `https://doi.org/${fm.paperDOI}`, relation: 'references' });
  }
  relatedIdentifiers.push({ identifier: articleURL, relation: 'isVariantFormOf' });
  if (opts.translationDoi) {
    // Zenodo's deposit API doesn't accept DataCite's "isTranslationOf" relation —
    // "isVariantFormOf" is DataCite's own documented fallback for translations.
    relatedIdentifiers.push({ identifier: `https://doi.org/${opts.translationDoi}`, relation: 'isVariantFormOf' });
  }
  metadata.related_identifiers = relatedIdentifiers;

  const guessedDate = guessPublicationDate(fm.date);
  if (opts.date) {
    metadata.publication_date = opts.date;
  } else if (guessedDate) {
    metadata.publication_date = guessedDate;
    console.warn(`⚠ publication_date estimated from frontmatter date "${fm.date}" → ${guessedDate}. Verify before publishing, or pass --date YYYY-MM-DD.`);
  } else {
    console.warn(`⚠ Could not determine publication_date from frontmatter date "${fm.date}". Fill it in manually, or pass --date YYYY-MM-DD.`);
  }

  metadata.version = opts.version || '1.0';

  if (!metadata.creators?.[0]?.orcid || metadata.creators[0].orcid === '<ORCID>') {
    console.warn('⚠ ORCID placeholder is not filled in — edit zenodo/metadata-template.json before depositing.');
  }

  return { metadata, slug, lang };
}

async function createDraftDeposition({ metadata, pdfPath, sandbox, token }) {
  if (!token) throw new Error('ZENODO_TOKEN environment variable is not set.');
  const base = sandbox ? ZENODO_API.sandbox : ZENODO_API.production;

  const createRes = await fetch(`${base}/deposit/depositions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({}),
  });
  if (!createRes.ok) throw new Error(`Failed to create deposition: ${createRes.status} ${await createRes.text()}`);
  const deposition = await createRes.json();

  const updateRes = await fetch(`${base}/deposit/depositions/${deposition.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ metadata }),
  });
  if (!updateRes.ok) throw new Error(`Failed to set metadata: ${updateRes.status} ${await updateRes.text()}`);

  if (pdfPath) {
    const bucketUrl = deposition.links.bucket;
    const fileBuffer = fs.readFileSync(pdfPath);
    const fileName = path.basename(pdfPath);
    const uploadRes = await fetch(`${bucketUrl}/${encodeURIComponent(fileName)}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: fileBuffer,
    });
    if (!uploadRes.ok) throw new Error(`Failed to upload PDF: ${uploadRes.status} ${await uploadRes.text()}`);
  }

  return { id: deposition.id, base };
}

async function confirmPublish(id, base) {
  console.log('');
  console.log('⚠️  WARNING: publishing on Zenodo is PERMANENT.');
  console.log('   The DOI cannot be deleted or reassigned once published.');
  console.log(`   Review the draft first: ${base.replace('/api', '')}/deposit/${id}`);
  console.log('');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((resolve) => rl.question('Type PUBLISH to confirm, or anything else to cancel: ', resolve));
  rl.close();
  return answer.trim() === 'PUBLISH';
}

async function publishDeposition(id, base, token) {
  const res = await fetch(`${base}/deposit/depositions/${id}/actions/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Failed to publish: ${res.status} ${await res.text()}`);
  return res.json();
}

function printUsage() {
  console.error('Usage: node generate-metadata.js <path-to-article.md> [options]');
  console.error('');
  console.error('Options:');
  console.error('  --pdf <path>             Path to the PDF to upload (used with --deposit)');
  console.error('  --translation-doi <doi>  DOI of the sibling-language version of this article');
  console.error('  --date <YYYY-MM-DD>      Override publication_date');
  console.error('  --version <string>       Override version (default: 1.0)');
  console.error('  --out <path>             Where to write the metadata JSON (default: zenodo/output/<slug>.<lang>.json)');
  console.error('  --deposit                Create/update a draft deposition on Zenodo (requires ZENODO_TOKEN)');
  console.error('  --publish                After --deposit, ask for interactive confirmation and publish (IRREVERSIBLE)');
  console.error('  --sandbox                Use sandbox.zenodo.org instead of zenodo.org (for testing)');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const articlePath = args._[0];
  if (!articlePath) {
    printUsage();
    process.exit(1);
  }

  const { metadata, slug, lang } = generateMetadata(path.resolve(articlePath), {
    translationDoi: args['translation-doi'],
    date: args.date,
    version: args.version,
  });

  const outDir = path.join(import.meta.dirname, 'output');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = args.out ? path.resolve(args.out) : path.join(outDir, `${slug}.${lang}.json`);
  fs.writeFileSync(outPath, JSON.stringify({ metadata }, null, 2));
  console.log(`✓ Metadata written to ${path.relative(process.cwd(), outPath)}`);

  if (!args.deposit) return;

  if (!args.pdf) {
    console.warn('⚠ No --pdf provided — depositing metadata only, no file will be attached.');
  }

  const { id, base } = await createDraftDeposition({
    metadata,
    pdfPath: args.pdf ? path.resolve(args.pdf) : null,
    sandbox: !!args.sandbox,
    token: process.env.ZENODO_TOKEN,
  });

  const webBase = base.replace('/api', '');
  console.log(`✓ Draft deposition created: ${webBase}/deposit/${id}`);
  console.log('  Review it on Zenodo before publishing.');

  if (!args.publish) {
    console.log('  Run the same command again with --publish when ready (this will ask for confirmation).');
    return;
  }

  const confirmed = await confirmPublish(id, base);
  if (!confirmed) {
    console.log('Cancelled. The draft is unpublished — publish it manually from the Zenodo dashboard when ready.');
    return;
  }

  const published = await publishDeposition(id, base, process.env.ZENODO_TOKEN);
  console.log(`✓ Published. DOI: ${published.doi}`);
}

main().catch((err) => {
  console.error('✗', err.message);
  process.exit(1);
});
