import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { routing, type Locale } from "@/lib/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const activeLocale = locale as Locale;
  const isArabic = activeLocale === "ar";

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={isArabic ? "rtl" : "ltr"} className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
