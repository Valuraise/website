import type { Metadata, Viewport } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { locales, type Locale } from "@/i18n";
import "../globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const baseTitle =
    locale === "fr"
      ? "Valuraise - Solutions IA et Ingénierie des Données"
      : "Valuraise - AI & Data Engineering Solutions";

  const baseDescription =
    locale === "fr"
      ? "Transformez votre entreprise avec le conseil en données et IA. Solutions expertes pour l'ingénierie des données, l'apprentissage automatique et l'infrastructure cloud."
      : "Transform your business with data and AI consulting. Expert solutions for data engineering, machine learning, and cloud infrastructure.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: baseTitle,
      template: `%s | Valuraise`,
    },
    description: baseDescription,
    keywords:
      locale === "fr"
        ? ["conseil", "IA", "apprentissage automatique", "ingénierie des données", "infrastructure cloud", "développement logiciel", "Valuraise"]
        : ["consulting", "AI", "machine learning", "data engineering", "cloud infrastructure", "software development", "Valuraise"],
    icons: {
      icon: {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      apple: {
        url: "/apple-touch-icon.svg",
        type: "image/svg+xml",
        sizes: "180x180",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: siteUrl,
      siteName: "Valuraise",
      title: baseTitle,
      description: baseDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: baseTitle,
      description: baseDescription,
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
