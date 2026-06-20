import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { photographer } from "@/data";

export const metadata: Metadata = {
  title: {
    default: `${photographer.studio} | Award-Winning Photography`,
    template: `%s | ${photographer.studio}`,
  },
  description: `${photographer.subTagline} Based in ${photographer.location}.`,
  keywords: [
    "photography",
    "wedding photographer",
    "portrait photographer",
    "Los Angeles photographer",
    "luxury photography",
    "Elara Voss",
  ],
  authors: [{ name: photographer.name }],
  creator: photographer.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elaravoss.com",
    siteName: photographer.studio,
    title: `${photographer.studio} | Award-Winning Photography`,
    description: photographer.subTagline,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85",
        width: 1200,
        height: 630,
        alt: photographer.studio,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: photographer.studio,
    description: photographer.subTagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-gold-400 focus:text-obsidian focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
