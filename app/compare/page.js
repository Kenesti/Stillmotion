import Link from "next/link";
import { COMPETITORS } from "@/lib/competitors";

export const metadata = {
  title: "Vidou vs Alternatives: Compare AI Image to Video Tools in 2026",
  description:
    "Honest side-by-side comparisons of Vidou against Runway, Kling, Pika, Luma, PixVerse, Hailuo, and Google Veo — features, pricing, free tiers, speed, and verdicts.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Vidou vs AI Image to Video Alternatives — 2026 Comparison Hub",
    description: "Compare Vidou with the most-searched image-to-video competitors: pricing, free options, speed, and which is better.",
    url: "/compare",
  },
};

export default function CompareHub() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: COMPETITORS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://vidou.app/compare/${c.slug}`,
      name: `Vidou vs ${c.name}`,
    })),
  };
  return (
    <>
      <section className="hero container" style={{ paddingBottom: 24 }}>
        <span className="eyebrow">⚖️ Comparisons</span>
        <h1>Vidou vs Every <span className="grad">Alternative</span></h1>
        <p className="lead">
          Honest, side-by-side comparisons of the most-searched AI image to video tools in 2026 —
          features, pricing, free tiers, speed, and a clear verdict on each.
        </p>
      </section>

      <section className="section container" style={{ paddingTop: 10 }}>
        <div style={{ display: "grid", gap: 16 }}>
          {COMPETITORS.map((c) => (
            <Link href={`/compare/${c.slug}`} className="card compare-hub-card" key={c.slug}>
              <span className="comp-logo" style={{ background: c.color }}>{c.initial}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "2px 0 4px", fontSize: 18 }}>
                  {c.slug === "vidou" ? "Vidou vs the original vidou.ai brand" : `Vidou vs ${c.name}`}
                </h3>
                <p style={{ margin: 0, color: "var(--text-dim)", fontSize: 14.5 }}>{c.blurb}</p>
              </div>
              <span className="badge badge-brand">Read comparison →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="cta-band">
          <h2>See why creators pick Vidou</h2>
          <p>Free forever, no login, no watermarks, unlimited 5-second videos.</p>
          <Link href="/#try" className="btn btn-primary btn-lg">Try the Generator Free</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </>
  );
}
