import { COMPETITORS } from "@/lib/competitors";
import { BLOG_POSTS } from "@/lib/data";

export default function sitemap() {
  const base = "https://vidou.app";
  const staticPages = ["", "/image-to-video", "/text-to-video", "/text-to-image", "/image-edit", "/pricing", "/about", "/blog", "/login", "/compare"].map((p) => ({
    url: `${base}${p === "" ? "/" : p}`,
    lastModified: new Date("2026-10-29"),
    changeFrequency: p === "/compare" || p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1.0 : p.startsWith("/compare") ? 0.85 : 0.7,
  }));
  const comps = COMPETITORS.map((c) => ({
    url: `${base}/compare/${c.slug}`,
    lastModified: new Date("2026-10-29"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const posts = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticPages, ...comps, ...posts];
}
