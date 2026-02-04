"use client";

import { FormEvent, useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/app/[locale]/contact/actions";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    intent: "general",
    message: "",
  });
  const locale = useLocale();
  const t = useTranslations();

  // Pre-populate intent from URL parameter
  useEffect(() => {
    const intentParam = searchParams.get("intent");
    if (intentParam && ["audit", "strategy", "general"].includes(intentParam)) {
      setFormData((prev) => ({ ...prev, intent: intentParam }));
    }
  }, [searchParams]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const result = await submitContactForm(formData, locale);

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          intent: "general",
          message: "",
        });
        // Reset success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit form");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-accent mb-2">
          {t("contact.form.nameLabel")}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          placeholder={t("contact.form.namePlaceholder")}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-accent mb-2">
          {t("contact.form.emailLabel")}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          placeholder={t("contact.form.emailPlaceholder")}
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-accent mb-2">
          {t("contact.form.companyLabel")}
        </label>
        <input
          id="company"
          type="text"
          name="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          placeholder={t("contact.form.companyPlaceholder")}
        />
      </div>

      {/* Reason for Contact */}
      <div>
        <label htmlFor="intent" className="block text-sm font-medium text-accent mb-2">
          {t("contact.form.intentLabel")}
        </label>
        <select
          id="intent"
          name="intent"
          value={formData.intent}
          onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
          required
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all bg-white"
        >
          <option value="audit">{t("contact.form.intentOptions.audit")}</option>
          <option value="strategy">{t("contact.form.intentOptions.strategy")}</option>
          <option value="general">{t("contact.form.intentOptions.general")}</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-accent mb-2">
          {t("contact.form.messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
          placeholder={t("contact.form.messagePlaceholder")}
        />
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-green-900">{t("contact.form.successMessage")}</p>
            <p className="text-sm text-green-800">{t("contact.form.successSubMessage")}</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-red-900">{t("contact.form.errorTitle")}</p>
            <p className="text-sm text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            {t("contact.form.sendingButton")}
          </>
        ) : (
          t("contact.form.submitButton")
        )}
      </button>

      <p className="text-xs text-foreground/60 text-center">
        {t("contact.form.privacyNote")}
      </p>
    </form>
  );
}
