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

  useEffect(() => {
    // Display stored debug logs after page reload
    const debugLogs = sessionStorage.getItem("langSelectorDebug");
    if (debugLogs) {
      console.log("=== Language Selector Debug Logs ===");
      const logs = JSON.parse(debugLogs);
      logs.forEach((log: string) => console.log(log));
      sessionStorage.removeItem("langSelectorDebug");
    }
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setIsOpen(false);

    // Don't navigate if selecting the same locale
    if (newLocale === locale) {
      return;
    }

    // Store debug logs in localStorage before navigation
    const logs = [
      `Current locale: ${locale}`,
      `Current pathname: ${pathname}`,
      `New locale: ${newLocale}`,
    ];

    // Remove current locale prefix from pathname
    let basePath = pathname;

    // Check if pathname starts with current locale prefix and remove it
    if (locale !== "en" && pathname.startsWith(`/${locale}`)) {
      // Current locale has a prefix, remove it
      if (pathname === `/${locale}`) {
        basePath = "/";
        logs.push("Matched exact locale prefix");
      } else if (pathname.startsWith(`/${locale}/`)) {
        basePath = pathname.slice(`/${locale}`.length);
        logs.push("Removed locale prefix from path");
      }
    } else {
      logs.push("No locale prefix to remove");
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

    logs.push(`Base path: ${basePath}`);
    logs.push(`New path: ${newPath}`);

    // Store the user's language preference in a cookie to prevent auto-detection
    // This cookie tells the middleware: "user explicitly chose this locale"
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; expires=${expiryDate.toUTCString()}`;
    logs.push(`Set cookie: NEXT_LOCALE=${newLocale}`);

    // Store logs and navigate
    sessionStorage.setItem("langSelectorDebug", JSON.stringify(logs));
    console.log(logs.join("\n"));

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
