const CAIRO_OFFSET = '+02:00';

/** Returns the canonical ISO dateModified string for an article */
export function getDateModified(article: any): string {
  if (article.data) {
    return article.data.updatedAt ?? article.data.isoDate;
  }
  return article.updatedAt ?? article.isoDate;
}

/** Formats a dateModified ISO string as Cairo local time: "12:12 PM" */
export function formatModifiedTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Africa/Cairo',
  });
}

/** Returns the full ISO string with Cairo offset for schema/sitemap use */
export function toSchemaDate(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) throw new Error(`Invalid date: ${isoString}`);
  // Re-emit as Cairo-offset ISO string
  const cairoMs = date.getTime() + (2 * 60 * 60 * 1000); // UTC+2
  const d = new Date(cairoMs);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}${CAIRO_OFFSET}`;
}
