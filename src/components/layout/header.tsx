"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
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
          <Image src="/nabd-icon.png" alt="Nabd Media" width={40} height={40} priority className="rounded-lg object-cover shadow-sm" />
          <span className="font-bold text-lg text-slate-900">
            {locale === "ar" ? "ظ†ط¨ط¶ ظ…ظٹط¯ظٹط§" : "Nabd Media"}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
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
              {otherLocale === "ar" ? "ط¹ط±ط¨ظٹ" : "EN"}
            </Button>
          </Link>
          <Link href="/contact" className="hidden sm:block">
            <Button size="sm">{locale === "ar" ? "ط§ط¨ط¯ط£ ظ…ط´ط±ظˆط¹ظƒ" : "Get Started"}</Button>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2 text-sm font-medium rounded-lg",
                pathname === item.href ? "text-indigo-600 bg-indigo-50" : "text-slate-600"
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
