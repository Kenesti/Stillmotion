import Link from "next/link";
import { notFound } from "next/navigation";
import Faq from "@/components/Faq";
import { COMPETITORS, getCompetitor, COMPARISON_FAQS, APP_FACTS, APP_NAME } from "@/lib/competitors";

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const comp = getCompetitor(slug);
  if (!comp) return {};
  const title = slug === "vidou"
    ? "Vidou vs vidou.ai: features, pricing, and which is better in 2026"
    : `${APP_NAME} vs ${comp.name}: features, pricing, and which is better in 2026`;
  const description = slug === "vidou"
    ? `How this Vidou rebuild compares to the original vidou.ai image-to-video tool in 2026: features, pricing, free tier, speed, and verdict.`
    : `${APP_NAME} vs ${comp.name} in 2026: side-by-side features, pricing, free option, speed, accuracy, ease of use, pros and cons — plus which one is better for you.`;
  return {
    title,
    description,
    alternates: { canonical: `/compare/${slug}` },
    openGraph: {
      title,
      description,
      url: `/compare/${slug}`,
      type: "article",
      images: [{ url: `/og/compare-${slug}.png`, width: 1200, height: 630, alt: title }],
    },
    keywords: comp.keywords,
  };
}

const ROWS = [
  { k: "Pricing", us: () => APP_FACTS.pricing, them: (c) => c.pricing || "—" },
  { k: "Free option", us: () => APP_FACTS.freeOption, them: (c) => c.freeOption || "—" },
  { k: "Generation speed", us: () => APP_FACTS.speed, them: (c) => c.speed || "—" },
  { k: "Motion quality", us: () => APP_FACTS.accuracy, them: (c) => c.accuracy || "—" },
  { k: "Ease of use", us: () => APP_FACTS.ease, them: (c) => c.ease || "—" },
  { k: "Clip length", us: () => "5 seconds", them: () => "Varies (often 5–10s, longer on top plans)" },
  { k: "Max resolution", us: () => "1080p (workspace) · 720p (free tool)", them: () => "480p–4K depending on plan" },
  { k: "Aspect ratios", us: () => "9:16, 3:4, 1:1, 4:3, 16:9", them: () => "Usually 9:16 / 1:1 / 16:9" },
  { k: "Audio", us: () => "Optional generated soundtrack (workspace)", them: () => "Model-dependent" },
  { k: "Privacy", us: () => "Processed in your browser; nothing stored", them: () => "Cloud processing under vendor privacy policy" },
  { k: "Login required", us: () => "No (free tool)", them: () => "Yes" },
  { k: "Watermark", us: () => "None, ever", them: () => "Free tiers usually watermarked" },
];

function Verdict({ comp }) {
  if (comp.slug === "vidou") {
    return (
      <div className="verdict">
        <h3>Verdict: same product, same promise</h3>
        <p>This rebuild mirrors the original vidou.ai — a free, no-login, in-browser image to-video generator producing 5-second clips with prompt-driven motion, five aspect ratios, and optional audio in the workspace.</p>
        <p>Where this version goes further: real server-side image analysis with a motion-suitability score, a fully working in-browser generation engine you can click through end to end, and a comparison hub to evaluate alternatives.</p>
      </div>
    );
  }
  return (
    <div className="verdict">
      <h3>Verdict: Vidou wins for free, private, unlimited use — {comp.name} wins for pro production</h3>
      <p>If you want to animate images into 5-second videos with zero signup, zero cost, and zero watermarks, <strong>Vidou is the better pick</strong> — {comp.name} gates regular use behind credits or subscriptions and typically watermarks free output.</p>
      <p>If you need longer clips, 4K delivery, or a professional editing suite, {comp.name} earns its price. The fair summary: use Vidou for fast free social clips, {comp.name} for final production work.</p>
    </div>
  );
}

