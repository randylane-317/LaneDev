import type { Metadata, Viewport } from "next";
import { Syne, Figtree } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LaneDev — Freelance Software & Web Developer",
  description:
    "Freelance software and web developer based in Indiana. I build fast, modern, conversion-focused websites and custom software for businesses that mean business.",
  metadataBase: new URL("https://lanedev.co"),
  openGraph: {
    title: "LaneDev — Freelance Software & Web Developer",
    description:
      "Freelance software and web developer based in Indiana. Fast, modern, conversion-focused.",
    url: "https://lanedev.co",
    siteName: "LaneDev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaneDev — Freelance Software & Web Developer",
    description: "Freelance software and web developer based in Indiana.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${figtree.variable}`}>
      <body className="font-figtree">{children}</body>
    </html>
  );
}
