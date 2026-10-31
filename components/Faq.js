"use client";
import { useState } from "react";

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((f, i) => (
        <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            {f.q}
            <span className="chev">▾</span>
          </button>
          <div className="faq-a" style={{ maxHeight: open === i ? 300 : 0 }}>
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
