import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-1.5 text-sm text-indigo-200">
            <Sparkles className="h-4 w-4" />
            Digital Marketing Agency
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{t("title")}</h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 leading-relaxed">{t("subtitle")}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50">
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                {t("secondary")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
