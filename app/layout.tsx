import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Using Space Grotesk as a stand-in for both display and body
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdul-Mueez Shahid | Portfolio",
  description: "A Computer Science student merging theoretical depth with practical deployment.",
  openGraph: {
    title: "Abdul-Mueez Shahid | Portfolio",
    description: "A Computer Science student merging theoretical depth with practical deployment.",
    url: "https://abdulmueezdev.github.io",
    siteName: "Abdul-Mueez Portfolio",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceGrotesk.className} scroll-smooth antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#2F3640] text-white">
        {children}
      </body>
    </html>
  );
}
