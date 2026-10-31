import Link from "next/link";

export const metadata = {
  title: "AI Text to Image Generator",
  description: "Create a new image from a clear description, composition, lighting, and visual mood with Vidou's text to image tool.",
  alternates: { canonical: "/text-to-image" },
};

export default function TextToImage() {
  return (
    <>
      <section className="hero container" style={{ paddingBottom: 30 }}>
        <span className="eyebrow">📝➡️🖼️ Text to Image</span>
        <h1>AI <span className="grad">Text to Image</span> Generator</h1>
        <p className="lead">Describe composition, lighting, and mood — get a new image, then animate it with image to video.</p>
      </section>
      <section className="section container" style={{ paddingTop: 10 }}>
        <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
          <h3 style={{ marginTop: 0 }}>Workspace preview</h3>
          <p className="hint">Text to image lives in the signed-in workspace with credit-based generation.</p>
          <div className="credits-bar"><span>Status</span><b>Sign in to generate</b></div>
          <p className="notice">Pair it with the <Link href="/" style={{ color: "var(--brand-2)" }}>free image to video generator</Link> to turn any result into motion.</p>
        </div>
      </section>
    </>
  );
}
