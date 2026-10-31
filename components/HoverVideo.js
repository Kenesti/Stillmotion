"use client";

export default function HoverVideo({ src, poster, className }) {
  return (
    <video
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      onMouseEnter={(e) => e.target.play()}
      onMouseLeave={(e) => e.target.pause()}
    />
  );
}
