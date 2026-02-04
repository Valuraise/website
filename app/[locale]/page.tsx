import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Hero from "@/components/hero";
import MethodologySection from "@/components/methodology";
import TechStackSection from "@/components/tech-stack-section";
import CTASection from "@/components/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "fr"
      ? "Valuraise - Transformez Votre Entreprise avec l'IA et Vos Données"
      : "Valuraise - Transform Your Business with AI & Your Data Consulting";

  const description =
    locale === "fr"
      ? "Conseil expert pour l'ingénierie des données, l'apprentissage automatique et l'infrastructure cloud. Aidez les entreprises à exploiter la puissance de leurs données."
      : "Expert consulting for data engineering, machine learning, and cloud infrastructure. Help enterprises unlock the power of their data.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function Home() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Methodology Section */}
      <MethodologySection />

      {/* Tech Stack Section */}
      <TechStackSection />

      {/* Final CTA */}
      <CTASection
        headline={t("cta.homeCTA.headline")}
        description={t("cta.homeCTA.description")}
        primaryCTA={{
          text: t("cta.homeCTA.primaryText"),
          href: `/${t("cta.homeCTA.primaryHref")}`,
        }}
      />
    </>
  );
}
