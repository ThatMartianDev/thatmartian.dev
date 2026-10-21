import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { createPageMetadata, siteUrl } from "@/src/helpers/metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createPageMetadata(
    "Ahmed Mohammed | Full-Stack Product Engineer",
    "Ahmed Mohammed is a Full-Stack Product Engineer in Cairo, building web products with React, TypeScript, AI integrations, and cloud infrastructure.",
    "/",
  ),
  metadataBase: new URL(siteUrl),
  applicationName: "ThatMartianDev",
  authors: [{ name: "Ahmed Mohammed", url: siteUrl }],
  keywords: [
    "Ahmed Mohammed",
    "ThatMartianDev",
    "Full-Stack Product Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "UX/UI Design",
    "AI Integrations",
    "Workflow Automation",
    "Cloud Infrastructure",
    "AWS",
    "Azure",
    "Cairo",
    "Egypt",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
