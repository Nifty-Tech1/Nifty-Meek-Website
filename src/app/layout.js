import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nifty Meek | Building Real Systems in Public",
  description:
    "Nifty Meek builds production systems and documents the entire journey. Real execution, real lessons, real wins.",
  keywords: [
    "building in public",
    "software development",
    "systems design",
    "founder journey",
    "tech blog",
  ],
  authors: [{ name: "Nifty Meek" }],
  creator: "Nifty Meek",
  metadataBase: new URL("https://niftymeek.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://niftymeek.vercel.app",
    siteName: "Nifty Meek",
    title: "Nifty Meek | Building Real Systems in Public",
    description:
      "Nifty Meek builds production systems and documents the entire journey. Real execution, real lessons, real wins.",
    images: [
      {
        url: "https://niftymeek.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nifty Meek - Building Real Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nifty Meek | Building scalable systems from Zambia — publicly",
    description:
      "Nifty Meek builds production systems and documents the entire journey.",
    images: ["https://niftymeek.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google2a0822cefe2ac159",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nifty Meek",
    url: "https://niftymeek.vercel.app",
    description: "Building real systems in public. Execution over ideas.",
    image: "https://niftymeek.vercel.app/og-image.png",
    sameAs: [
      "https://twitter.com",
      "https://github.com",
      "https://linkedin.com",
    ],
    jobTitle: "Founder & Engineer",
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent)]" />
        {children}
        <Toaster position="top-right" richColors closeButton />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
