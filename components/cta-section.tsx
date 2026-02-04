"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

interface CTASectionProps {
  headline: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export default function CTASection({
  headline,
  description,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  const locale = useLocale();

  return (
    <section className="relative bg-white py-20 md:py-32 overflow-hidden border-t border-border">
      {/* Gradient background */}
      <div className="absolute inset-0 from-accent to-accent/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-6">
            {headline}
          </h2>

          <p className="text-lg text-accent/80 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}${primaryCTA.href}`}
              className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              {primaryCTA.text}
            </Link>
            {secondaryCTA && (
              <Link
                href={`/${locale}${secondaryCTA.href}`}
                className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-muted transition-colors"
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
