import type { Metadata, Viewport } from "next";
import { Playfair_Display, Sora } from "next/font/google";
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
  metadataBase: new URL("https://harman-sadhwani.vercel.app"),
  title: "Harman Sadhwani — AI/ML Full Stack Developer",
  description:
    "Harman Sadhwani — Founder & Core Developer of Crown Pierce. AI/ML Full Stack Developer, researcher, hackathon enthusiast and open source developer building intelligent software with premium design.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Harman Sadhwani — AI/ML Full Stack Developer",
    description:
      "Founder & Core Developer of Crown Pierce. Building intelligent software, AI-powered products and developer tools.",
    type: "website",
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
