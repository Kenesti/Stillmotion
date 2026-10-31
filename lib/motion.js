// Prompt parsing + seamless-loop canvas motion engine. Pure client-side, deterministic per prompt.
// Every animated quantity is a periodic function of the loop phase, so the last frame
// matches the first frame and the rendered clip loops seamlessly.

const CAMERA_PATTERNS = [
  { re: /push[\s-]?in|zoom[\s-]?in|dolly[\s-]?in|close[\s-]?in/i, type: "pushin", amp: 1 },
  { re: /zoom[\s-]?out|pull[\s-]?out|dolly[\s-]?out|reveal/i, type: "zoomout", amp: 1 },
  { re: /orbit|circle around|360/i, type: "orbit", amp: 1 },
  { re: /pan[\s-]?left|truck[\s-]?left/i, type: "panleft", amp: 1 },
  { re: /pan[\s-]?right|truck[\s-]?right/i, type: "panright", amp: 1 },
  { re: /tilt[\s-]?up/i, type: "tiltup", amp: 1 },
  { re: /tilt[\s-]?down/i, type: "tiltdown", amp: 1 },
  { re: /slow (push|zoom)/i, type: "pushin", amp: 0.6 },
  { re: /static|locked[\s-]?off|no camera/i, type: "static", amp: 0 },
];

const ATMOSPHERE_PATTERNS = [
  { re: /wind|breeze|blow/i, kind: "wind" },
  { re: /rain|drizzle/i, kind: "rain" },
  { re: /snow/i, kind: "snow" },
  { re: /flicker|neon|glow/i, kind: "flicker" },
  { re: /mist|fog|haze|swirl/i, kind: "mist" },
  { re: /ripple|water|wave|shimmer|ocean|sea/i, kind: "ripple" },
  { re: /sparkle|twinkle|glitter|stars/i, kind: "sparkle" },
  { re: /fire|flame|ember|campfire/i, kind: "fire" },
  { re: /light|beam|sun|sunset|golden|dusk|dawn/i, kind: "light" },
  { re: /cloud/i, kind: "cloud" },
  { re: /dust|pollen|particle/i, kind: "dust" },
];

const PACE_PATTERNS = [
  { re: /slow|calm|gentle|soft|serene|lazy/i, pace: 0.55 },
  { re: /fast|quick|rapid|energetic|dynamic|rush/i, pace: 1.6 },
  { re: /steady|continuous|smooth|flowing/i, pace: 1.0 },
];

export function parsePrompt(prompt) {
  const p = (prompt || "").toLowerCase();
  let camera = { type: "pushin", amp: 0.8 };
  for (const c of CAMERA_PATTERNS) {
    if (c.re.test(p)) { camera = { type: c.type, amp: c.amp }; break; }
  }
  const atmospheres = ATMOSPHERE_PATTERNS.filter((a) => a.re.test(p)).map((a) => a.kind);
  if (atmospheres.length === 0) atmospheres.push("drift");
  let pace = 1.0;
  for (const pc of PACE_PATTERNS) {
    if (pc.re.test(p)) { pace = pc.pace; break; }
  }
  const hasPreserve = /preserve|keep|stable|fixed|must stay/i.test(p);
  const seed = [...p].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return { camera, atmospheres, pace, hasPreserve, seed };
}

