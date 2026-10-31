import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

// Pluggable neural video backend.
// Configure at runtime (never commit secrets):
//   VIDOU_VIDEO_PROVIDER_URL  e.g. https://api.example.com/v1/image-to-video
//   VIDOU_VIDEO_PROVIDER_KEY  your own API key (sent as Bearer)
//   VIDOU_VIDEO_PROVIDER_POLL  optional poll URL template with {id}
// When unset, the route reports mode "local" and the client uses the
// built-in in-browser motion engine.

export async function POST(req) {
  const url = process.env.VIDOU_VIDEO_PROVIDER_URL;
  const key = process.env.VIDOU_VIDEO_PROVIDER_KEY;

  if (!url || !key) {
    return NextResponse.json({ mode: "local" });
  }

  try {
    const form = await req.formData();
    const image = form.get("image");
    const prompt = String(form.get("prompt") || "");
    const aspect = String(form.get("aspect") || "16:9");
    const resolution = String(form.get("resolution") || "720p");
    const audio = String(form.get("audio") || "false") === "true";

    if (!image || typeof image === "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const out = new FormData();
    out.append("image", image, image.name || "input");
    out.append("prompt", prompt);
    out.append("aspect_ratio", aspect);
    out.append("resolution", resolution);
    out.append("audio", String(audio));

    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: out,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(
        { mode: "local", warning: `Provider returned ${res.status}; falling back to local engine.`, detail: data?.error || data?.message },
        { status: 200 }
      );
    }
    return NextResponse.json({ mode: "remote", provider: data });
  } catch (e) {
    return NextResponse.json({ mode: "local", warning: "Provider unreachable; using local engine. " + e.message });
  }
}
