import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/navigation/Navbar";
import Footer from "./component/footer/page";
import { ThemeProvider } from "@/app/component/theme/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jeremiah Zhiya | Portfolio',
    template: '%s | Jeremiah Zhiya',
  },
  description: 'Explore production client work, enterprise full-stack web applications, and software systems by Jeremiah Zhiya.',
  keywords: ['Full Stack Developer', 'Software Engineer', 'Next.js', 'React', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Jeremiah Zhiya' }],
  creator: 'Jeremiah Zhiya',
  
  // Favicon setup
  icons: {
    icon: '/jerry-logo.jpeg',
    apple: '/apple-touch-icon.png',
  },

  // Open Graph (WhatsApp, LinkedIn, Facebook preview)
  openGraph: {
    title: 'Jeremiah Zhiya | Portfolio',
    description: 'Explore production client work, enterprise full-stack web applications, and software systems.',
    url: siteUrl,
    siteName: 'Jeremiah Zhiya Portfolio',
    images: [
      {
        url: '/preview.jpeg',
        width: 1200,
        height: 630,
        alt: 'Jeremiah Zhiya Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card preview
  twitter: {
    card: 'summary_large_image',
    title: 'Jeremiah Zhiya | Portfolio',
    description: 'Explore production client work, enterprise full-stack web applications, and software systems.',
    images: ['/preview.jpeg'],
  },

  // Search engine indexing rules
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        suppressHydrationWarning 
        className="min-h-full flex flex-col bg-white dark:bg-[#121815] text-[#1c2420] dark:text-[#e5e9e3] transition-colors duration-300"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}