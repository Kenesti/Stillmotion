// Prompt parsing + canvas motion engine. Pure client-side, deterministic per prompt.

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
  { re: /ripple|water|wave|shimmer/i, kind: "ripple" },
  { re: /sparkle|twinkle|glitter/i, kind: "sparkle" },
  { re: /fire|flame|ember/i, kind: "fire" },
  { re: /light|beam|sun/i, kind: "light" },
];

const PACE_PATTERNS = [
  { re: /slow|calm|gentle|soft|serene/i, pace: 0.55 },
  { re: /fast|quick|rapid|energetic|dynamic/i, pace: 1.5 },
  { re: /steady|continuous|smooth/i, pace: 1.0 },
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

export function renderFrame(ctx, img, W, H, t, parsed, particles) {
  const { camera, atmospheres, pace, seed } = parsed;
  const T = 5; // seconds
  const ph = (t / T) * Math.PI * 2 * pace;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);

  // Camera transform
  let scale = 1.08, ox = 0, oy = 0, rot = 0;
  const ease = t / T;
  switch (camera.type) {
    case "pushin": scale = 1.02 + 0.16 * ease * camera.amp; break;
    case "zoomout": scale = 1.18 - 0.14 * ease * camera.amp; break;
    case "orbit": scale = 1.1; rot = Math.sin(ph) * 0.03; ox = Math.sin(ph) * W * 0.012; oy = Math.cos(ph) * H * 0.012; break;
    case "panleft": scale = 1.12; ox = (0.5 - ease) * W * 0.1 * camera.amp; break;
    case "panright": scale = 1.12; ox = (ease - 0.5) * W * 0.1 * camera.amp; break;
    case "tiltup": scale = 1.12; oy = (0.5 - ease) * H * 0.1 * camera.amp; break;
    case "tiltdown": scale = 1.12; oy = (ease - 0.5) * H * 0.1 * camera.amp; break;
    default: scale = 1.04 + Math.sin(ph) * 0.015; break;
  }

  // Ken Burns breathing overlay
  scale += Math.sin(ph * 0.5) * 0.008;

  const iw = img.width, ih = img.height;
  const base = Math.max(W / iw, H / ih) * scale;
  const dw = iw * base, dh = ih * base;

  ctx.save();
  ctx.translate(W / 2 + ox, H / 2 + oy);
  ctx.rotate(rot);
  ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
  ctx.restore();

  // Atmospheric overlays
  const alpha = Math.min(1, t * 2) * Math.min(1, (T - t) * 2);
  for (const kind of atmospheres) {
    drawAtmosphere(ctx, W, H, t, kind, ph, seed, alpha, pace);
  }

  // Vignette
  const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.35, W / 2, H / 2, Math.max(W, H) * 0.75);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // Film grain
  drawGrain(ctx, W, H, seed + Math.floor(t * 24));
}

