import Link from "next/link";

export const metadata = {
  title: "About Vidou",
  description: "Vidou is a privacy-first AI image to video generator. Free, no login, unlimited — bring any image to life with a simple motion prompt.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <section className="section container article">
      <h1>About Vidou</h1>
      <p>
        Vidou started with a simple idea: animating an image should be as easy as
        describing what you see. No accounts, no credit walls, no watermarks — just
        upload, prompt, and a living 5-second clip in seconds.
      </p>
      <h2>What we believe</h2>
      <ul>
        <li><strong>Privacy by architecture.</strong> The free generator runs entirely in your browser. We never see, store, or keep your images or videos.</li>
        <li><strong>Zero friction.</strong> No sign-up, no email verification, no prompt-engineering degree. Plain words work.</li>
        <li><strong>Honest tools.</strong> When you need more control — aspect ratios, resolution, audio, saved history — the advanced workspace is there with clear credit pricing.</li>
      </ul>
      <h2>What Vidou does</h2>
      <p>
        Upload a JPEG, PNG, or WebP image, describe the motion you want, and the
        motion engine renders a 5-second video with camera movement, atmospheric
        effects, and a generated soundtrack if you want one. Compare us against{" "}
        <Link href="/compare" style={{ color: "var(--brand-2)" }}>Runway, Kling, Pika and more</Link>.
      </p>
      <h2>Contact</h2>
      <p>Questions, feedback, or enterprise credit needs — reach the team at hello@vidou.app.</p>
    </section>
  );
}
