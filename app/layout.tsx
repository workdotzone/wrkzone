import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  // Basic metadata
  title: "WrkZone — Find Trusted Local Services & Post Free Ads | #1 Marketplace",
  description:
    "WrkZone is India's leading local services marketplace. Find verified plumbers, electricians, cleaners, AC repair, pest control & 100+ services. Post services free! 100% safe.",
  keywords: [
    "local services",
    "handymen",
    "plumber near me",
    "electrician",
    "pest control",
    "cleaning services",
    "AC repair",
    "classified ads",
    "service provider",
    "India",
  ],
  authors: [{ name: "WrkZone" }],
  creator: "WrkZone",
  publisher: "WrkZone",
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "google-site-verification": "your-verification-code",
    "googlebot": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  // Canonical URL
  metadataBase: new URL("https://wrkzone.com"),
  alternates: {
    canonical: "https://wrkzone.com",
  },
  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://wrkzone.com",
    title: "WrkZone — Find Trusted Local Services & Post Free Ads",
    description: "India's #1 local services marketplace. Find verified professionals or post your services free!",
    siteName: "WrkZone",
    images: [
      {
        url: "https://wrkzone.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "WrkZone - Local Services Marketplace",
        type: "image/png",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "WrkZone — Find Trusted Local Services",
    description: "India's leading local services marketplace",
    creator: "@WrkZone",
    images: ["https://wrkzone.com/twitter-image.png"],
  },
  // Viewport and other technical SEO
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  // Apple specific
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WrkZone",
  },
  // App links
  appLinks: {
    ios: {
      url: "https://apps.apple.com/in/app/wrkzone",
      app_store_id: "your-app-id",
    },
    android: {
      package: "com.wrkzone.app",
      app_name: "WrkZone",
    },
  },
  // Verification codes
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WrkZone",
    url: "https://wrkzone.com",
    logo: "https://wrkzone.com/logo.png",
    description: "India's leading local services marketplace",
    sameAs: [
      "https://facebook.com/wrkzone",
      "https://twitter.com/wrkzone",
      "https://instagram.com/wrkzone",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@wrkzone.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };

  return (
    <html lang="en" className={`${lora.variable} h-full antialiased`}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        
        {/* Additional performance optimization */}
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className="min-h-full flex flex-col font-lora text-ink">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
