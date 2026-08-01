import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, Megaphone, Palette, Code, Search, PenLine, Camera, Globe, Target, BarChart3, ShieldCheck } from "lucide-react";

const services = [
  { slug: "digital-marketing", icon: Megaphone, titleAr: "التسويق الرقمي", titleEn: "Digital Marketing", descAr: "حملات إعلانية على جميع المنصات مع استراتيجية واضحة واستهداف دقيق للجمهور.", descEn: "Ad campaigns across all platforms with clear strategy and precise audience targeting.", featuresAr: ["إدارة حملات Meta Ads و Google Ads", "استراتيجية محتوى شهرية", "تقارير أداء أسبوعية", "تحسين مستمر للحملات"], featuresEn: ["Meta Ads and Google Ads management", "Monthly content strategy", "Weekly performance reports", "Continuous campaign optimization"] },
  { slug: "branding", icon: Palette, titleAr: "الهوية البصرية", titleEn: "Branding", descAr: "هوية بصرية متكاملة تعكس شخصية علامتك وتميزها عن المنافسين.", descEn: "Complete visual identity that reflects your brand personality and sets you apart.", featuresAr: ["تصميم الشعار", "دليل الهوية", "القرطاسية", "أدلة الاستخدام"], featuresEn: ["Logo design", "Brand guidelines", "Stationery", "Usage guides"] },
  { slug: "web-development", icon: Code, titleAr: "تطوير المواقع", titleEn: "Web Development", descAr: "مواقع وتطبيقات ويب حديثة وسريعة ومتوافقة مع جميع الأجهزة.", descEn: "Modern, fast, responsive websites and web applications.", featuresAr: ["مواقع تعريفية", "متاجر إلكترونية", "أنظمة مخصصة", "صفحات هبوط"], featuresEn: ["Corporate websites", "E-commerce stores", "Custom systems", "Landing pages"] },
  { slug: "seo", icon: Search, titleAr: "تحسين محركات البحث", titleEn: "SEO", descAr: "ارتقِ بظهورك في نتائج البحث وجذب المزيد من الزيارات المستهدفة.", descEn: "Boost your search visibility and attract more targeted traffic.", featuresAr: ["تدقيق تقني", "تحسين المحتوى", "بناء الروابط", "تحليل الكلمات المفتاحية"], featuresEn: ["Technical audit", "Content optimization", "Link building", "Keyword analysis"] },
  { slug: "content-production", icon: PenLine, titleAr: "إنتاج المحتوى", titleEn: "Content Production", descAr: "محتوى إبداعي يصنع تواصلاً حقيقياً مع جمهورك المستهدف.", descEn: "Creative content that builds real connection with your target audience.", featuresAr: ["منشورات سوشال ميديا", "مقالات", "فيديو وريلز", "تصميم إنفوجرافيك"], featuresEn: ["Social media posts", "Articles", "Video and reels", "Infographic design"] },
  { slug: "media-production", icon: Camera, titleAr: "التصوير والإنتاج", titleEn: "Media Production", descAr: "تصوير منتجات وشركات بجودة عالية مع مونتاج احترافي.", descEn: "High-quality product and corporate production with professional editing.", featuresAr: ["تصوير منتجات", "تصوير شركات", "مونتاج", "Motion Graphics"], featuresEn: ["Product photography", "Corporate shoots", "Editing", "Motion graphics"] },
  { slug: "social-media", icon: Globe, titleAr: "إدارة وسائل التواصل", titleEn: "Social Media Management", descAr: "إدارة كاملة لحساباتك على السوشال ميديا مع نمو حقيقي للتفاعل.", descEn: "Full management of your social media accounts with real engagement growth.", featuresAr: ["إدارة المنصات", "جدولة المحتوى", "التفاعل مع الجمهور", "تقارير نمو"], featuresEn: ["Platform management", "Content scheduling", "Audience engagement", "Growth reports"] },
  { slug: "advertising", icon: Target, titleAr: "الإعلانات الممولة", titleEn: "Paid Advertising", descAr: "حملات إعلانية مدروسة تحقق أعلى عائد على الاستثمار.", descEn: "Well-planned ad campaigns that deliver the highest ROI.", featuresAr: ["Meta Ads", "Google Ads", "TikTok Ads", "إعادة الاستهداف"], featuresEn: ["Meta Ads", "Google Ads", "TikTok Ads", "Retargeting"] },
  { slug: "analytics", icon: BarChart3, titleAr: "التحليلات والتقارير", titleEn: "Analytics & Reporting", descAr: "قياس دقيق لأداء حملاتك مع رؤى قابلة للتنفيذ.", descEn: "Accurate measurement of campaign performance with actionable insights.", featuresAr: ["إعداد التتبع", "لوحات معلومات", "تقارير شهرية", "تحليل المنافسين"], featuresEn: ["Tracking setup", "Dashboards", "Monthly reports", "Competitor analysis"] },
  { slug: "consulting", icon: ShieldCheck, titleAr: "الاستشارات والتدريب", titleEn: "Consulting & Training", descAr: "استشارات متخصصة وتدريب عملي يرفع كفاءة فريقك الداخلي.", descEn: "Specialized consulting and practical training to upskill your internal team.", featuresAr: ["استشارات تسويقية", "تدريب الفرق", "ورش عمل", "مسارات نمو"], featuresEn: ["Marketing consulting", "Team training", "Workshops", "Growth roadmaps"] },
];

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const isArabic = locale === "ar";
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = service.icon;
  const title = isArabic ? service.titleAr : service.titleEn;
  const desc = isArabic ? service.descAr : service.descEn;
  const features = isArabic ? service.featuresAr : service.featuresEn;

  return (
    <>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container mx-auto px-4">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            {isArabic ? "جميع الخدمات" : "All Services"}
          </Link>
          <div className="mt-8 flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-teal-400 text-slate-950">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">{isArabic ? "ماذا تتضمن الخدمة؟" : "What's included?"}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <span className="text-sm font-medium text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-slate-950">{isArabic ? "ابدأ مشروعك" : "Start Your Project"}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isArabic ? "تواصل معنا اليوم واحصل على استشارة مجانية حول الخدمة." : "Contact us today for a free consultation about this service."}
            </p>
            <Link href="/contact" className="mt-6 block">
              <Button className="w-full">{isArabic ? "طلب الخدمة" : "Request Service"}</Button>
            </Link>
            <Link href="/packages" className="mt-3 block">
              <Button variant="outline" className="w-full">{isArabic ? "تصفح الباقات" : "Browse Packages"}</Button>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
