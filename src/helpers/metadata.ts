import type { Metadata } from "next";

export const siteUrl = "https://thatmartian.dev";

const socialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "ThatMartianDev - Ahmed Mohammed, Full-Stack Product Engineer, designing, building, and shipping software products.",
};

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "ThatMartianDev",
      type: "website",
      locale: "en_US",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
