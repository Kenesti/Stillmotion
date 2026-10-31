export const APP_NAME = "Vidou";

export const COMPETITORS = [
  {
    slug: "vidou",
    name: "Vidou",
    short: "Vidou",
    tagline: "Free, no-login AI image to video that runs in your browser.",
    color: "linear-gradient(135deg,#7c5cff,#22d3ee)",
    initial: "V",
    blurb:
      "The original brand this rebuild is modeled on: unlimited free 5-second image-to-video clips, no account, no watermark, everything processed in-browser.",
  },
  {
    slug: "runway",
    name: "Runway",
    short: "Runway ML",
    tagline: "Professional AI video suite with Gen-4.5 and deep editing controls.",
    color: "linear-gradient(135deg,#111827,#4b5563)",
    initial: "R",
    blurb:
      "The industry-standard professional video AI with Gen-4.5, camera control, and a full editing workspace. Subscription from ~$12/mo.",
    pricing: "From ~$12/mo (Standard), 125 one-time free credits",
    freeOption: "Limited one-time credits (125) on signup; no recurring free tier",
    speed: "Slower; minutes per 5–10s clip on standard queues",
    accuracy: "Excellent prompt adherence and camera direction",
    ease: "Steep learning curve; pro-oriented workspace",
    pros: ["Best-in-class camera control and prompt adherence", "Full professional editing suite (Gen-4.5)", "Strong for film and ad production pipelines"],
    cons: ["Subscription required for regular use", "No genuinely free unlimited tier", "Watermarks and resolution caps on free credits"],
    keywords: ["runway alternative", "runway vs vidou", "runway ml alternatives"],
  },
  {
    slug: "kling",
    name: "Kling AI",
    short: "Kling",
    tagline: "Kuaishou's cinematic model, strong at realistic human motion.",
    color: "linear-gradient(135deg,#2563eb,#22d3ee)",
    initial: "K",
    blurb:
      "Kling 3.0 is widely ranked the best image-to-video model for realistic movement of people and objects, with native 4K output on top plans.",
    pricing: "From ~$10/mo equivalent; daily free credits (~66) for non-commercial use",
    freeOption: "Daily free credits, but non-commercial and watermarked on free tier",
    speed: "Moderate; queues vary with load",
    accuracy: "Best-in-class realistic motion and subject consistency (Kling 3.0 Omni)",
    ease: "Simple upload-and-prompt flow",
    pros: ["Best realistic human/portrait motion", "Native 4K 60fps on top tiers", "Generous daily free credits for testing"],
    cons: ["Free tier is non-commercial with watermark", "Credit system can be confusing", "Occasional queue times at peak"],
    keywords: ["kling alternative", "kling ai vs vidou", "best kling alternatives"],
  },
  {
    slug: "pika",
    name: "Pika",
    short: "Pika Labs",
    tagline: "Fast, fun, effect-driven clips — the beginner-friendly favorite.",
    color: "linear-gradient(135deg,#ec4899,#8b5cf6)",
    initial: "P",
    blurb:
      "Pika is the most beginner-friendly image-to-video tool, famous for playful effects (Pikaffects). Hard-capped at 5-second clips, 480p on the basic plan.",
    pricing: "From ~$10/mo; ~80 free credits/month at 480p",
    freeOption: "~80 credits/month free, capped at 480p and 5s",
    speed: "Fast — often seconds for a 5s clip",
    accuracy: "Good for stylized effects, weaker prompt adherence on complex scenes",
    ease: "Very easy; the simplest interface in the category",
    pros: ["Fastest generation in the category", "Best playful/stylized effects", "Genuinely easy for beginners"],
    cons: ["Hard 5-second cap, 480p on free/basic", "Weaker prompt adherence for realistic scenes", "Small monthly free allowance"],
    keywords: ["pika alternative", "pika labs vs vidou", "pika alternatives"],
  },
  {
    slug: "luma",
    name: "Luma Dream Machine",
    short: "Luma",
    tagline: "Ray 3.2 with keyframed camera moves and agent-driven workflows.",
    color: "linear-gradient(135deg,#0ea5e9,#6366f1)",
    initial: "L",
    blurb:
      "Luma Dream Machine (Ray 3.2/3.14) is loved for camera-led shots, keyframes, and fast cinematic exploration. No free video tier; paid from ~$10–30/mo.",
    pricing: "From ~$9.99/mo (Plus); no free video tier",
    freeOption: "No free video generation tier",
    speed: "Fast for 5s clips",
    accuracy: "Excellent for camera-led motion; strong cinematic look",
    ease: "Moderate; keyframe UI takes some learning",
    pros: ["Best keyframed camera control", "Fast, cinematic 1080p output", "Ray 3 line is a quality leader"],
    cons: ["No free tier for video", "Among the pricier entry plans", "Less suited to precise subject preservation"],
    keywords: ["luma alternative", "luma dream machine vs vidou", "best luma alternatives"],
  },
  {
    slug: "pixverse",
    name: "PixVerse",
    short: "PixVerse",
    tagline: "High-volume social clips with a daily free allowance.",
    color: "linear-gradient(135deg,#f59e0b,#ef4444)",
    initial: "X",
    blurb:
      "PixVerse V6 targets high-volume social creators with daily free credits, but the free tier is 540p and watermarked.",
    pricing: "From ~$10/mo; 60 initial + 30 daily free credits at 540p watermarked",
    freeOption: "Daily credits but 540p with watermark on free tier",
    speed: "Fast for short social clips",
    accuracy: "Good for stylized social content",
    ease: "Easy, template-driven",
    pros: ["Daily free credits for volume testing", "Built for social formats", "Templates speed up production"],
    cons: ["Free tier watermarked at 540p", "Paid tiers gate higher resolutions", "Less control over camera direction"],
    keywords: ["pixverse alternative", "pixverse vs vidou", "pixverse alternatives"],
  },
  {
    slug: "hailuo",
    name: "Hailuo AI (MiniMax)",
    short: "Hailuo",
    tagline: "The generous free-tier pick with daily refreshing credits.",
    color: "linear-gradient(135deg,#10b981,#0ea5e9)",
    initial: "H",
    blurb:
      "Hailuo (MiniMax) is often cited as the most usable completely free AI video generator, with daily free credits that refresh — but free output is watermarked.",
    pricing: "From ~$9/mo; daily refreshing free credits",
    freeOption: "Daily free credits, watermarked, non-commercial",
    speed: "Moderate",
    accuracy: "Good quality for a free-first tool",
    ease: "Very easy",
    pros: ["Most generous recurring free tier", "Simple interface", "Solid clip quality for social"],
    cons: ["Free videos are watermarked", "Non-commercial on free tier", "Slower at peak times"],
    keywords: ["hailuo alternative", "hailuo ai vs vidou", "best hailuo alternatives"],
  },
  {
    slug: "veo",
    name: "Google Veo (Flow)",
    short: "Veo 3.1",
    tagline: "Google's hyper-realism benchmark with native audio.",
    color: "linear-gradient(135deg,#4285f4,#34a853)",
    initial: "G",
    blurb:
      "Veo 3.1 via Google Flow is the hyper-realism benchmark with native audio, but access is credit-based and the free tier is tiny (3 videos/day at low res).",
    pricing: "Credit-based via Google Flow; ~50 daily credits on free tier",
    freeOption: "~3 videos/day free at low resolution, watermarked in some tiers",
    speed: "Slower; high-quality renders take time",
    accuracy: "Best-in-class realism and native audio (dialogue, SFX, music)",
    ease: "Moderate; Flow workspace is polished",
    pros: ["Best realism and physics", "Native audio generation", "Strong prompt understanding"],
    cons: ["Very small free allowance", "Credit costs add up fast", "Queue times for 4K"],
    keywords: ["veo alternative", "google veo vs vidou", "veo 3 alternatives"],
  },
];

