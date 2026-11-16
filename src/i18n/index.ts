import en from '../data/en.json';
import es from '../data/es.json';
import fr from '../data/fr.json';

// en.json is the reference shape; es.json and fr.json must mirror it
// (enforced by `npm run check:i18n`).
export type Content = typeof en;

export const locales = { en, es, fr } as unknown as Record<string, Content>;
export const langs = Object.keys(locales);
export const defaultLang = 'en';

export const getContent = (lang: string): Content => locales[lang] ?? locales[defaultLang];

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix an internal path with the configured base; external URLs and anchors pass through. */
export function url(path = ''): string {
  if (/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(path)) return path;
  return `${base}/${path.replace(/^\/+/, '')}`;
}

/** Absolute URL for SEO tags. */
export const absUrl = (path: string, site: URL | undefined): string =>
  new URL(url(path), site ?? 'http://localhost').href;

export function formatDate(iso: string, locale: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

/** Replace {placeholders} in a UI string. */
export const fill = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
