import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import { publicSitemapPaths } from "./src/data/sitemap";

function sitemapPlugin(): Plugin {
  return {
    name: "vela-sitemap",
    generateBundle() {
      const vercelUrl =
        process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
      const siteUrl = (
        process.env.SITE_URL ??
        (vercelUrl ? `https://${vercelUrl}` : "http://localhost:4173")
      ).replace(/\/+$/, "");
      const urls = publicSitemapPaths
        .map(
          (path) =>
            `  <url><loc>${siteUrl}${path === "/" ? "/" : path}</loc></url>`,
        )
        .join("\n");

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  build: {
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
