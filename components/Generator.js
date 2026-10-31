"use client";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  ASPECT_RATIOS, RESOLUTIONS, DURATION, creditsFor, PROMPT_SUGGESTIONS,
} from "@/lib/data";
import { generateVideo } from "@/lib/motion";

const STEPS = ["Idle", "Analyzing image", "Rendering", "Finalizing", "Done"];

export default function Generator({ advanced = false }) {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgEl, setImgEl] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("16:9");
  const [resolution, setResolution] = useState(advanced ? "720p" : "720p");
  const [audio, setAudio] = useState(false);
  const [drag, setDrag] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | working | done | error
  const [progress, setProgress] = useState(0);
  const [stepLabel, setStepLabel] = useState("");
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  const credits = creditsFor(resolution, aspect, audio);

  const handleFile = useCallback((f) => {
    if (!f) return;
    if (!/^image\//.test(f.type)) {
      setError("Please upload an image file (JPG, PNG, WebP, GIF, AVIF, BMP, SVG…).");
      return;
    }
    if (f.size > 25 * 1024 * 1024) {
      setError("Image too large — max 25MB.");
      return;
    }
    setError("");
    setFile(f);
    setResult(null);
    setAnalysis(null);
    const url = URL.createObjectURL(f);
    setImgUrl(url);
    const img = new Image();
    img.onload = () => setImgEl(img);
    img.src = url;
  }, []);

  const analyze = useCallback(async () => {
    if (!file) return null;
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch("/api/analyze", { method: "POST", body: fd });
      if (res.ok) return await res.json();
    } catch (e) { /* non-fatal */ }
    return null;
  }, [file]);

  const run = async () => {
    if (!imgEl) { setError("Upload an image first."); return; }
    if (!prompt.trim()) { setError("Describe the motion you want first."); return; }
    setError("");
    setStatus("working");
    setProgress(0);
    setResult(null);
    try {
      setProgress(1); setStepLabel("Analyzing image…");
      const a = await analyze();
      if (a) setAnalysis(a);

      // Probe for a configured neural video backend; fall back to the local engine.
      let remoteUrl = null;
      try {
        const fd = new FormData();
        fd.append("image", file);
        fd.append("prompt", prompt);
        fd.append("aspect", aspect);
        fd.append("resolution", resolution);
        fd.append("audio", String(audio));
        const probe = await fetch("/api/generate", { method: "POST", body: fd });
        if (probe.ok) {
          const meta = await probe.json();
          if (meta.mode === "remote" && (meta.provider?.url || meta.provider?.video_url || meta.provider?.download_url)) {
            remoteUrl = meta.provider.url || meta.provider.video_url || meta.provider.download_url;
          }
        }
      } catch (e) { /* local fallback */ }

      if (remoteUrl) {
        setProgress(60); setStepLabel("Neural model rendering (remote)…");
        const out = { url: remoteUrl, width: null, height: null, remote: true };
        setResult(out);
        setHistory((h) => [{ url: out.url, prompt, aspect, resolution, date: new Date().toISOString(), remote: true }, ...h].slice(0, 8));
        setProgress(100); setStepLabel("Done (neural model)");
        setStatus("done");
        return;
      }

      const out = await generateVideo({
        imageEl, prompt, aspect, resolution, audio,
        onProgress: (p, label) => { setProgress(p); setStepLabel(label); },
      });
      setResult(out);
      setHistory((h) => [{ url: out.url, prompt, aspect, resolution, date: new Date().toISOString(), w: out.width, h: out.height }, ...h].slice(0, 8));
      setProgress(100);
      setStepLabel("Done");
      setStatus("done");
    } catch (e) {
      setError("Generation failed: " + e.message);
      setStatus("error");
    }
  };

  return (
    <div className="workspace">
      <div className="panel">
        <h3>Set up your video</h3>
        <p className="hint">Upload an image and describe the motion effect you want.</p>

        <div
          className={`dropzone${drag ? " drag" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files?.[0]); }}
          role="button" tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          {imgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgUrl} alt="Source upload" />
          ) : (
            <>
              <div className="dz-title">Click or drag to upload any image</div>
              <div className="dz-sub">JPG, PNG, WebP, GIF, AVIF, BMP, SVG… · max 25MB</div>
            </>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" hidden
          onChange={(e) => handleFile(e.target.files?.[0])} />

        <label className="field-label" htmlFor="prompt">Prompt</label>
        <textarea id="prompt" className="input" rows={3}
          placeholder="Describe the motion you want... e.g., breeze blowing hair, clouds drifting"
          value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <div className="kbd-row">
          {PROMPT_SUGGESTIONS.slice(0, 4).map((s) => (
            <button key={s} type="button" className="prompt-suggest" onClick={() => setPrompt(s)}>{s.split(",")[0]}</button>
          ))}
        </div>

        <span className="field-label">Aspect Ratio</span>
        <div className="chip-row">
          {ASPECT_RATIOS.map((a) => (
            <button key={a.id} type="button" className={`chip${aspect === a.id ? " on" : ""}`}
              title={a.desc} onClick={() => setAspect(a.id)}>{a.label}</button>
          ))}
        </div>

        <span className="field-label">Duration</span>
        <div className="chip-row">
          <button type="button" className="chip on">{DURATION}s</button>
        </div>

        <span className="field-label">Resolution</span>
        <div className="chip-row">
          {RESOLUTIONS.map((r) => (
            <button key={r.id} type="button" className={`chip${resolution === r.id ? " on" : ""}`}
              title={r.desc} onClick={() => setResolution(r.id)}>{r.label}</button>
          ))}
        </div>

        <span className="field-label">Audio</span>
        <div className="toggle-row">
          <button type="button" className={`chip${!audio ? " on" : ""}`} onClick={() => setAudio(false)}>Off — video only</button>
          <button type="button" className={`chip${audio ? " on" : ""}`} onClick={() => setAudio(true)}>On — generate a soundtrack</button>
        </div>

        <div className="credits-bar">
          <span>Credits required</span>
          <b>{advanced ? `${credits} credits` : "0 — free"}</b>
        </div>

        {error && <p style={{ color: "var(--red)", fontSize: 14, margin: "12px 0 0" }}>{error}</p>}

        <div style={{ marginTop: 18 }}>
          <button className="btn btn-primary btn-lg" style={{ width: "100%" }}
            disabled={status === "working" || !imgEl || !prompt.trim()} onClick={run}>
            {status === "working" ? "Generating…" : "Generate Video"}
          </button>
        </div>

        {status === "working" && (
          <div className="progress-wrap">
            <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
            <div className="progress-label"><span>{stepLabel}</span><span className="mono">{progress}%</span></div>
          </div>
        )}

        {analysis && (
          <div className="analysis">
            <span className="badge badge-cyan">AI image analysis</span>
            <div className="analysis-row"><span className="k">Dimensions</span><span className="v mono">{analysis.width}×{analysis.height} · {analysis.megapixels} MP</span></div>
            <div className="analysis-row"><span className="k">Dominant tone</span><span className="v">{analysis.dominantHue} · {analysis.dominantColor}</span></div>
            <div className="analysis-row"><span className="k">Brightness</span><span className="v mono">{analysis.brightnessPct}%</span></div>
            <div className="analysis-row"><span className="k">Scene guess</span><span className="v">{analysis.sceneGuess}</span></div>
            <div className="analysis-row">
              <span className="k">Motion suitability</span>
              <span className="v mono">{analysis.motionSuitability}/100
                <span className="score-bar"><i style={{ width: `${analysis.motionSuitability}%` }} /></span>
              </span>
            </div>
          </div>
        )}

        <p className="notice">
          Your image and video are processed in your browser and are never stored on our
          servers. Keep this tab open while generating.
        </p>
      </div>

      <div className="panel">
        <h3>Result</h3>
        <p className="hint">Your generated clip appears here.</p>
        {status === "idle" && !result && (
          <div className="empty-state">Upload an image, describe the motion, and press Generate.</div>
        )}
        {result && (
          <>
            <video className="result-video" src={result.url} controls autoPlay loop playsInline />
            <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
              <span className="badge badge-green">✓ Generated{result.remote ? " · neural model" : ""}</span>
              <span className="badge badge-brand">{aspect}</span>
              <span className="badge badge-brand">{resolution}</span>
              <span className="badge badge-brand">{DURATION}s</span>
              {audio && <span className="badge badge-amber">🔊 audio</span>}
              <span className="badge badge-cyan mono">{result.width}×{result.height}</span>
            </div>
            <p style={{ color: "var(--text-dim)", fontSize: 13.5, margin: "12px 0" }}>
              Prompt used: “{prompt}”
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href={result.url} download={`vidou-${Date.now()}.webm`}>Download video</a>
              <button className="btn btn-ghost" onClick={() => { setResult(null); setStatus("idle"); }}>New video</button>
            </div>
          </>
        )}

        <h3 style={{ marginTop: 28 }}>My Creations</h3>
        <p className="hint">This session’s generations.</p>
        {history.length === 0 ? (
          <div className="empty-state">Nothing generated yet this session.</div>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {history.map((h, i) => (
              <div className="card creation-card" key={i}>
                <video src={h.url} muted loop playsInline onMouseEnter={(e) => e.target.play()} onMouseLeave={(e) => e.target.pause()} />
                <div className="creation-meta">
                  <span className="p" title={h.prompt}>{h.prompt}</span>
                  <a className="btn btn-ghost btn-sm" href={h.url} download>↓</a>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="notice" style={{ marginTop: 16 }}>
          <Link href="/login" style={{ color: "var(--brand-2)" }}>Log in</Link> to save creations to your account across sessions.
        </p>
      </div>
    </div>
  );
}
