"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function TechStackSection() {
  const t = useTranslations();

  const stackItems = [4, 3, 2, 1].map((id) => ({
    id,
    layer: t(`techStack.items.${id}.layer`),
    title: t(`techStack.items.${id}.title`),
    description: t(`techStack.items.${id}.description`),
    highlighted: id == 3
  }));

  return (
    <section className="relative py-20 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Sidebar */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-1 relative lg:sticky lg:top-40 max-h-[calc(100vh-80px)] p-6"
          >
            {/* Top accent line */}
            <div className="absolute -top-8 left-0 w-6 h-6 border-l-2 border-t-2 border-accent" />

            <div className="mb-6">
              <p className="text-xs font-semibold text-accent/60 uppercase tracking-widest mb-3">
                ✓ {t("techStack.subtitle")}
              </p>
              <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-accent leading-tight mb-4">
                {t("techStack.title")}
              </h2>
            </div>

            <p className="text-base text-foreground/70 leading-relaxed">
              {t("techStack.description")}
            </p>


            {/* Bottom accent line */}
            <div className="absolute -bottom-8 right-0 w-6 h-6 border-r-2 border-b-2 border-accent" />
          </motion.div>

          {/* Right Stacked Cards */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stackItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                custom={index}
                className="group relative"
              >
                {/* Stacked effect line */}
                <div className="absolute inset-0 border border-border rounded-lg transform translate-y-1 translate-x-1 opacity-30 group-hover:opacity-10 transition-opacity" />
                <div className="absolute inset-0 border border-border rounded-lg transform translate-y-0.5 translate-x-0.5 opacity-50 group-hover:opacity-30 transition-opacity" />

                {/* Card */}
                <div className={`relative p-6 md:p-8 border rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 ${item.highlighted
                  ? "bg-secondary/10 border-secondary/30"
                  : "bg-white border-border"
                  }`}>
                  <div className="flex items-start gap-3 md:gap-4 mb-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold ${item.highlighted
                        ? "border-secondary/50 text-secondary bg-secondary/5"
                        : "border-accent/30 bg-accent/5 text-accent"
                        }`}>
                        {item.id}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${item.highlighted
                        ? "text-secondary"
                        : "text-accent/70"
                        }`}>
                        {item.layer}
                      </p>
                      <h3 className={`text-xl md:text-2xl font-bold ${item.highlighted
                        ? "text-secondary"
                        : "text-accent"
                        }`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-sm md:text-base leading-relaxed ml-9 ${item.highlighted
                    ? "text-foreground/80"
                    : "text-foreground/70"
                    }`}>
                    {item.description}
                  </p>

                  {/* Subtle vertical line to next card */}
                  {index < stackItems.length - 1 && (
                    <div className="absolute left-11 -bottom-6 w-0.5 h-6 bg-gradient-to-b from-accent/20 to-transparent" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
