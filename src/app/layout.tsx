import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { LenisProvider } from "@/components/animations/LenisProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { ScrollAnimations } from "@/components/animations/ScrollAnimations";
import { I18nProvider } from "@/i18n/I18nProvider";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/data";
import "@/styles/globals.css";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: PERSONAL_INFO.tagline,
  keywords: [
    "fullstack engineer",
    "software engineer",
    "web developer",
    "Next.js developer",
    "React developer",
    "Three.js",
    "México",
    "freelance developer",
    "interactive web experiences",
    "AI integration",
  ],
  authors: [{ name: PERSONAL_INFO.name }],
  creator: PERSONAL_INFO.name,
  metadataBase: new URL("https://mendoza727.dev"),
  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mendoza727.dev",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.tagline,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },

  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`,
    description: PERSONAL_INFO.tagline,
    creator: "@mendoza727",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f9f9f9" },
  ],
};

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  url: "https://mendoza727.dev",
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter],
  jobTitle: PERSONAL_INFO.title,
  description: PERSONAL_INFO.bio,
  knowsAbout: ["Web Development", "React", "Next.js", "TypeScript", "Node.js", "Three.js", "AI Integration"],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <I18nProvider>
            <LenisProvider>
              {/* Global GSAP scroll animations */}
              <ScrollAnimations />
              {/* Custom cursor */}
              <CustomCursor />
              {/* Page content */}
              <main>{children}</main>
            </LenisProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
