import Link from "next/link";

export const metadata = {
  title: "Pricing — Credits that Never Expire",
  description: "Vidou pricing: the homepage image-to-video tool is free forever. Workspace credit packs from $15.99, never expiring, with commercial license and no watermarks.",
  alternates: { canonical: "/pricing" },
};

const plans = [
  {
    name: "Basic", price: "$15.99", per: "$0.053 / Credit", popular: false,
    feats: ["300 Credits (Never Expire)", "Access to All AI Tools", "Private Generation", "Standard Generation Speed", "Up to 3 Parallel Tasks", "High-resolution Output", "7-day file storage", "Commercial License", "No Watermarks"],
  },
  {
    name: "Pro", price: "$29.99", per: "$0.019 / Credit", popular: true, flag: "MOST POPULAR", save: "Basic -70%",
    feats: ["1500 Credits (Never Expire)", "Access to All AI Tools", "Private Generation", "Fast Generation Speed", "Up to 10 Parallel Tasks", "High-resolution Output", "7-day file storage", "Commercial License", "No Watermarks"],
  },
  {
    name: "Max", price: "$69.99", per: "$0.014 / Credit", popular: false,
    feats: ["5000 Credits (Never Expire)", "Access to All AI Tools", "Private Generation", "Fastest Generation Speed", "Unlimited Parallel Tasks", "High-resolution Output", "7-day file storage", "Commercial License", "No Watermarks"],
  },
];

export default function Pricing() {
  return (
    <>
      <section className="hero container" style={{ paddingBottom: 30 }}>
        <span className="eyebrow">💳 Pricing</span>
        <h1>Choose Your <span className="grad">Plan</span></h1>
        <p className="lead">The homepage image-to-video tool is always free. Upgrade to credit packs only when you need the advanced workspace — pay once, no recurring charges.</p>
      </section>
      <section className="section container" style={{ paddingTop: 10 }}>
        <div className="price-grid">
          {plans.map((p) => (
            <div className={`card price-card${p.popular ? " popular" : ""}`} key={p.name}>
              {p.flag && <span className="price-flag">{p.flag}</span>}
              <h3 style={{ margin: 0, fontSize: 20 }}>{p.name}</h3>
              <div className="price">{p.price}</div>
              <div className="price-sub">{p.per} · Pay once — no recurring charges{p.save ? ` · ${p.save}` : ""}</div>
              <ul className="feat-list">{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
              <Link href="/login" className={`btn ${p.popular ? "btn-primary" : "btn-ghost"}`} style={{ width: "100%" }}>Get {p.name}</Link>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", color: "var(--text-faint)", marginTop: 26 }}>
          Need more credits? <Link href="/about" style={{ color: "var(--brand-2)" }}>Contact us</Link> for enterprise pricing.
        </p>
      </section>
      <section className="container">
        <div className="cta-band">
          <h2>Not ready to pay? The free tool never expires.</h2>
          <p>Generate unlimited 5-second videos on the homepage — no login, no watermark.</p>
          <Link href="/#try" className="btn btn-primary btn-lg">Try It Free</Link>
        </div>
      </section>
    </>
  );
}
