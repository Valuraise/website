import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, type Locale } from './i18n';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false, // Disable auto-detection to respect user choice
});

export function proxy(request: NextRequest) {
  // Check if user has explicitly selected a locale (stored in cookie)
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

  if (localeCookie && (locales as readonly string[]).includes(localeCookie)) {
    // User has explicitly chosen a locale, use that
    const locale = localeCookie as Locale;
    const pathname = request.nextUrl.pathname;

    // Only redirect if necessary
    if (!pathname.startsWith(`/${locale}`) && locale !== 'en') {
      // For non-English locales, add the prefix
      request.nextUrl.pathname = `/${locale}${pathname}`;
      return Response.redirect(request.nextUrl);
    } else if (pathname.startsWith('/fr') && locale === 'en') {
      // User switched to English, remove French prefix
      request.nextUrl.pathname = pathname.replace(/^\/fr/, '') || '/';
      return Response.redirect(request.nextUrl);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
