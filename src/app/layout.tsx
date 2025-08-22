import type { Metadata } from "next";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Exercise Explorer - Comprehensive Fitness Exercise Database",
    template: "%s | Exercise Explorer"
  },
  description: "Explore hundreds of fitness exercises with detailed instructions, muscle group targeting, equipment requirements, and instructional videos. Perfect for building your workout routine.",
  keywords: ["fitness", "exercises", "workout", "gym", "muscle groups", "training", "exercise database", "fitness guide", "workout routines"],
  authors: [{ name: "Exercise Explorer Team" }],
  creator: "Exercise Explorer",
  publisher: "Exercise Explorer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Exercise Explorer - Comprehensive Fitness Exercise Database",
    description: "Explore hundreds of fitness exercises with detailed instructions, muscle group targeting, and instructional videos.",
    url: "/",
    siteName: "Exercise Explorer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Exercise Explorer - Your Complete Fitness Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exercise Explorer - Comprehensive Fitness Exercise Database",
    description: "Explore hundreds of fitness exercises with detailed instructions and videos",
    images: ["/og-image.png"],
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
  category: "health fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
