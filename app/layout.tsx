import type { Metadata } from "next";
import { Manrope, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";

const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' });
const arabic = Noto_Naskh_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

export const metadata: Metadata = {
  title: {
    default: "Orúkọ Mùsùlùmí — Yorùbá Islamic Name Origins",
    template: "%s | Orúkọ Mùsùlùmí",
  },
  description:
    "Discover the authentic Arabic origins of Yorùbá Islamic names. Understand meanings, cultural adaptations, and how your name connects to its Arabic root.",
  keywords: [
    "Yoruba Islamic names",
    "Arabic name meanings",
    "Muslim names Nigeria",
    "Yoruba Muslim names",
    "Islamic name origins",
  ],
  openGraph: {
    title: "Orúkọ Mùsùlùmí — Yorùbá Islamic Name Origins",
    description:
      "Discover the authentic Arabic origins of Yorùbá Islamic names.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Orúkọ Mùsùlùmí — Yorùbá Islamic Name Origins",
    description:
      "Discover the authentic Arabic origins of Yorùbá Islamic names.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Orúkọ Mùsùlùmí",
  description:
    "Trusted reference platform for Yorùbá Islamic name origins and authentic Arabic meanings.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://oruko.ng/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-sans", manrope.variable, arabic.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>

        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZGDT0F661J" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-ZGDT0F661J');
            `}
        </Script>
      </body>
    </html>
  );
}
