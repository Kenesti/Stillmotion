import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 14 }}>
              <span className="logo-mark">▶</span> vidou
            </Link>
            <p style={{ color: "var(--text-faint)", fontSize: 14, maxWidth: 300, margin: "14px 0 0" }}>
              Free AI image to video generator. Bring any image to life with a simple
              motion prompt — no login, no limits, fully private.
            </p>
          </div>
          <div>
            <h4>Tools</h4>
            <ul>
              <li><Link href="/">Image to Video</Link></li>
              <li><Link href="/image-to-video">Advanced Workspace</Link></li>
              <li><Link href="/text-to-video">Text to Video</Link></li>
              <li><Link href="/text-to-image">Text to Image</Link></li>
              <li><Link href="/image-edit">Image Editor</Link></li>
            </ul>
          </div>
          <div>
            <h4>Compare</h4>
            <ul>
              <li><Link href="/compare">All comparisons</Link></li>
              <li><Link href="/compare/runway">Vidou vs Runway</Link></li>
              <li><Link href="/compare/kling">Vidou vs Kling</Link></li>
              <li><Link href="/compare/pika">Vidou vs Pika</Link></li>
              <li><Link href="/compare/luma">Vidou vs Luma</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/login">Log in</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Vidou. All rights reserved.</span>
          <span>
            <Link href="/about" style={{ marginRight: 16 }}>About</Link>
            Privacy · Terms · Cookies
          </span>
        </div>
      </div>
    </footer>
  );
}
