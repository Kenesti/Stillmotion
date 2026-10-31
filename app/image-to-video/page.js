import Link from "next/link";
import Generator from "@/components/Generator";
import Faq from "@/components/Faq";

export const metadata = {
  title: "Advanced AI Image to Video Generator",
  description:
    "Use Vidou's signed-in image to video workspace with five aspect ratios, 480p to 1080p output, optional audio, and visible credit requirements.",
  alternates: { canonical: "/image-to-video" },
  openGraph: {
    title: "Advanced AI Image to Video Generator | Vidou",
    description: "Five aspect ratios, 480p–1080p output, optional audio, visible credits.",
    url: "/image-to-video",
  },
};

const faqs = [
  { q: "Do I need to sign in to use this workspace?", a: "The advanced workspace is designed for signed-in projects with saved creations. The homepage tool remains free with no login." },
  { q: "Which image formats can I upload?", a: "JPEG, PNG, and WebP." },
  { q: "How should I write the motion prompt?", a: "Describe what should move, how the camera should move, the pace, and any details that must remain stable. Don't repeat everything already visible in the image." },
  { q: "How do I avoid motion artifacts?", a: "Ask for one clear action and one camera move, name what must stay stable (face, logo, product shape), and review the first and last frames for drift." },
  { q: "How are credits calculated?", a: "The interface shows the required credits before you generate, based on resolution, aspect ratio, and audio. See the Pricing page to compare credit packages." },
];

const workflow = [
  { n: "01", title: "Upload your image", body: "Sign in and upload a JPEG, PNG, or WebP image." },
  { n: "02", title: "Describe the motion", body: "Cover subject motion, camera movement, pace, and what must stay stable." },
  { n: "03", title: "Set the output and generate", body: "Choose 9:16, 4:3, 3:4, 1:1, or 16:9; 480p/720p/1080p; optional audio — then review the credit requirement before generating." },
];

const promptParts = [
  { n: "01", k: "Motion", v: "The runner's jacket moves gently in the wind." },
  { n: "02", k: "Camera", v: "The camera makes a slow push in." },
  { n: "03", k: "Pace", v: "Keep the movement calm and continuous." },
  { n: "04", k: "Preserve", v: "Keep the face, logo, and background structure stable." },
];

const review = [
  "Watch the full clip at normal speed",
  "Inspect faces, hands, text, logos, product shape, background edges",
  "Check the first and last frames, not only the middle",
  "Look for sudden jumps, flicker, or unwanted objects",
  "Regenerate or revise the prompt when a visible error matters",
];

export default function ImageToVideo() {
  return (
    <>
      <section className="hero container" id="top" style={{ paddingBottom: 30 }}>
        <span className="eyebrow">🛠️ Advanced Workspace</span>
        <h1 style={{ fontSize: "clamp(30px,4.6vw,50px)" }}>Advanced AI Image to <span className="grad">Video</span> Generator</h1>
        <p className="lead">More control than the free homepage tool: selectable output settings, saved creations, and clear credit requirements.</p>
      </section>

      <section className="section container" style={{ paddingTop: 10 }}>
        <Generator advanced={true} />
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>How to Use the Advanced Workspace</h2>
        </div>
        <div className="grid-3">
          {workflow.map((s) => (
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
          <h2>Build a Motion Prompt From the Source Image</h2>
          <p>The image already shows subject, composition, lighting, and style — the prompt explains what changes over time.</p>
        </div>
        <div className="grid-2">
          {promptParts.map((p) => (
            <div className="card" key={p.n}>
              <span className="badge badge-brand">{p.n} · {p.k}</span>
              <p style={{ margin: "12px 0 0", color: "var(--text-dim)", fontSize: 15 }}>{p.v}</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 20 }}>
          <span className="badge badge-cyan">Complete prompt</span>
          <p style={{ margin: "12px 0 0", fontSize: 15.5 }}>
            “The runner's jacket moves gently in the wind as the camera makes a slow push in.
            Keep the movement calm and continuous, and preserve the face, logo, and background structure.”
          </p>
        </div>
      </section>

      <section className="section container">
        <div className="section-head"><h2>What to Review Before You Use the Video</h2></div>
        <div className="card">
          <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-dim)", display: "grid", gap: 10, fontSize: 15 }}>
            {review.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Advanced Image to Video FAQ</h2>
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto" }}><Faq items={faqs} /></div>
      </section>

      <section className="section container">
        <div className="section-head"><h2>Explore More AI Tools</h2></div>
        <div className="grid-3">
          <Link href="/text-to-video" className="card"><h3 style={{ margin: "0 0 6px" }}>Text to Video</h3><p style={{ margin: 0, color: "var(--text-dim)", fontSize: 14.5 }}>Create a short video from a scene description.</p></Link>
          <Link href="/text-to-image" className="card"><h3 style={{ margin: "0 0 6px" }}>Text to Image</h3><p style={{ margin: 0, color: "var(--text-dim)", fontSize: 14.5 }}>Generate a new image from a description.</p></Link>
          <Link href="/image-edit" className="card"><h3 style={{ margin: "0 0 6px" }}>Image Editor</h3><p style={{ margin: 0, color: "var(--text-dim)", fontSize: 14.5 }}>Make one focused change while keeping the rest stable.</p></Link>
        </div>
      </section>

      <section className="container">
        <div className="cta-band">
          <h2>Ready to Create Your Video?</h2>
          <p>Upload an image, describe one clear motion, and choose the output settings that fit your project.</p>
          <a href="#top" className="btn btn-primary btn-lg">Create Your Video From an Image</a>
        </div>
      </section>
    </>
  );
}
