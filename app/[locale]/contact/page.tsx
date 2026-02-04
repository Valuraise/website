import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const title =
    locale === "fr"
      ? "Nous Contacter - Commencez avec Valuraise"
      : "Contact Us - Get Started with Valuraise";

  const description =
    locale === "fr"
      ? "Entrez en contact avec notre équipe. Nous sommes prêts à discuter de vos défis en IA, ingénierie des données ou infrastructure cloud."
      : "Get in touch with our team. We're ready to discuss your AI, data engineering, or cloud infrastructure challenges.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function ContactPage() {
  const t = useTranslations();

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 md:py-24 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
              {t("contact.page.title")}
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {t("contact.page.description")}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            {/* Form */}
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-accent mb-2">
                  {t("contact.page.formTitle")}
                </h2>
                <p className="text-foreground/70">
                  {t("contact.page.formSubtitle")}
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
