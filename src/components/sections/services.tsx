import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { getLocalizedField } from "@/lib/utils";
import { Palette, Code, Megaphone, BarChart3, Camera, Globe } from "lucide-react";

const defaultServices = [
  { slug: "branding", titleAr: "الهوية البصرية", titleEn: "Branding", descriptionAr: "تصميم هوية بصرية متكاملة تعكس قيم علامتك", descriptionEn: "Complete visual identity design reflecting your brand values", icon: "Palette", priceFrom: 5000 },
  { slug: "web-development", titleAr: "تطوير المواقع", titleEn: "Web Development", descriptionAr: "مواقع وتطبيقات ويب حديثة وسريعة", descriptionEn: "Modern, fast websites and web applications", icon: "Code", priceFrom: 8000 },
  { slug: "digital-marketing", titleAr: "التسويق الرقمي", titleEn: "Digital Marketing", descriptionAr: "حملات إعلانية واستراتيجيات تسويق فعّالة", descriptionEn: "Effective ad campaigns and marketing strategies", icon: "Megaphone", priceFrom: 3000 },
  { slug: "seo", titleAr: "تحسين محركات البحث", titleEn: "SEO", descriptionAr: "تحسين ظهور موقعك في نتائج البحث", descriptionEn: "Improve your website visibility in search results", icon: "BarChart3", priceFrom: 2500 },
  { slug: "content", titleAr: "إدارة المحتوى", titleEn: "Content Management", descriptionAr: "محتوى إبداعي يجذب جمهورك المستهدف", descriptionEn: "Creative content that attracts your target audience", icon: "Camera", priceFrom: 2000 },
  { slug: "social-media", titleAr: "وسائل التواصل", titleEn: "Social Media", descriptionAr: "إدارة حساباتك ونمو متابعيك", descriptionEn: "Manage your accounts and grow your followers", icon: "Globe", priceFrom: 1500 },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Code, Megaphone, BarChart3, Camera, Globe,
};

interface ServicesSectionProps {
  services?: typeof defaultServices;
}

export function ServicesSection({ services = defaultServices }: ServicesSectionProps) {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("title")}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <Card key={service.slug} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{getLocalizedField(service, "title", locale)}</CardTitle>
                  <CardDescription>{getLocalizedField(service, "description", locale)}</CardDescription>
                </CardHeader>
                <CardContent>
                  {service.priceFrom && (
                    <p className="text-sm text-indigo-600 font-medium mb-3">
                      {t("from")} {service.priceFrom.toLocaleString()} {locale === "ar" ? "ر.س" : "SAR"}
                    </p>
                  )}
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="outline" size="sm">{t("requestQuote")}</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/services">
            <Button variant="secondary">{t("viewAll")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
