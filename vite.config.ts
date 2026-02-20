import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createClient } from "@supabase/supabase-js";
import type { Connect } from "vite";

const BASE_URL = "https://yvelines-immo.fr";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ||
  "https://gxzifrexmsouvfnriyym.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4emlmcmV4bXNvdXZmbnJpeXltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODQxMjgsImV4cCI6MjA3MjQ2MDEyOH0.dzskAdKcCovaserGT3oS31FcnamAByfvnzTSEKLfAWU";

const STATIC_PAGES = [
  { path: "/",                priority: "1.0", changefreq: "weekly"  },
  { path: "/ventes",          priority: "0.9", changefreq: "daily"   },
  { path: "/locations",       priority: "0.9", changefreq: "daily"   },
  { path: "/estimation",      priority: "0.8", changefreq: "monthly" },
  { path: "/blog",            priority: "0.8", changefreq: "weekly"  },
  { path: "/rejoindre-exp",   priority: "0.7", changefreq: "monthly" },
  { path: "/contact",         priority: "0.7", changefreq: "monthly" },
  { path: "/mentions-legales",priority: "0.3", changefreq: "yearly"  },
  { path: "/rgpd",            priority: "0.3", changefreq: "yearly"  },
  { path: "/cookies",         priority: "0.3", changefreq: "yearly"  },
];

function xmlEscape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildUrl(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemapXml(): Promise<string> {
  const today = new Date().toISOString().slice(0, 10);
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const staticEntries = STATIC_PAGES.map(({ path: p, priority, changefreq }) =>
    buildUrl(`${BASE_URL}${p}`, today, changefreq, priority)
  );

  const { data: properties } = await supabase
    .from("properties")
    .select("id, updated_at")
    .in("status", ["available", "under_offer"]);

  const propertyEntries = (properties || []).map((p: { id: number; updated_at: string | null }) =>
    buildUrl(
      `${BASE_URL}/bien/${p.id}`,
      (p.updated_at || today).slice(0, 10),
      "weekly",
      "0.8"
    )
  );

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, id, published_at, created_at")
    .eq("status", "published");

  const postEntries = (posts || []).map((p: { slug: string | null; id: number; published_at: string | null; created_at: string | null }) =>
    buildUrl(
      `${BASE_URL}/blog/${p.slug || p.id}`,
      (p.published_at || p.created_at || today).slice(0, 10),
      "monthly",
      "0.6"
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

${[...staticEntries, ...propertyEntries, ...postEntries].join("\n\n")}

</urlset>
`;
}

/** Vite plugin: serves /sitemap.xml dynamically in dev mode */
function sitemapPlugin() {
  return {
    name: "vite-plugin-sitemap",
    configureServer(server: { middlewares: { use: (fn: Connect.HandleFunction) => void } }) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/sitemap.xml") return next();
        try {
          const xml = await generateSitemapXml();
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(xml);
        } catch (err) {
          console.error("[sitemap] Error generating sitemap:", err);
          next(err);
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemapPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
