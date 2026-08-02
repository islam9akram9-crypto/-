import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Globe, Share2, AtSign, MessageCircle } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  const links = [
    { href: "/about", key: "about" },
    { href: "/services", key: "services" },
    { href: "/portfolio", key: "portfolio" },
    { href: "/blog", key: "blog" },
    { href: "/contact", key: "contact" },
  ] as const;

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/nabd-icon.png" alt="Nabd Media" width={40} height={40} className="rounded-lg object-cover" />
              <span className="font-bold text-lg text-white">
                {locale === "ar" ? "ظ†ط¨ط¶ ظ…ظٹط¯ظٹط§" : "Nabd Media"}
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              {locale === "ar"
                ? "ظˆظƒط§ظ„ط© طھط³ظˆظٹظ‚ ط±ظ‚ظ…ظٹ ظ…طھظƒط§ظ…ظ„ط© â€” ظ†طµظ†ط¹ ط­ط¶ظˆط±ط§ظ‹ ط±ظ‚ظ…ظٹط§ظ‹ ظٹظڈط­ط¯ط« ظپط±ظ‚ط§ظ‹."
                : "Full-service digital marketing agency â€” we create digital presence that makes a difference."}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm hover:text-indigo-400 transition-colors">
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t("followUs")}</h3>
            <div className="flex gap-3">
              {[Globe, Share2, AtSign, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 hover:bg-indigo-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm">hello@nabdmedia.com</p>
            <p className="text-sm">+966 50 000 0000</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm">
          آ© {year} {locale === "ar" ? " نبض ميديا" : "Nabd Media"}. {t("rights")}.
        </div>
      </div>
    </footer>
  );
}
