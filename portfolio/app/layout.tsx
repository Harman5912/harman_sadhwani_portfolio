import type { Metadata, Viewport } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import { SITE_URL } from "./site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Harman Sadhwani — AI/ML Full Stack Developer",
    template: "%s | Harman Sadhwani",
  },
  description:
    "Harman Sadhwani — Founder & Core Developer of Crown Pierce. AI/ML Full Stack Developer, researcher, hackathon enthusiast and open source developer building intelligent software with premium design.",
  keywords: [
    "Harman Sadhwani",
    "AI/ML Full Stack Developer",
    "Full Stack Developer",
    "Artificial Intelligence Developer",
    "Machine Learning Engineer",
    "Crown Pierce",
    "Software Developer India",
    "Hackathon Enthusiast",
    "Open Source Developer",
  ],
  authors: [{ name: "Harman Sadhwani", url: SITE_URL }],
  creator: "Harman Sadhwani",
  publisher: "Harman Sadhwani",
  category: "Portfolio",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Harman Sadhwani — AI/ML Full Stack Developer",
    description:
      "Founder & Core Developer of Crown Pierce. Building intelligent software, AI-powered products and developer tools.",
    url: SITE_URL,
    siteName: "Harman Sadhwani",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/pro.png",
        width: 420,
        height: 420,
        alt: "Harman Sadhwani — AI/ML Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harman Sadhwani — AI/ML Full Stack Developer",
    description:
      "Founder & Core Developer of Crown Pierce. Building intelligent software, AI-powered products and developer tools.",
    images: ["/pro.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
