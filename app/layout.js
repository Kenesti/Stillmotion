import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://vidou.app"),
  title: {
    default: "Vidou — Free AI Image to Video Generator",
    template: "%s | Vidou",
  },
  description:
    "Transform images into stunning videos with AI. Free, no login, unlimited usage. Create professional 5-second videos instantly.",
  openGraph: {
    type: "website",
    siteName: "Vidou",
    title: "Vidou — Free AI Image to Video Generator",
    description:
      "Transform images into stunning videos with AI. Free, no login, unlimited usage.",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "Vidou AI Image to Video Generator" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
