import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n-config";

export default auth((req) => {
    const { pathname } = req.nextUrl;

    // Skip locale handling for API routes, static files, and admin routes
    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/admin") ||
        pathname.includes(".") // static files
    ) {
        // Handle admin auth
        const isLoggedIn = !!req.auth;
        const isAdminRoute = pathname.startsWith("/admin");
        const isLoginPage = pathname === "/admin/login";

        if (isAdminRoute && !isLoginPage && !isLoggedIn) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        if (isLoginPage && isLoggedIn) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }

        return NextResponse.next();
    }

    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Detect locale from Accept-Language header or cookie
    let locale = defaultLocale;

    // Check cookie first
    const cookieLocale = req.cookies.get("locale")?.value;
    if (cookieLocale && isValidLocale(cookieLocale)) {
        locale = cookieLocale;
    } else {
        // Check Accept-Language header
        const acceptLanguage = req.headers.get("Accept-Language");
        if (acceptLanguage) {
            const preferredLocale = acceptLanguage.split(",")[0].split("-")[0];
            if (isValidLocale(preferredLocale)) {
                locale = preferredLocale;
            }
        }
    }

    // Redirect to locale-prefixed URL
    const newUrl = new URL(`/${locale}${pathname}`, req.url);
    return NextResponse.redirect(newUrl);
});

export const config = {
    matcher: [
        // Match all paths except static files and API
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
    ],
};