export function mulberry(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Build a deterministic particle field once per generation.
export function buildField(kind, W, H, seed) {
  const rnd = mulberry(seed * 7919 + kind.length * 131 + W);
  const n = { rain: 70, snow: 46, sparkle: 30, dust: 26, wind: 16, mist: 5, ripple: 8, flicker: 6, fire: 9, light: 3, cloud: 6, drift: 12 }[kind] || 12;
  const parts = [];
  for (let i = 0; i < n; i++) {
    parts.push({
      x: rnd() * W,
      y: rnd() * H,
      r: 0.8 + rnd() * 2.4,
      ph: rnd() * Math.PI * 2,
      sp: 0.4 + rnd() * 1.2,
      len: 10 + rnd() * 26,
    });
  }
  return parts;
}

export function renderFrame(ctx, img, W, H, frame, totalFrames, parsed, fields) {
  const { camera, atmospheres, pace, seed } = parsed;
  const t = (frame / totalFrames) * 5;
  // Periodic loop phase: frame==totalFrames maps exactly onto frame==0 (seamless loop)
  const ph = (frame / totalFrames) * Math.PI * 2 * pace;
  const loop = (x) => 0.5 - 0.5 * Math.cos(x); // 0→1→0 over one period, seamless

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);

  // --- Camera: oscillating so the clip loops seamlessly ---
  let scale = 1.1, ox = 0, oy = 0, rot = 0;
  switch (camera.type) {
    case "pushin": scale = 1.04 + 0.13 * loop(ph) * camera.amp; break;
    case "zoomout": scale = 1.17 - 0.12 * loop(ph) * camera.amp; break;
    case "orbit":
      scale = 1.1;
      rot = Math.sin(ph) * 0.028;
      ox = Math.sin(ph) * W * 0.014;
      oy = (Math.cos(ph) - 1) * H * 0.014;
      break;
    case "panleft": scale = 1.13; ox = -loop(ph) * W * 0.09 * camera.amp + Math.sin(ph * 3) * 1.2; break;
    case "panright": scale = 1.13; ox = loop(ph) * W * 0.09 * camera.amp + Math.sin(ph * 3) * 1.2; break;
    case "tiltup": scale = 1.13; oy = -loop(ph) * H * 0.09 * camera.amp + Math.cos(ph * 2) * 1.2; break;
    case "tiltdown": scale = 1.13; oy = loop(ph) * H * 0.09 * camera.amp + Math.cos(ph * 2) * 1.2; break;
    default: scale = 1.05 + Math.sin(ph) * 0.012; break;
  }
  // handheld micro-shake (periodic → seamless)
  ox += Math.sin(ph * 3 + 1.7) * 1.4;
  oy += Math.cos(ph * 4 + 0.6) * 1.1;
  scale += Math.sin(ph * 0.5) * 0.006;

  const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
  const base = Math.max(W / iw, H / ih) * scale;
  const dw = iw * base, dh = ih * base;

  ctx.save();
  ctx.translate(W / 2 + ox, H / 2 + oy);
  ctx.rotate(rot);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();

  // --- Periodic color grade (warm/cool breathing, loops cleanly) ---
  const grade = Math.sin(ph * 0.5 + seed % 7);
  const cg = ctx.createLinearGradient(0, 0, W, H);
  cg.addColorStop(0, `rgba(255,190,120,${0.05 * Math.max(0, grade)})`);
  cg.addColorStop(1, `rgba(90,130,255,${0.05 * Math.max(0, -grade)})`);
  ctx.fillStyle = cg;
  ctx.fillRect(0, 0, W, H);

  // --- Atmospheric overlays (all periodic) ---
  const fade = Math.sin(Math.min(1, t * 2.5) * Math.PI / 2) * Math.sin(Math.min(1, (5 - t) * 2.5) * Math.PI / 2);
  for (const kind of atmospheres) {
    drawAtmosphere(ctx, W, H, ph, kind, seed, fade, pace, fields[kind]);
  }

  // --- Vignette ---
  const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.38, W / 2, H / 2, Math.max(W, H) * 0.78);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.32)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // --- Film grain: seeded by frame index mod totalFrames → frame N equals frame 0 ---
  drawGrain(ctx, W, H, seed + (frame % totalFrames));
}

