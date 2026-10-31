"use client";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="section container" style={{ maxWidth: 460 }}>
      <div className="card" style={{ padding: 34 }}>
        <h1 style={{ margin: "0 0 8px", fontSize: 28, letterSpacing: "-0.02em" }}>Log in to Vidou</h1>
        <p style={{ color: "var(--text-dim)", fontSize: 14.5, margin: "0 0 22px" }}>
          Access your saved creations and the advanced workspace. The free homepage tool needs no account.
        </p>
        {sent ? (
          <div className="empty-state" style={{ borderColor: "rgba(52,211,153,.4)", color: "var(--green)" }}>
            ✓ Magic link sent to {email}. Check your inbox.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}>
            <label className="field-label" htmlFor="email" style={{ marginTop: 0 }}>Email</label>
            <input id="email" type="email" required className="input" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: 18 }} type="submit">
              Send magic link
            </button>
          </form>
        )}
        <p className="notice">Demo build: any email works — no real message is sent.</p>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 14, color: "var(--text-faint)" }}>
          <Link href="/" style={{ color: "var(--brand-2)" }}>← Back to the free generator</Link>
        </p>
      </div>
    </section>
  );
}