export default async function ComparePage({ params }) {
  const { slug } = await params;
  const comp = getCompetitor(slug);
  if (!comp) notFound();
  const isOriginal = slug === "vidou";
  const faqs = isOriginal
    ? [
        { q: "Is this the same as vidou.ai?", a: "This is a faithful rebuild of the vidou.ai image-to-video product: same free no-login model, same 5-second clips, same five aspect ratios and 480p–1080p workspace options." },
        { q: "What is different from the original vidou.ai?", a: "This version adds a working end-to-end demo (real in-browser motion rendering and image analysis), plus a full comparison section covering the major alternatives." },
        { q: "Is the tool really free?", a: "Yes — the homepage generator is free forever with no login and no watermarks, just like the original brand's promise." },
      ]
    : COMPARISON_FAQS(comp);

  const others = COMPETITORS.filter((c) => c.slug !== slug);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: APP_NAME,
    description: "Free AI image to video generator — no login, no watermarks, unlimited 5-second clips.",
    brand: { "@type": "Brand", name: APP_NAME },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vidou.app/" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://vidou.app/compare" },
      { "@type": "ListItem", position: 3, name: `${APP_NAME} vs ${comp.name}`, item: `https://vidou.app/compare/${slug}` },
    ],
  };

  return (
    <>
      <article className="container" style={{ paddingTop: 56 }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/compare">Compare</Link><span>/</span><span>{comp.name}</span>
        </nav>

        <header className="compare-head" style={{ padding: "0 0 10px" }}>
          <h1>
            {isOriginal
              ? "Vidou vs vidou.ai: features, pricing, and which is better in 2026"
              : `${APP_NAME} vs ${comp.name}: features, pricing, and which is better in 2026`}
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 17, maxWidth: 780 }}>
            {isOriginal
              ? "A transparent look at how this Vidou rebuild compares with the original vidou.ai brand — same free model, plus a fully working demo and comparison hub."
              : `An honest 2026 comparison of ${APP_NAME} and ${comp.name} across pricing, free tiers, speed, quality, and ease of use. We favor Vidou only where it genuinely wins.`}
          </p>
          <div className="vs-pills">
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span className="vs-logo us">▶</span>
              <div><div className="vs-name">{APP_NAME}</div><div className="vs-sub">Free · no login · in-browser</div></div>
            </div>
            <span className="vs-x">vs</span>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span className="vs-logo" style={{ background: comp.color }}>{comp.initial}</span>
              <div><div className="vs-name">{comp.name}</div><div className="vs-sub">{comp.tagline}</div></div>
            </div>
          </div>
        </header>

        <section className="section" style={{ padding: "24px 0" }}>
          <h2 style={{ fontSize: 26, letterSpacing: "-0.02em", margin: "0 0 18px" }}>Side-by-side comparison</h2>
          <div className="table-wrap">
            <table className="cmp">
              <thead>
                <tr><th>Feature</th><th className="us-col">{APP_NAME}</th><th>{comp.name}</th></tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.k}>
                    <td>{r.k}</td>
                    <td><span className="win">{r.us()}</span></td>
                    <td className="neutral">{r.them(comp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="pros-cons" style={{ padding: "8px 0 24px" }}>
          <div className="card">
            <h3>{APP_NAME} — pros</h3>
            <ul>{APP_FACTS.pros.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
          <div className="card">
            <h3>{isOriginal ? "Original vidou.ai — notes" : `${comp.name} — pros & cons`}</h3>
            {isOriginal ? (
              <ul>
                <li>Same free, no-login promise and 5-second format</li>
                <li>Workspace credits from $15.99 for power users</li>
                <li>This rebuild adds a working demo and comparisons</li>
              </ul>
            ) : (
              <>
                <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--green)", fontWeight: 700 }}>Pros</p>
                <ul>{comp.pros.map((p) => <li key={p}>{p}</li>)}</ul>
                <p style={{ margin: "14px 0 10px", fontSize: 13, color: "var(--red)", fontWeight: 700 }}>Cons</p>
                <ul>{comp.cons.map((p) => <li key={p}>{p}</li>)}</ul>
              </>
            )}
          </div>
        </section>

        <Verdict comp={comp} />

        <section style={{ padding: "8px 0 24px" }}>
          <h2 style={{ fontSize: 26, letterSpacing: "-0.02em", margin: "0 0 18px" }}>Frequently asked questions</h2>
          <Faq items={faqs} />
        </section>

        <section style={{ padding: "8px 0 24px" }}>
          <h2 style={{ fontSize: 22, margin: "0 0 14px" }}>More comparisons</h2>
          <div className="kbd-row">
            {others.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="chip">
                {APP_NAME} vs {c.short}
              </Link>
            ))}
          </div>
        </section>

        <div className="cta-band">
          <h2>Try {APP_NAME} free — no signup</h2>
          <p>Upload an image, describe the motion, download a 5-second video in seconds.</p>
          <Link href="/#try" className="btn btn-primary btn-lg">Generate Your First Video</Link>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