function drawAtmosphere(ctx, W, H, ph, kind, seed, alpha, pace, parts) {
  if (!parts) parts = buildField(kind, W, H, seed);
  ctx.save();
  if (kind === "wind" || kind === "drift") {
    ctx.strokeStyle = `rgba(255,255,255,${0.055 * alpha})`;
    ctx.lineWidth = 1.4;
    for (const p of parts) {
      const x = ((p.x + ph * 14 * p.sp * pace) % (W + 140)) - 70;
      const y = p.y + Math.sin(ph + p.ph) * 6;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + 26, y - 7, x + 60, y + 7, x + p.len + 50, y);
      ctx.stroke();
    }
  } else if (kind === "rain") {
    ctx.strokeStyle = `rgba(185,205,255,${0.17 * alpha})`;
    ctx.lineWidth = 1;
    for (const p of parts) {
      const y = (p.y + ph * 60 * p.sp * pace) % H;
      const x = (p.x + ph * 8 * p.sp) % W;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 3 - p.sp, y + 12 + p.sp * 4); ctx.stroke();
    }
  } else if (kind === "snow") {
    ctx.fillStyle = `rgba(255,255,255,${0.55 * alpha})`;
    for (const p of parts) {
      const y = (p.y + ph * 9 * p.sp * pace) % H;
      const x = (p.x + Math.sin(ph * 2 + p.ph) * 16 + ph * 4) % W;
      ctx.beginPath(); ctx.arc((x + W) % W, y, p.r * 0.8, 0, 7); ctx.fill();
    }
  } else if (kind === "flicker" || kind === "fire") {
    for (const p of parts) {
      const fl = 0.5 + 0.5 * Math.sin(ph * (2 + p.sp * 2) + p.ph * 3);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 34 + fl * 34);
      const col = kind === "fire" ? "255,140,40" : "170,130,255";
      g.addColorStop(0, `rgba(${col},${0.17 * fl * alpha})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(p.x - 80, p.y - 80, 160, 160);
    }
  } else if (kind === "mist" || kind === "cloud") {
    for (const p of parts) {
      const y = p.y;
      const x = ((p.x + Math.sin(ph * 0.4 + p.ph) * W * 0.1) % (W + 300)) - 150;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 130 + p.r * 40);
      g.addColorStop(0, `rgba(205,215,235,${(kind === "cloud" ? 0.10 : 0.07) * alpha})`);
      g.addColorStop(1, "rgba(205,215,235,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - 220, y - 160, 440, 320);
    }
  } else if (kind === "ripple") {
    ctx.strokeStyle = `rgba(255,255,255,${0.09 * alpha})`;
    ctx.lineWidth = 1.2;
    const cx = W / 2, cy = H * 0.68;
    for (let i = 0; i < parts.length; i++) {
      const r = ((ph / (Math.PI * 2) * 260 + i * 34) % 260);
      ctx.beginPath(); ctx.ellipse(cx, cy, r * 1.7, r * 0.5, 0, 0, 7); ctx.stroke();
    }
  } else if (kind === "sparkle") {
    for (const p of parts) {
      const tw = Math.sin(ph * (1.5 + p.sp) + p.ph * 2);
      if (tw > 0.55) {
        ctx.fillStyle = `rgba(255,255,240,${(tw - 0.55) * 1.6 * alpha})`;
        const s = p.r * 2.2;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
    }
  } else if (kind === "dust") {
    ctx.fillStyle = `rgba(255,240,210,${0.25 * alpha})`;
    for (const p of parts) {
      const x = (p.x + Math.sin(ph * 0.7 + p.ph) * 22) % W;
      const y = (p.y + Math.cos(ph * 0.5 + p.ph) * 14 + ph * 3) % H;
      ctx.beginPath(); ctx.arc((x + W) % W, (y + H) % H, p.r * 0.6, 0, 7); ctx.fill();
    }
  } else if (kind === "light") {
    const l = 0.5 + 0.5 * Math.sin(ph * 0.8);
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, `rgba(255,240,200,${0.11 * l * alpha})`);
    g.addColorStop(1, "rgba(120,160,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();
}

function drawGrain(ctx, W, H, seed) {
  const rnd = mulberry(seed);
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 420; i++) {
    ctx.fillRect(rnd() * W, rnd() * H, 1, 1);
  }
  ctx.restore();
}

export function dimsFor(aspect, resolution) {
  const map = {
    "9:16": [0.5625, 1], "3:4": [0.75, 1], "1:1": [1, 1], "4:3": [1.333, 1], "16:9": [1.777, 1],
  };
  const res = { "480p": 480, "720p": 720, "1080p": 1080 }[resolution] || 720;
  let [rw, rh] = map[aspect] || map["16:9"];
  if (rw >= rh) return { w: Math.round((res * rw) / 16) * 16, h: res };
  return { w: res, h: Math.round((res * rh) / rw / 16) * 16 };
}

export async function generateVideo({ imageEl, prompt, aspect, resolution, audio, onProgress }) {
  const parsed = parsePrompt(prompt);
  const { w, h } = dimsFor(aspect, resolution);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");

  const stream = canvas.captureStream(30);
  let audioStream = null;
  if (audio) {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ac = new AC();
      const dest = ac.createMediaStreamDestination();
      const osc = ac.createOscillator();
      const osc2 = ac.createOscillator();
      const gain = ac.createGain();
      const filter = ac.createBiquadFilter();
      osc.type = "sine"; osc.frequency.value = 110 + (parsed.seed % 60);
      osc2.type = "triangle"; osc2.frequency.value = 165 + (parsed.seed % 40);
      filter.type = "lowpass"; filter.frequency.value = 600;
      gain.gain.value = 0.0;
      gain.gain.linearRampToValueAtTime(0.12, ac.currentTime + 1);
      gain.gain.linearRampToValueAtTime(0.0, ac.currentTime + 4.8);
      osc.connect(filter); osc2.connect(filter);
      filter.connect(gain); gain.connect(dest); gain.connect(ac.destination);
      osc.start(); osc2.start();
      osc.stop(ac.currentTime + 5); osc2.stop(ac.currentTime + 5);
      audioStream = dest.stream;
      setTimeout(() => ac.close(), 5200);
    } catch (e) { /* audio unsupported — video only */ }
  }
  if (audioStream) {
    for (const track of audioStream.getAudioTracks()) stream.addTrack(track);
  }

  const mime = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm", "video/mp4"]
    .find((m) => window.MediaRecorder && MediaRecorder.isTypeSupported(m)) || "";
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 8_000_000 } : undefined);
  const chunks = [];
  rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };

  const T = 5, fps = 30, frames = T * fps;
  const fields = {};
  for (const kind of parsed.atmospheres) fields[kind] = buildField(kind, w, h, parsed.seed);

  onProgress(2, "Warming up motion engine…");
  await new Promise((r) => setTimeout(r, 50));

  const done = new Promise((resolve) => { rec.onstop = resolve; });
  rec.start(200);

  for (let f = 0; f <= frames; f++) {
    renderFrame(ctx, imageEl, w, h, f, frames, parsed, fields);
    onProgress(3 + Math.round((f / frames) * 94), `Rendering frame ${f}/${frames}`);
    await new Promise((r) => setTimeout(r, 1000 / fps));
  }
  rec.stop();
  await done;
  stream.getTracks().forEach((tr) => tr.stop());
  const blob = new Blob(chunks, { type: mime || "video/webm" });
  return { blob, url: URL.createObjectURL(blob), parsed, width: w, height: h, mime: mime || "video/webm" };
}
