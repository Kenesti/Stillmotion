import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/data";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  return Promise.resolve(params).then(({ slug }) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return {};
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `/blog/${slug}` },
    };
  });
}

const BODIES = {
  "ai-image-to-video-guide": [
    "Image-to-video AI takes a single still and predicts how every pixel should move over the next few seconds. In 2026 the models are good enough that a 5-second clip is often indistinguishable from real footage — if the prompt is clear.",
    "The winning prompt structure is: subject motion + one camera move + pace + what must stay stable. Anything visible in the source image does not need to be repeated.",
    "Start with the free Vidou generator to iterate quickly, then move to a paid workspace only when you need longer clips or 4K delivery.",
  ],
  "how-to-animate-a-photo-with-ai": [
    "Pick a sharp photo with a clear subject and room for movement. Upload it, describe one motion in plain words — “waves gently rolling in” — choose an aspect ratio, and generate.",
    "Review the first and last frames first: drift usually shows up at the edges of the clip. If something warps, name it as a constraint (“keep the face stable”) and regenerate.",
  ],
  "image-to-video-prompt-guide": [
    "Motion: what moves (hair, fabric, water). Camera: push-in, pan, orbit, tilt. Pace: calm, steady, energetic. Preserve: faces, logos, text that must not drift.",
    "One action per clip beats five. If you need a sequence, generate separate 5-second shots and edit them together.",
  ],
  "image-to-video-prompt-examples": [
    "Portraits: “hair flowing gently in the wind, slow push-in, keep the face stable.” Landscapes: “clouds drifting across the sky, soft golden light.” Products: “slow 360 orbit, studio lighting, keep the logo sharp.”",
    "Copy any example, swap the subject, and generate — the engine parses motion, camera, and pace automatically.",
  ],
  "best-camera-movements-ai-image-to-video": [
    "Push-in creates intimacy and works on almost any subject. Zoom-out reveals context. Orbit suits products. Pan follows action. Tilt adds drama to landscapes.",
    "Slow moves hide model artifacts; fast moves amplify them. Match pace to the energy of the scene.",
  ],
  "turn-product-photos-into-videos-with-ai": [
    "Product shots are ideal for image-to-video: clean backgrounds, a single subject, room to orbit. Use 1:1 for feeds, 9:16 for Reels, 16:9 for hero banners.",
    "Name the logo and product edges as “must stay stable” in the prompt to avoid warping on text.",
  ],
  "keep-faces-consistent-ai-image-to-video": [
    "Faces drift when the prompt ignores them. Add “keep the face, eyes, and expression stable” and avoid asking for large head motion in the same clip.",
    "Smaller faces in wide shots are harder — crop tighter before uploading if the face is the subject.",
  ],
  "image-to-video-problems-fixes": [
    "Flicker usually means too many competing effects in one prompt — split them into separate clips. Warping on hands and text: add a preserve constraint. Sudden jumps: lower the pace. Unwanted objects: describe the background as static.",
    "Always inspect the first and last frame; that's where drift concentrates.",
  ],
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const body = BODIES[slug] || BODIES["ai-image-to-video-guide"];
  return (
    <article className="section container article">
      <nav className="breadcrumb"><Link href="/blog">Blog</Link><span>/</span><span>{post.title}</span></nav>
      <h1>{post.title}</h1>
      <p style={{ color: "var(--text-faint)", fontSize: 14 }}>{post.date} · Vidou team</p>
      {body.map((p, i) => <p key={i}>{p}</p>)}
      <div className="cta-band">
        <h2>Try it yourself — free</h2>
        <p>Bring one of your own images to life in seconds.</p>
        <Link href="/#try" className="btn btn-primary btn-lg">Open the Generator</Link>
      </div>
    </article>
  );
}
