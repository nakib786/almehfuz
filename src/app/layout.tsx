import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeoBg from "@/components/GeoBg";
import Lightbox from "@/components/Lightbox";
import BackgroundMusic from "@/components/BackgroundMusic";

export const metadata: Metadata = {
  title: "Al Mehfuz Khanqah ae Qadriyaa",
  description: "A sanctuary of spiritual learning, remembrance, and community rooted in the Qadri tradition.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Al Mehfuz Khanqah ae Qadriyaa",
    description: "A sanctuary of spiritual learning, remembrance, and community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Noto+Nastaliq+Urdu:wght@400;700&family=Noto+Naskh+Arabic:wght@400;700&family=Noto+Serif+Devanagari:wght@400;600&family=EB+Garamond:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="lang-en">
        <LangProvider>
          <GeoBg />
          <Header />
          <div id="app" style={{ position: 'relative', zIndex: 1, minHeight: 'calc(100vh - var(--header-h))' }}>
            {children}
          </div>
          <Footer />
          <Lightbox />
          <BackgroundMusic />
        </LangProvider>
      </body>
    </html>
  );
}
