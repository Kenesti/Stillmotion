import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";

export const metadata = {
  title: "Blog — AI Image to Video Guides",
  description: "Guides, prompt examples, and troubleshooting for AI image to video: camera moves, motion prompts, product shots, and face consistency.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <>
      <section className="hero container" style={{ paddingBottom: 30 }}>
        <span className="eyebrow">📝 Blog</span>
        <h1>AI Image to Video <span className="grad">Guides</span></h1>
        <p className="lead">Prompts, camera moves, and fixes — everything we've learned about making stills move.</p>
      </section>
      <section className="section container" style={{ paddingTop: 10 }}>
        <div className="grid-3">
          {BLOG_POSTS.map((p) => (
            <Link href={`/blog/${p.slug}`} className="card blog-card" key={p.slug}>
              <div className="blog-thumb">{p.emoji}</div>
              <div className="blog-body">
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <p style={{ marginTop: 10, fontSize: 12.5, color: "var(--text-faint)" }}>{p.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