function drawAtmosphere(ctx, W, H, t, kind, ph, seed, alpha, pace) {
  const rnd = mulberry(seed + kind.length * 131);
  ctx.save();
  if (kind === "wind" || kind === "drift") {
    ctx.strokeStyle = `rgba(255,255,255,${0.05 * alpha})`;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 14; i++) {
      const y0 = rnd() * H;
      const speed = (0.02 + rnd() * 0.05) * W * pace;
      const x = ((rnd() * W + t * speed) % (W + 120)) - 60;
      ctx.beginPath();
      ctx.moveTo(x, y0);
      ctx.bezierCurveTo(x + 30, y0 - 8, x + 70, y0 + 8, x + 110, y0);
      ctx.stroke();
    }
  } else if (kind === "rain") {
    ctx.strokeStyle = `rgba(180,200,255,${0.16 * alpha})`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 60; i++) {
      const x = (rnd() * W + t * 40 * pace) % W;
      const y = (rnd() * H + t * (300 + rnd() * 200) * pace) % H;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 4, y + 14); ctx.stroke();
    }
  } else if (kind === "snow") {
    ctx.fillStyle = `rgba(255,255,255,${0.5 * alpha})`;
    for (let i = 0; i < 40; i++) {
      const x = (rnd() * W + Math.sin(t + i) * 20 + t * 10) % W;
      const y = (rnd() * H + t * (30 + rnd() * 40) * pace) % H;
      ctx.beginPath(); ctx.arc(x < 0 ? x + W : x, y, 1.6, 0, 7); ctx.fill();
    }
  } else if (kind === "flicker" || kind === "fire") {
    const n = kind === "fire" ? 8 : 5;
    for (let i = 0; i < n; i++) {
      const x = rnd() * W, y = rnd() * H;
      const fl = 0.5 + 0.5 * Math.sin(ph * (2 + i * 0.7) + i * 2.1);
      const g = ctx.createRadialGradient(x, y, 0, x, y, 40 + fl * 30);
      const col = kind === "fire" ? "255,140,40" : "160,120,255";
      g.addColorStop(0, `rgba(${col},${0.16 * fl * alpha})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - 80, y - 80, 160, 160);
    }
  } else if (kind === "mist") {
    for (let i = 0; i < 4; i++) {
      const y = H * (0.25 + i * 0.2);
      const off = Math.sin(ph * 0.6 + i) * W * 0.08 + t * 6 * pace;
      const g = ctx.createLinearGradient(0, y - 60, 0, y + 60);
      g.addColorStop(0, "rgba(200,210,230,0)");
      g.addColorStop(0.5, `rgba(200,210,230,${0.07 * alpha})`);
      g.addColorStop(1, "rgba(200,210,230,0)");
      ctx.fillStyle = g;
      ctx.fillRect(((off % (W * 1.2)) + W * 1.2) % (W * 1.2) - W * 0.1, y - 60, W * 0.5, 120);
    }
  } else if (kind === "ripple") {
    ctx.strokeStyle = `rgba(255,255,255,${0.08 * alpha})`;
    ctx.lineWidth = 1.2;
    const cx = W / 2, cy = H * 0.65;
    for (let i = 1; i < 8; i++) {
      const r = ((t * 30 * pace + i * 26) % 200);
      ctx.beginPath(); ctx.ellipse(cx, cy, r * 1.6, r * 0.5, 0, 0, 7); ctx.stroke();
    }
  } else if (kind === "sparkle") {
    for (let i = 0; i < 24; i++) {
      const x = rnd() * W, y = rnd() * H;
      const tw = Math.max(0, Math.sin(ph * 2 + i * 1.7));
      if (tw > 0.6) {
        ctx.fillStyle = `rgba(255,255,240,${(tw - 0.6) * 0.9 * alpha})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  } else if (kind === "light") {
    const g = ctx.createLinearGradient(0, 0, W, H);
    const l = 0.5 + 0.5 * Math.sin(ph * 0.8);
    g.addColorStop(0, `rgba(255,240,200,${0.10 * l * alpha})`);
    g.addColorStop(1, "rgba(120,160,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();
}

function drawGrain(ctx, W, H, seed) {
  const rnd = mulberry(seed);
  ctx.save();
  ctx.globalAlpha = 0.035;
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 400; i++) {
    ctx.fillRect(rnd() * W, rnd() * H, 1, 1);
  }
  ctx.restore();
}

export function mulberry(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime, videoBitsPerSecond: 6_000_000 } : undefined);
  const chunks = [];
  rec.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };

  const T = 5, fps = 30, frames = T * fps;
  onProgress(2, "Warming up motion engine…");
  await new Promise((r) => setTimeout(r, 50));

  const done = new Promise((resolve) => { rec.onstop = resolve; });
  rec.start(200);

  for (let f = 0; f <= frames; f++) {
    const t = (f / fps);
    renderFrame(ctx, imageEl, w, h, t, parsed);
    onProgress(3 + Math.round((f / frames) * 94), `Rendering frame ${f}/${frames}`);
    await new Promise((r) => setTimeout(r, 1000 / fps));
  }
  rec.stop();
  await done;
  stream.getTracks().forEach((tr) => tr.stop());
  const blob = new Blob(chunks, { type: mime || "video/webm" });
  return { blob, url: URL.createObjectURL(blob), parsed, width: w, height: h, mime: mime || "video/webm" };
}
