"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Image to Video" },
  { href: "/image-to-video", label: "Workspace" },
  { href: "/text-to-video", label: "Text to Video" },
  { href: "/text-to-image", label: "Text to Image" },
  { href: "/image-edit", label: "Image Editor" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/compare", label: "Compare" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="nav">
      <div className="container-wide nav-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">▶</span>
          vidou
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href)) ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <Link href="/login" className="btn btn-ghost btn-sm">Log in</Link>
          <Link href="/#try" className="btn btn-primary btn-sm">Try Free</Link>
        </div>
      </div>
    </header>
  );
}
