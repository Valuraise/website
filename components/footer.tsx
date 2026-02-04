import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Linkedin, Github } from "lucide-react";
import LanguageSelector from "@/components/language-selector";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-white text-accent py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Valuraise</h3>
            <p className="text-accent/70 text-sm">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/blog`} className="text-accent/70 hover:text-accent transition-colors">
                  {t("footer.blog")}
                </Link>
              </li>
            </ul>
          </div>


          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.social")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-accent/70">
                <Linkedin size={16} />
                <a href="https://www.linkedin.com/company/valuraise" className="hover:text-accent transition-colors">
                  {t("footer.linkedin")}
                </a>
              </li>
              <li className="flex items-center gap-2 text-accent/70">
                <Github size={16} />
                <a href="https://github.com/Valuraise" className="hover:text-accent transition-colors">
                  {t("footer.github")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-accent/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-accent/70">
            <p>{t("footer.copyright", { year: currentYear })}</p>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
