"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Button } from "@/shared/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/packages", key: "packages" },
  { href: "/blog", key: "blog" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === "ar" ? "en" : "ar";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/nabd-icon.png"
            alt="Nabd Media"
            width={40}
            height={40}
            priority
            className="rounded-lg object-cover shadow-sm"
          />

          <span className="text-lg font-bold text-slate-900">
            {locale === "ar" ? "نبض ميديا" : "Nabd Media"}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={pathname} locale={otherLocale}>
            <Button variant="ghost" size="sm" className="gap-1">
              <Globe className="h-4 w-4" />
              {otherLocale === "ar" ? "العربية" : "EN"}
            </Button>
          </Link>

          <Link href="/contact" className="hidden sm:block">
            <Button size="sm">
              {locale === "ar" ? "ابدأ مشروعك" : "Get Started"}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="space-y-1 border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}