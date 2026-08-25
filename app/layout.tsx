import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chandler-parts.greenshoegarage.chatgpt.site"),
  title: "CHANDLER — Curated Hardware Library",
  description: "A trusted, local-first common-parts library and sourcing workbench for better prototypes.",
  applicationName: "CHANDLER",
  other: { "codex-preview": "development" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "CHANDLER",
    description: "A trusted parts library for better prototypes.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CHANDLER — A trusted parts library for better prototypes." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHANDLER",
    description: "A trusted parts library for better prototypes.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
