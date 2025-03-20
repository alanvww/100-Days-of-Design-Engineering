import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ViewTransitions } from 'next-view-transitions'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "100 Days of Design Engineering by Alan Ren",
  description: "Showcase of Alan's design engineering journey over 100 days.",
  openGraph: {
    title: "100 Days of Design Engineering by Alan Ren",
    description: "Showcase of Alan's design engineering journey over 100 days.",
    type: "website",
    siteName: "100 Days of Design Engineering",
  },
  twitter: {
    card: "summary_large_image",
    title: "100 Days of Design Engineering by Alan Ren",
    description: "Showcase of Alan's design engineering journey over 100 days.",
    creator: "@alanvww",
  },
  manifest: '/site.webmanifest',
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
          <link rel="manifest" href="site.webmanifest" />
          <meta name="theme-color" content="#000000" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
