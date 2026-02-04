"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { locales, localeFlags, localeNames, type Locale } from "@/i18n";

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setIsOpen(false);

    // Don't navigate if selecting the same locale
    if (newLocale === locale) {
      return;
    }

    // Debug logging
    console.log("Current locale:", locale);
    console.log("Current pathname:", pathname);
    console.log("New locale:", newLocale);

    // Remove current locale prefix from pathname
    let basePath = pathname;

    // Check if pathname starts with current locale prefix and remove it
    if (locale !== "en" && pathname.startsWith(`/${locale}`)) {
      // Current locale has a prefix, remove it
      if (pathname === `/${locale}`) {
        basePath = "/";
      } else if (pathname.startsWith(`/${locale}/`)) {
        basePath = pathname.slice(`/${locale}`.length);
      }
    }

    // Construct new path with new locale prefix
    let newPath: string;
    if (newLocale === "en") {
      // English is default - no prefix
      newPath = basePath;
    } else {
      // Add prefix for other locales
      newPath = `/${newLocale}${basePath}`;
    }

    console.log("Base path:", basePath);
    console.log("New path:", newPath);

    // Navigate to new path
    window.location.href = newPath;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-accent/20 hover:border-accent/40 transition-colors text-foreground/70 hover:text-foreground text-sm"
        aria-label="Change language"
      >
        <Globe size={16} />
        <span>{localeFlags[locale as Locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale as Locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white border border-border rounded-lg shadow-lg py-2 min-w-max z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${locale === loc
                ? "bg-accent/10 text-accent font-medium"
                : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
            >
              <span>{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
