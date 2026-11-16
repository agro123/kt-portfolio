# Katherine Medina Ortiz, PhD — Scientific Portfolio

Trilingual (EN / ES / FR) static portfolio built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed to GitHub Pages.

> **Sample content.** The projects, metrics, publications, patents, institutions and profile links currently in `src/data/*.json` are placeholders. A banner on every page says so; it disappears once `site.sampleNotice` is emptied in the three language files.

## Quick start

Requires Node.js 22.23 or later.

```bash
npm install
npm run dev          # http://localhost:4321
npm run check:i18n   # verify en / es / fr are in sync
npm run build        # static site in dist/
npm run preview      # serve dist/ locally
```

## Editing content

All visible text, labels, dates, alt texts and SEO metadata come from three JSON files. Components contain no copy.

| Language | File |
| --- | --- |
| English (default) | `src/data/en.json` |
| Spanish | `src/data/es.json` |
| French | `src/data/fr.json` |

- **Non-technical editors:** use [Pages CMS](https://app.pagescms.org) (configured in `.pages.yml`) and follow [`GUIA_EDICION.md`](GUIA_EDICION.md) (Spanish, step by step).
- **Images and PDFs** live in `public/assets/`. Replace the two CV PDFs keeping their file names and every download button keeps working.
- **Keep the three files in sync.** `npm run check:i18n` fails (and blocks the deploy) if `es.json` or `fr.json` differ from `en.json` in structure or in shared values such as ids, links and years.

## Project structure

```
src/
  data/            en.json, es.json, fr.json — all site content
  i18n/index.ts    locale loading, base-aware URLs, date formatting
  layouts/         Base.astro — <head>, SEO, hreflang, JSON-LD
  components/      one component per section, plus Icon, GraphicalAbstract,
                   MolecularPattern (inline SVG, no image dependencies)
  pages/
    index.astro          root redirect (saved preference → browser language → en)
    [lang]/index.astro   /en/, /es/, /fr/
  scripts/app.ts   theme toggle, language switch, filters, dialogs, form
  styles/          global.css — design tokens for light and dark themes
public/assets/     portrait and CV PDFs
scripts/           check-i18n.mjs
.pages.yml         Pages CMS schema
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

One-time setup: **Settings → Pages → Source → GitHub Actions**.

`site` and `base` are read from the repository's Pages settings, so the same workflow works for a user site, a project site (`/repo-name`) or a custom domain. To build for a specific target locally:

```bash
SITE_URL=https://example.com BASE_PATH=/ npm run build
SITE_URL=https://user.github.io BASE_PATH=/repo-name npm run build
```

## Contact form

With `contact.form.endpoint` empty, the form opens the visitor's email client. Set it to a [Formspree](https://formspree.io) URL, or to `https://api.web3forms.com/submit` with `contact.form.accessKey`, to receive messages directly.