export function getCompetitor(slug) {
  return COMPETITORS.find((c) => c.slug === slug);
}

export const COMPARISON_FAQS = (comp) => [
  {
    q: `Is Vidou a good ${comp.name} alternative?`,
    a: `Yes, especially if you want a frictionless free experience. Unlike ${comp.name}, Vidou requires no account, has no watermarks on output, and imposes no credit caps — you can generate unlimited 5-second image-to-video clips right in your browser. If you need ${comp.name}'s professional editing depth or longer clips, it may still be the better fit for that specific job.`,
  },
  {
    q: `${comp.name} vs Vidou — which is better?`,
    a: `For raw production power (longer clips, 4K, editing suites), ${comp.name} is stronger. For a free, private, unlimited way to animate images into 5-second videos with zero signup, Vidou wins. Many creators use Vidou for quick social clips and ${comp.name} for final production.`,
  },
  {
    q: `Is Vidou really free with no limits, unlike ${comp.name}?`,
    a: `Yes. ${comp.name} gates output behind credits or subscriptions${comp.freeOption.includes("no ") ? "" : " and often watermarks free results"}. Vidou's image-to-video tool is free forever with no login, no watermarks, and no per-day caps.`,
  },
  {
    q: `Does Vidou store my images like ${comp.name} does?`,
    a: `No. Vidou processes everything in your browser and never stores your uploads or generated videos on our servers. ${comp.name} processes on its own cloud infrastructure under its privacy policy.`,
  },
  {
    q: `What video length and resolution does Vidou output vs ${comp.name}?`,
    a: `Vidou generates 5-second clips at up to 1080p in the advanced workspace (720p on the free homepage tool), across five aspect ratios. ${comp.name} typically supports longer clips and higher resolutions on paid plans — that's the trade-off for its credit/subscription model.`,
  },
];

export const APP_FACTS = {
  pricing: "Free forever for the homepage tool; credit packs from $15.99 (300 credits) in the workspace",
  freeOption: "Yes — unlimited, no login, no watermark",
  speed: "Seconds per 5-second clip, fully in-browser",
  accuracy: "Strong motion coherence for portraits, products, and landscapes",
  ease: "Upload + one plain-language prompt; no prompt engineering needed",
  pros: ["Truly free with no login and no watermarks", "Runs in your browser — nothing stored on servers", "5 aspect ratios, up to 1080p, optional audio in workspace", "Unlimited generations, no daily caps"],
  cons: ["Clips are 5 seconds (by design, for fast iteration)", "Free homepage tool outputs 720p", "Processing requires the tab to stay open"],
};
