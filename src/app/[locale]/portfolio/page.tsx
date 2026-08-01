import { Link } from "@/lib/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

const portfolio = [
  { slug: "tech-startup", titleAr: "هوية شركة تقنية", titleEn: "Tech Startup Brand", descAr: "تصميم هوية بصرية كاملة لشركة ناشئة في مجال الذكاء الاصطناعي.", descEn: "Complete visual identity for an AI startup.", category: "branding", gradient: "from-indigo-500 to-purple-600" },
  { slug: "ecommerce", titleAr: "متجر إلكتروني", titleEn: "E-commerce Store", descAr: "تطوير متجر إلكتروني متكامل مع نظام دفع وإدارة مخزون.", descEn: "Full e-commerce store with payment gateway and inventory management.", category: "web", gradient: "from-emerald-500 to-teal-600" },
  { slug: "restaurant", titleAr: "حملة مطعم", titleEn: "Restaurant Campaign", descAr: "حملة تسويق رقمي متكاملة لمطعم فاخر مع تصوير احترافي.", descEn: "Integrated digital marketing campaign for a fine dining restaurant.", category: "marketing", gradient: "from-orange-500 to-red-500" },
  { slug: "real-estate", titleAr: "موقع عقاري", titleEn: "Real Estate Website", descAr: "موقع عرض عقارات تفاعلي مع بحث متقدم وخرائط.", descEn: "Interactive property listing website with advanced search and maps.", category: "web", gradient: "from-sky-500 to-blue-600" },
  { slug: "clinic", titleAr: "هوية عيادة طبية", titleEn: "Medical Clinic Brand", descAr: "هوية بصرية وتصميم تجربة مريحة لمركز طبي.", descEn: "Visual identity and comfortable experience design for a medical center.", category: "branding", gradient: "from-teal-500 to-cyan-600" },
  { slug: "coffee-shop", titleAr: "حملة مقهى", titleEn: "Coffee Shop Campaign", descAr: "إطلاق علامة مقهى جديد مع استراتيجية محتوى على السوشال ميديا.", descEn: "New coffee brand launch with social media content strategy.", category: "marketing", gradient: "from-amber-500 to-yellow-600" },
] as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const categories = [
  { key: "all", labelAr: "الكل", labelEn: "All" },
  { key: "branding", labelAr: "الهوية", labelEn: "Branding" },
  { key: "web", labelAr: "ويب", labelEn: "Web" },
  { key: "marketing", labelAr: "تسويق", labelEn: "Marketing" },
] as const;

export default async function PortfolioPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const isArabic = locale === "ar";

  return (
    <>
      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-teal-300">{isArabic ? "أعمالنا" : "Our Work"}</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{isArabic ? "مشاريع نفتخر بها" : "Projects We're Proud Of"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            {isArabic
              ? "من الهويات البصرية إلى المنصات الرقمية — نظهر للعالم ما نستطيع تحقيقه."
              : "From identities to digital platforms — showing the world what we can achieve."}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="group">
                <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className={`h-52 bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-3xl font-bold`}>
                    {(isArabic ? item.titleAr : item.titleEn).slice(0, 2)}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium uppercase text-teal-600">{item.category}</span>
                      <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <h2 className="mt-2 font-bold text-slate-950 group-hover:text-teal-700 transition-colors">
                      {isArabic ? item.titleAr : item.titleEn}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{isArabic ? item.descAr : item.descEn}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
