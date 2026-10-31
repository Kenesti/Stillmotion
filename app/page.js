import Link from "next/link";
import Generator from "@/components/Generator";
import Faq from "@/components/Faq";
import HoverVideo from "@/components/HoverVideo";
import { SAMPLE_CREATIONS } from "@/lib/data";

export const metadata = {
  title: "Vidou — Free AI Image to Video Generator",
  description:
    "Transform images into stunning videos with AI. Free, no login, unlimited usage, no watermarks. Create professional 5-second videos instantly.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vidou — Free AI Image to Video Generator",
    description: "Transform images into stunning videos with AI. Free, no login, unlimited usage.",
    url: "/",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Vidou AI Image to Video" }],
  },
};

const faqs = [
  { q: "Is this AI image to video generator really free?", a: "Yes — completely free with no hidden costs, no subscription, no credit requirements, and no watermarks. Generate as many 5-second videos as you want." },
  { q: "Do I need to create an account?", a: "No. No sign-up, no email, no personal information. Upload an image, describe the motion, and generate instantly — everything runs in your browser." },
  { q: "What image formats are supported?", a: "JPG, JPEG, PNG, and WebP. The tool automatically optimizes your input for the best video quality." },
  { q: "How long does generation take?", a: "Typically just a few seconds, since the motion engine runs locally in your browser with no queues and no GPU requirement on your side beyond a normal canvas." },
  { q: "Are my images and videos stored on your servers?", a: "No. All processing happens in your browser and nothing is uploaded to or stored on our servers. Your content is deleted when you leave the page." },
  { q: "What motion can I create?", a: "Camera moves (push-in, zoom-out, pan, orbit, tilt), object motion (waves, wind, rain, fire, mist), atmospheric effects, and character animation like flowing hair — all from a plain-language prompt." },
  { q: "Can I use the videos commercially?", a: "Yes — you own the rights to what you create. Just make sure you hold the rights to the original image you upload." },
  { q: "How long are the videos and what resolution?", a: "5 seconds at 720p (1280×720) on the free tool, with 480p–1080p and five aspect ratios in the advanced workspace." },
  { q: "Can I close the page while generating?", a: "No — keep the tab open. Because processing is in-browser for privacy, closing the page interrupts generation." },
];

const features = [
  { icon: "🆓", title: "Free Forever. No Login. 100% Private.", body: "Use the generator completely free — no sign-up, no watermarks, no tracking. We don't store your files; everything runs in your browser." },
  { icon: "⚡", title: "Faster Speed. Sharper Results.", body: "An optimized motion engine delivers smooth, cinematic, frame-consistent video in seconds on desktop and mobile — no GPU needed." },
  { icon: "🗣️", title: "No Expert Prompts Needed.", body: "Type simple natural language like “waves gently flowing” or “hair blowing in the wind” — the AI understands intent, not syntax." },
  { icon: "♾️", title: "Truly Free, No Limits.", body: "Unlimited generations with no hidden restrictions or daily caps. Create as much as you want, whenever you want." },
  { icon: "🎞️", title: "High-Quality Motion.", body: "From gentle zooms to parallax and atmospheric effects, get smooth cinematic motion that enhances your visuals." },
  { icon: "🔒", title: "Privacy First.", body: "We never store your images or videos. Everything is processed securely in your browser and deleted after rendering." },
];

const steps = [
  { n: "01", title: "Upload Your Image", body: "Choose any static image — portraits, landscapes, product photos, artwork. JPG, PNG, and WebP supported." },
  { n: "02", title: "Describe the Motion", body: "Type a simple prompt in natural language. “Waves gently flowing” is enough — no technical skills needed." },
  { n: "03", title: "Generate and Download", body: "Pick an aspect ratio, click generate, and download your 5-second HD video instantly." },
];

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <section className="hero container">
        <span className="eyebrow">✨ AI Image to Video</span>
        <h1>Free AI Image to <span className="grad">Video</span> Generator</h1>
        <p className="lead">
          Use advanced AI technology to add dynamic effects to your images and create
          stunning video content — free, no login, unlimited.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#try" className="btn btn-primary btn-lg">Try It Free Now</a>
          <Link href="/compare" className="btn btn-ghost btn-lg">Compare vs alternatives</Link>
        </div>
      </section>

      <section id="try" className="section container" style={{ paddingTop: 20 }}>
        <Generator advanced={false} />
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Why Our Free AI Image to Video Generator Stands Out</h2>
          <p>More than just free — fast, easy to use, and no prompt-engineering skills required.</p>
        </div>
        <div className="grid-3">
          {features.map((f) => (
            <div className="card" key={f.title}>
              <div style={{ fontSize: 30, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{f.title}</h3>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: 14.5 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Example Creations</h2>
          <p>Real outputs from the motion engine — hover to play.</p>
        </div>
        <div className="grid-3">
          {SAMPLE_CREATIONS.map((c) => (
            <div className="card creation-card" key={c.id}>
              <HoverVideo src={c.video} poster={c.thumb} className="creation-video" />
              <div className="creation-meta">
                <span className="p" title={c.prompt}>{c.prompt}</span>
                <span className="badge badge-brand">{c.ratio}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>How to Turn Images into Videos in Seconds</h2>
          <p>Three simple steps.</p>
        </div>
        <div className="grid-3">
          {steps.map((s) => (
            <div className="card" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{s.title}</h3>
              <p style={{ margin: 0, color: "var(--text-dim)", fontSize: 14.5 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our AI image to video generator.</p>
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Faq items={faqs} />
        </div>
      </section>

      <section className="container">
        <div className="cta-band">
          <h2>Ready to Get Started?</h2>
          <p>Experience AI image-to-video generation now and bring your creativity to life.</p>
          <a href="#try" className="btn btn-primary btn-lg">Create Your Video — Free</a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
