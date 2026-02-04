"use server";

import { z } from "zod";
import { getTranslations } from "next-intl/server";

export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  intent: string;
  message: string;
};

export async function submitContactForm(
  formData: unknown,
  locale: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get translations for validation messages
    const t = await getTranslations({ locale });

    const contactFormSchema = z.object({
      name: z.string().min(2, t("contact.form.validationErrors.nameRequired")),
      email: z.string().email(t("contact.form.validationErrors.emailInvalid")),
      company: z.string().min(2, t("contact.form.validationErrors.companyRequired")),
      intent: z.enum(["audit", "strategy", "general"], {
        errorMap: () => ({
          message: t("contact.form.validationErrors.intentRequired"),
        }),
      }),
      message: z.string().min(10, t("contact.form.validationErrors.messageMinLength")),
    });

    // Validate the form data
    contactFormSchema.parse(formData);

    // TODO: Send email notification
    // Simulate a small delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: "An error occurred while submitting the form. Please try again.",
    };
  }
}
