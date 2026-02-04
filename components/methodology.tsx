"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Settings } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const phaseNumbers = ["1", "2", "3"] as const;
const icons = [CheckCircle2, Zap, Settings] as const;

export default function MethodologySection() {
  const t = useTranslations();

  const phases = phaseNumbers.map((num) => {
    const idx = parseInt(num) - 1;
    return {
      number: num,
      icon: icons[idx],
      title: t(`methodology.phases.${num}.title`),
      subtitle: t(`methodology.phases.${num}.subtitle`),
      description: t(`methodology.phases.${num}.description`),
      deliverables: t.raw(`methodology.deliverables.${num}`) as string[],
    };
  });

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden border-t border-border" id="methodology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-4 leading-tight"
          >
            {t("methodology.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed"
          >
            {t("methodology.description")}
          </motion.p>
        </motion.div>

        {/* Phases Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {phases.map((phase, index) => {
            return (
              <motion.div
                key={phase.number}
                variants={fadeInUp}
                custom={index}
                className="relative group"
              >
                {/* Card */}
                <div
                  className="relative p-6 md:p-8 border border-border rounded-lg bg-white backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Phase Number Badge */}
                  <div className="absolute -top-4 rounded-lg left-8 text-accent bg-white border w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {phase.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-accent mt-3">
                    {phase.title}
                  </h3>
                  <p className="text-sm font-semibold text-foreground/80 mb-4">
                    {phase.subtitle}
                  </p>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {phase.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-accent mb-3">
                      {t("methodology.keyDeliverables")}
                    </h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground/70 flex items-start gap-2"
                        >
                          <span className="text-accent mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
