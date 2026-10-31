import Link from "next/link";

export const metadata = {
  title: "AI Text to Video Generator",
  description: "Turn a written scene description into a short AI video with five aspect ratios, 480p to 1080p output, and visible credit requirements.",
  alternates: { canonical: "/text-to-video" },
};

export default function TextToVideo() {
  return (
    <>
      <section className="hero container" style={{ paddingBottom: 30 }}>
        <span className="eyebrow">📝➡️🎬 Text to Video</span>
        <h1>AI <span className="grad">Text to Video</span> Generator</h1>
        <p className="lead">Describe the scene you want to create, then choose an aspect ratio and resolution before generating a short video.</p>
      </section>
      <section className="section container" style={{ paddingTop: 10 }}>
        <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
          <h3 style={{ marginTop: 0 }}>Describe your video</h3>
          <p className="hint">Describe the video scene you want, and AI will generate it for you.</p>
          <textarea className="input" rows={3} placeholder="A cute cat playing in the sunlight, cinematic quality..." readOnly />
          <div className="credits-bar"><span>Workspace</span><b>Sign in to generate · 5s clips</b></div>
          <p className="notice">Text-to-video runs in the signed-in workspace with visible credit requirements. Meanwhile, the <Link href="/" style={{ color: "var(--brand-2)" }}>image to video tool</Link> is free with no login.</p>
        </div>
      </section>
      <section className="section container">
        <div className="section-head"><h2>How to Write the Prompt</h2></div>
        <div className="card" style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ color: "var(--text-dim)" }}>Build the prompt in this order: <strong>subject + action + setting + camera + lighting &amp; mood + pace</strong>. Example: “A paper boat drifts through a shallow rain puddle, close low-angle framing, soft overcast light, gentle forward camera movement, calm pace.”</p>
        </div>
      </section>
      <section className="container">
        <div className="cta-band">
          <h2>Have an image instead?</h2>
          <p>Animate a photo directly with the free image to video generator.</p>
          <Link href="/" className="btn btn-primary btn-lg">Image to Video — Free</Link>
        </div>
      </section>
    </>
  );
}
