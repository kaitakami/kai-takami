import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse, NextRequest } from 'next/server';

let locales: string[] = ['en', 'jp'];
let defaultLocale: string = 'en';

function getLocale(req: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    negotiatorHeaders[key.toLowerCase()] = value;
  });
  const languages: string[] = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale: string = match(languages, locales, defaultLocale);

  return locale;
}

export function middleware(request: NextRequest): void | NextResponse {
  // Check if there is any supported locale in the pathname
  const pathname: string = request.nextUrl.pathname;
  const pathnameIsMissingLocale: boolean = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale: string = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url.toString())
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
