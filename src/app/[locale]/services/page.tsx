import { Button } from "@/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { getLocale } from "next-intl/server";
import {
  BarChart3,
  Camera,
  Code,
  Globe,
  Megaphone,
  Palette,
  PenLine,
  Search,
  ShieldCheck,
  Target,
} from "lucide-react";

const services = [
  { slug: "digital-marketing", icon: Megaphone, titleAr: "التسويق الرقمي", titleEn: "Digital Marketing", descAr: "حملات إعلانية على جميع المنصات مع استراتيجية واضحة واستهداف دقيق للجمهور.", descEn: "Ad campaigns across all platforms with clear strategy and precise audience targeting." },
  { slug: "branding", icon: Palette, titleAr: "الهوية البصرية", titleEn: "Branding", descAr: "هوية بصرية متكاملة تعكس شخصية علامتك وتميزها عن المنافسين.", descEn: "Complete visual identity that reflects your brand personality and sets you apart." },
  { slug: "web-development", icon: Code, titleAr: "تطوير المواقع", titleEn: "Web Development", descAr: "مواقع وتطبيقات ويب حديثة وسريعة ومتوافقة مع جميع الأجهزة.", descEn: "Modern, fast, responsive websites and web applications." },
  { slug: "seo", icon: Search, titleAr: "تحسين محركات البحث", titleEn: "SEO", descAr: "ارتقِ بظهورك في نتائج البحث وجذب المزيد من الزيارات المستهدفة.", descEn: "Boost your search visibility and attract more targeted traffic." },
  { slug: "content-production", icon: PenLine, titleAr: "إنتاج المحتوى", titleEn: "Content Production", descAr: "محتوى إبداعي يصنع تواصلاً حقيقياً مع جمهورك المستهدف.", descEn: "Creative content that builds real connection with your target audience." },
  { slug: "media-production", icon: Camera, titleAr: "التصوير والإنتاج", titleEn: "Media Production", descAr: "تصوير منتجات وشركات بجودة عالية مع مونتاج احترافي.", descEn: "High-quality product and corporate production with professional editing." },
  { slug: "social-media", icon: Globe, titleAr: "إدارة وسائل التواصل", titleEn: "Social Media Management", descAr: "إدارة كاملة لحساباتك على السوشال ميديا مع نمو حقيقي للتفاعل.", descEn: "Full management of your social media accounts with real engagement growth." },
  { slug: "advertising", icon: Target, titleAr: "الإعلانات الممولة", titleEn: "Paid Advertising", descAr: "حملات إعلانية مدروسة تحقق أعلى عائد على الاستثمار.", descEn: "Well-planned ad campaigns that deliver the highest ROI." },
  { slug: "analytics", icon: BarChart3, titleAr: "التحليلات والتقارير", titleEn: "Analytics & Reporting", descAr: "قياس دقيق لأداء حملاتك مع رؤى قابلة للتنفيذ.", descEn: "Accurate measurement of campaign performance with actionable insights." },
  { slug: "consulting", icon: ShieldCheck, titleAr: "الاستشارات والتدريب", titleEn: "Consulting & Training", descAr: "استشارات متخصصة وتدريب عملي يرفع كفاءة فريقك الداخلي.", descEn: "Specialized consulting and practical training to upskill your internal team." },
] as const;

export default async function ServicesPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const isArabic = locale === "ar";

  return (
    <>
      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-teal-300">{isArabic ? "خدماتنا" : "Our Services"}</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{isArabic ? "حلول رقمية متكاملة" : "Integrated Digital Solutions"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            {isArabic
              ? "من الهوية البصرية إلى الحملات الإعلانية — كل ما تحتاجه لنمو علامتك في مكان واحد."
              : "From branding to ad campaigns — everything your brand needs to grow in one place."}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              const title = isArabic ? service.titleAr : service.titleEn;
              const desc = isArabic ? service.descAr : service.descEn;
              return (
                <article key={service.slug} className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-950">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
                  <Link href={`/services/${service.slug}`} className="mt-6 block">
                    <Button variant="outline" className="w-full">{isArabic ? "اعرف المزيد" : "Learn More"}</Button>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}