import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { getLocalizedField } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const defaultPortfolio = [
  { slug: "tech-startup", titleAr: "هوية شركة تقنية", titleEn: "Tech Startup Brand", descriptionAr: "تصميم هوية بصرية كاملة", descriptionEn: "Complete visual identity design", category: "branding", featured: true },
  { slug: "ecommerce", titleAr: "متجر إلكتروني", titleEn: "E-commerce Store", descriptionAr: "تطوير متجر WooCommerce", descriptionEn: "WooCommerce store development", category: "web", featured: true },
  { slug: "restaurant", titleAr: "حملة مطعم", titleEn: "Restaurant Campaign", descriptionAr: "حملة تسويق رقمي متكاملة", descriptionEn: "Integrated digital marketing campaign", category: "marketing", featured: true },
  { slug: "real-estate", titleAr: "موقع عقاري", titleEn: "Real Estate Website", descriptionAr: "موقع عرض عقارات تفاعلي", descriptionEn: "Interactive property listing website", category: "web", featured: false },
];

interface PortfolioSectionProps {
  items?: typeof defaultPortfolio;
}

export function PortfolioSection({ items = defaultPortfolio }: PortfolioSectionProps) {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const featured = items.filter((i) => i.featured).slice(0, 3);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("title")}</h2>
          <p className="text-lg text-slate-600">{t("subtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <Link key={item.slug} href={`/portfolio/${item.slug}`} className="group">
              <div className="overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow">
                <div className={`h-48 bg-gradient-to-br ${i === 0 ? "from-indigo-500 to-purple-600" : i === 1 ? "from-emerald-500 to-teal-600" : "from-orange-500 to-red-500"} flex items-center justify-center text-white text-2xl font-bold`}>
                  {getLocalizedField(item, "title", locale).slice(0, 2)}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-indigo-600 uppercase">{item.category}</span>
                  <h3 className="font-semibold text-slate-900 mt-1 group-hover:text-indigo-600 transition-colors">
                    {getLocalizedField(item, "title", locale)}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{getLocalizedField(item, "description", locale)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/portfolio">
            <Button variant="secondary">
              {t("viewProject")}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
