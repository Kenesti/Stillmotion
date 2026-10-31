import Link from "next/link";

export const metadata = {
  title: "AI Image Editor",
  description: "Make one focused change to an image while naming the details that should stay consistent with Vidou's AI image editor.",
  alternates: { canonical: "/image-edit" },
};

export default function ImageEdit() {
  return (
    <>
      <section className="hero container" style={{ paddingBottom: 30 }}>
        <span className="eyebrow">🖌️ Image Editor</span>
        <h1>AI <span className="grad">Image Editor</span></h1>
        <p className="lead">One focused change per edit — name what must stay consistent and the rest of the image stays untouched.</p>
      </section>
      <section className="section container" style={{ paddingTop: 10 }}>
        <div className="card" style={{ maxWidth: 720, margin: "0 auto" }}>
          <h3 style={{ marginTop: 0 }}>Workspace preview</h3>
          <p className="hint">Image editing lives in the signed-in workspace with credit-based generation.</p>
          <div className="credits-bar"><span>Status</span><b>Sign in to edit</b></div>
          <p className="notice">Then bring the edited image to life with the <Link href="/" style={{ color: "var(--brand-2)" }}>free image to video generator</Link>.</p>
        </div>
      </section>
    </>
  );
}
