export const ASPECT_RATIOS = [
  { id: "9:16", label: "9:16", desc: "Vertical · Reels / Shorts" },
  { id: "3:4", label: "3:4", desc: "Vertical classic" },
  { id: "1:1", label: "1:1", desc: "Square · Feed" },
  { id: "4:3", label: "4:3", desc: "Classic" },
  { id: "16:9", label: "16:9", desc: "Widescreen · YouTube" },
];

export const RESOLUTIONS = [
  { id: "480p", label: "480p", desc: "Lightweight drafts", credits: 8 },
  { id: "720p", label: "720p", desc: "Balanced review file", credits: 15 },
  { id: "1080p", label: "1080p", desc: "Largest available output", credits: 28 },
];

export const DURATION = 5;

export function creditsFor(resolutionId, aspectId, audio) {
  const res = RESOLUTIONS.find((r) => r.id === resolutionId) || RESOLUTIONS[1];
  let c = res.credits;
  if (aspectId === "9:16" || aspectId === "16:9") c += 2;
  if (audio) c += 5;
  return c;
}

export const PROMPT_SUGGESTIONS = [
  "Slow cinematic push-in, gentle parallax, soft light drifting",
  "Hair and fabric flowing gently in a breeze, calm continuous motion",
  "Clouds drifting slowly across the sky, warm golden hour light",
  "Water rippling softly, reflections shimmering",
  "Candle flames flickering, cozy ambient glow",
  "Subtle zoom out, dreamy atmosphere, film grain",
];

export const SAMPLE_CREATIONS = [
  {
    id: "s1",
    prompt: "Slow cinematic push-in, gentle parallax, flickering neon lights, subtle thumbnail motion.",
    video: "/samples/demo1.mp4",
    thumb: "/samples/demo1.jpg",
    ratio: "16:9",
    date: "2026-10-28",
  },
  {
    id: "s2",
    prompt: "Magical orb glowing brighter, hair and dress flowing gently, mist swirling around, mystical forest ambiance.",
    video: "/samples/demo2.mp4",
    thumb: "/samples/demo2.jpg",
    ratio: "9:16",
    date: "2026-10-25",
  },
  {
    id: "s3",
    prompt: "Ocean waves rolling gently toward the shore, soft morning light, calm continuous motion.",
    video: "/samples/demo3.mp4",
    thumb: "/samples/demo3.jpg",
    ratio: "1:1",
    date: "2026-10-21",
  },
];

export const BLOG_POSTS = [
  {
    slug: "ai-image-to-video-guide",
    title: "The Complete Guide to AI Image to Video in 2026",
    excerpt: "How image-to-video AI works, what to prompt, and how to get cinematic motion from a single still.",
    emoji: "🎬",
    date: "2026-10-01",
  },
  {
    slug: "how-to-animate-a-photo-with-ai",
    title: "How to Animate a Photo with AI (Step by Step)",
    excerpt: "Upload, prompt, generate — turn any photo into a living 5-second clip in under a minute.",
    emoji: "🖼️",
    date: "2026-10-01",
  },
  {
    slug: "image-to-video-prompt-guide",
    title: "Image to Video Prompt Guide: Motion, Camera, Pace",
    excerpt: "The four-part prompt structure that consistently produces smooth, stable motion.",
    emoji: "✍️",
    date: "2026-10-05",
  },
  {
    slug: "image-to-video-prompt-examples",
    title: "25 Image to Video Prompt Examples That Actually Work",
    excerpt: "Copy-paste prompts for portraits, landscapes, products, and characters.",
    emoji: "💡",
    date: "2026-10-12",
  },
  {
    slug: "best-camera-movements-ai-image-to-video",
    title: "Best Camera Movements for AI Image to Video",
    excerpt: "Push-in, dolly, orbit, pan — which camera moves look best on stills, and why.",
    emoji: "🎥",
    date: "2026-10-18",
  },
  {
    slug: "turn-product-photos-into-videos-with-ai",
    title: "Turn Product Photos into Videos with AI",
    excerpt: "Animate product shots for ads and social without a camera crew.",
    emoji: "📦",
    date: "2026-10-07",
  },
  {
    slug: "keep-faces-consistent-ai-image-to-video",
    title: "How to Keep Faces Consistent in AI Image to Video",
    excerpt: "Name what must stay stable in your prompt to avoid drift and warping.",
    emoji: "🙂",
    date: "2026-10-29",
  },
  {
    slug: "image-to-video-problems-fixes",
    title: "7 Common Image to Video Problems and How to Fix Them",
    excerpt: "Flicker, warping, sudden jumps — diagnose and fix the usual artifacts.",
    emoji: "🛠️",
    date: "2026-10-14",
  },
];
