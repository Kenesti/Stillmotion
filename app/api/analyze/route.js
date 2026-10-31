import { NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("image");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "Image too large (max 25MB)" }, { status: 400 });
    }
    const img = sharp(buf, { failOn: "none", unlimited: true });
    const meta = await img.metadata();
    const stats = await img.stats();
    const { data, info } = await sharp(buf)
      .resize(64, 64, { fit: "cover" })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let r = 0, g = 0, b = 0;
    const px = info.width * info.height;
    for (let i = 0; i < data.length; i += 3) {
      r += data[i]; g += data[i + 1]; b += data[i + 2];
    }
    r = Math.round(r / px); g = Math.round(g / px); b = Math.round(b / px);

    const luminance =
      0.2126 * stats.channels[0].mean +
      0.7152 * stats.channels[1].mean +
      0.0722 * stats.channels[2].mean;

    const brightness = luminance / 255;
    const saturation =
      stats.channels.length > 3
        ? Math.min(1, stats.channels[3].stdev / 60)
        : Math.min(1, (Math.max(r, g, b) - Math.min(r, g, b)) / 255);

    const dominant = ["Red", "Green", "Blue"][
      [r, g, b].indexOf(Math.max(r, g, b))
    ];

    let scene = "Balanced scene";
    if (brightness < 0.3) scene = "Dark / moody scene";
    else if (brightness > 0.72) scene = "Bright / high-key scene";
    if (saturation > 0.35) scene += " with vivid color";
    else if (saturation < 0.12) scene += " (near monochrome)";

    const motionScore = Math.round(
      55 + brightness * 25 + saturation * 20 + (meta.width >= meta.height ? 5 : 0)
    );

    return NextResponse.json({
      width: meta.width,
      height: meta.height,
      format: meta.format,
      aspect: +(meta.width / meta.height).toFixed(2),
      dominantColor: `rgb(${r}, ${g}, ${b})`,
      dominantHue: dominant,
      brightnessPct: Math.round(brightness * 100),
      saturationPct: Math.round(saturation * 100),
      sceneGuess: scene,
      motionSuitability: Math.min(99, motionScore),
      megapixels: +((meta.width * meta.height) / 1e6).toFixed(1),
    });
  } catch (e) {
    return NextResponse.json({ error: "Analysis failed: " + e.message }, { status: 500 });
  }
}
