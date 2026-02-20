/**
 * Dynamic sitemap generator
 * Queries Supabase for all published properties and blog posts,
 * then writes public/sitemap.xml before each build.
 *
 * Usage: node scripts/generate-sitemap.js
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://yvelines-immo.fr';

// Read from env or fall back to the hardcoded values already in the client
const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || 'https://gxzifrexmsouvfnriyym.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4emlmcmV4bXNvdXZmbnJpeXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODQxMjgsImV4cCI6MjA3MjQ2MDEyOH0.dzskAdKcCovaserGT3oS31FcnamAByfvnzTSEKLfAWU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** Static pages that never change */
const STATIC_PAGES = [
  { path: '/',                priority: '1.0', changefreq: 'weekly'  },
  { path: '/ventes',          priority: '0.9', changefreq: 'daily'   },
  { path: '/locations',       priority: '0.9', changefreq: 'daily'   },
  { path: '/estimation',      priority: '0.8', changefreq: 'monthly' },
  { path: '/blog',            priority: '0.8', changefreq: 'weekly'  },
  { path: '/rejoindre-exp',   priority: '0.7', changefreq: 'monthly' },
  { path: '/contact',         priority: '0.7', changefreq: 'monthly' },
  { path: '/mentions-legales',priority: '0.3', changefreq: 'yearly'  },
  { path: '/rgpd',            priority: '0.3', changefreq: 'yearly'  },
  { path: '/cookies',         priority: '0.3', changefreq: 'yearly'  },
];

function formatDate(dateStr) {
  if (!dateStr) return new Date().toISOString().slice(0, 10);
  return dateStr.slice(0, 10);
}

function xmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildUrl({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generate() {
  const today = new Date().toISOString().slice(0, 10);

  // --- Static pages ---
  const staticEntries = STATIC_PAGES.map(({ path, priority, changefreq }) =>
    buildUrl({ loc: `${BASE_URL}${path}`, lastmod: today, changefreq, priority })
  );

  // --- Properties (available only) ---
  const { data: properties, error: propError } = await supabase
    .from('properties')
    .select('id, updated_at, status')
    .in('status', ['available', 'under_offer']);

  if (propError) {
    console.warn('Warning: could not fetch properties:', propError.message);
  }

  const propertyEntries = (properties || []).map((p) =>
    buildUrl({
      loc: `${BASE_URL}/bien/${p.id}`,
      lastmod: formatDate(p.updated_at),
      changefreq: 'weekly',
      priority: '0.8',
    })
  );

  // --- Blog posts (published only) ---
  const { data: posts, error: postError } = await supabase
    .from('posts')
    .select('slug, id, published_at, created_at')
    .eq('status', 'published');

  if (postError) {
    console.warn('Warning: could not fetch blog posts:', postError.message);
  }

  const postEntries = (posts || []).map((p) =>
    buildUrl({
      loc: `${BASE_URL}/blog/${p.slug || p.id}`,
      lastmod: formatDate(p.published_at || p.created_at),
      changefreq: 'monthly',
      priority: '0.6',
    })
  );

  // --- Assemble XML ---
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

${[...staticEntries, ...propertyEntries, ...postEntries].join('\n\n')}

</urlset>
`;

  const outPath = resolve(__dirname, '../public/sitemap.xml');
  writeFileSync(outPath, xml, 'utf-8');

  console.log(
    `✓ sitemap.xml generated: ${staticEntries.length} static pages, ` +
    `${propertyEntries.length} properties, ${postEntries.length} blog posts`
  );
}

generate().catch((err) => {
  console.error('Sitemap generation failed:', err);
  process.exit(1);
});
