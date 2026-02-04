"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import AnimatedGrid from "@/components/animated-grid";

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <AnimatedGrid />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-6xl lg:text-hero-xl font-bold leading-tight mb-6 text-accent"
          variants={fadeInUp}
        >
          {t("hero.title")}{" "}
          <span className="text-accent/80">{t("hero.titleAccent")}</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={fadeInUp}
          custom={1}
        >
          {t("hero.description")}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          variants={fadeInUp}
          custom={2}
        >
          <Link
            href={`/${locale}/contact`}
            className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            {t("hero.getStarted")}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="text-accent" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
