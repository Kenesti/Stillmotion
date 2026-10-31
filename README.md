# Stillmotion (Vidou rebuild)

Free AI image-to-video web app: upload any image, describe the motion, get a
seamless 5-second looping video. Includes a full SEO comparison funnel at
`/compare`.

## Run

```bash
npm install
npm run dev    # or: npm run build && npm start
```

## How generation works

Two engines, chosen automatically:

1. **Neural backend (remote)** — used when you configure a video-model API in
   `.env.local` (see `.env.example`):
   ```
   VIDOU_VIDEO_PROVIDER_URL=https://api.your-provider.com/v1/image-to-video
   VIDOU_VIDEO_PROVIDER_KEY=your-own-key
   ```
   The browser POSTs the image + prompt to `/api/generate`, which forwards it
   to your provider with your key (the key never leaves the server and is
   never committed). If the provider responds with a video URL, that result
   is shown. Any provider accepting multipart fields
   (`image, prompt, aspect_ratio, resolution, audio`) and returning
   `{ url | video_url | download_url }` works.
2. **Local engine (always available, default)** — a deterministic in-browser
   motion renderer: parses the prompt for camera move / atmosphere / pace and
   renders a seamless-looping 5s clip from the uploaded image on a canvas,
   recorded via MediaRecorder (optional WebAudio soundtrack). No account, no
   key, no upload leaves the browser.

## Stack

Next.js 16 (App Router) · React 19 · sharp (image analysis API) · vanilla CSS
design system · static prerendering + sitemap/robots · JSON-LD structured data
on comparison pages.
