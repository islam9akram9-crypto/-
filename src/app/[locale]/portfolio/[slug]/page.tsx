import { Button } from "@/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const portfolio = [
  { slug: "tech-startup", titleAr: "هوية شركة تقنية", titleEn: "Tech Startup Brand", descAr: "تصميم هوية بصرية كاملة لشركة ناشئة في مجال الذكاء الاصطناعي.", descEn: "Complete visual identity for an AI startup.", category: "branding", gradient: "from-indigo-500 to-purple-600", clientAr: "شركة تقنية ناشئة", clientEn: "Tech Startup", year: "2025", resultsAr: ["زيادة الوعي بالعلامة التجارية", "توحيد الهوية عبر جميع القنوات", "جذب استثمارات جديدة"], resultsEn: ["Increased brand awareness", "Unified identity across channels", "Attracted new investments"] },
  { slug: "ecommerce", titleAr: "متجر إلكتروني", titleEn: "E-commerce Store", descAr: "تطوير متجر إلكتروني متكامل مع نظام دفع وإدارة مخزون.", descEn: "Full e-commerce store with payment gateway and inventory management.", category: "web", gradient: "from-emerald-500 to-teal-600", clientAr: "متجر منتجات طبيعية", clientEn: "Natural Products Store", year: "2025", resultsAr: ["زيادة المبيعات 150%", "تجربة مستخدم سلسة", "تحويلات أعلى على الجوال"], resultsEn: ["150% sales increase", "Smooth user experience", "Higher mobile conversions"] },
  { slug: "restaurant", titleAr: "حملة مطعم", titleEn: "Restaurant Campaign", descAr: "حملة تسويق رقمي متكاملة لمطعم فاخر مع تصوير احترافي.", descEn: "Integrated digital marketing campaign for a fine dining restaurant.", category: "marketing", gradient: "from-orange-500 to-red-500", clientAr: "مطعم فاخر", clientEn: "Fine Dining Restaurant", year: "2025", resultsAr: ["حجوزات أكثر بنسبة 80%", "تفاعل أعلى على السوشال ميديا", "تغطية إعلامية محلية"], resultsEn: ["80% more bookings", "Higher social media engagement", "Local media coverage"] },
  { slug: "real-estate", titleAr: "موقع عقاري", titleEn: "Real Estate Website", descAr: "موقع عرض عقارات تفاعلي مع بحث متقدم وخرائط.", descEn: "Interactive property listing website with advanced search and maps.", category: "web", gradient: "from-sky-500 to-blue-600", clientAr: "شركة تطوير عقاري", clientEn: "Real Estate Developer", year: "2024", resultsAr: ["عرض أكثر من 200 عقار", "تصنيف أعلى في نتائج البحث", "استفسارات مضاعفة"], resultsEn: ["Listed 200+ properties", "Higher search rankings", "Doubled inquiries"] },
  { slug: "clinic", titleAr: "هوية عيادة طبية", titleEn: "Medical Clinic Brand", descAr: "هوية بصرية وتصميم تجربة مريحة لمركز طبي.", descEn: "Visual identity and comfortable experience design for a medical center.", category: "branding", gradient: "from-teal-500 to-cyan-600", clientAr: "مركز طبي", clientEn: "Medical Center", year: "2024", resultsAr: ["هوية مريحة ومهنية", "اتساق بصري كامل", "ثقة أعلى من المرضى"], resultsEn: ["Comfortable professional identity", "Complete visual consistency", "Higher patient trust"] },
  { slug: "coffee-shop", titleAr: "حملة مقهى", titleEn: "Coffee Shop Campaign", descAr: "إطلاق علامة مقهى جديد مع استراتيجية محتوى على السوشال ميديا.", descEn: "New coffee brand launch with social media content strategy.", category: "marketing", gradient: "from-amber-500 to-yellow-600", clientAr: "مقهى مختص", clientEn: "Specialty Coffee Shop", year: "2025", resultsAr: ["وصول 500 ألف+", "متابعون جدد 20 ألف", "إطلاق ناجح للعلامة"], resultsEn: ["500K+ reach", "20K new followers", "Successful brand launch"] },
];

export default async function PortfolioDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const isArabic = locale === "ar";
  const item = portfolio.find((p) => p.slug === slug);
  if (!item) notFound();

  const title = isArabic ? item.titleAr : item.titleEn;
  const desc = isArabic ? item.descAr : item.descEn;
  const client = isArabic ? item.clientAr : item.clientEn;
  const results = isArabic ? item.resultsAr : item.resultsEn;

  return (
    <>
      <section className={`bg-gradient-to-br ${item.gradient} py-16 text-white`}>
        <div className="container mx-auto px-4">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            {isArabic ? "جميع الأعمال" : "All Projects"}
          </Link>
          <div className="mt-8">
            <span className="text-sm font-medium uppercase tracking-wide text-white/70">{item.category}</span>
            <h1 className="mt-2 text-4xl font-bold md:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/90">{desc}</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className={`h-80 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-6xl font-bold`}>
              {title.slice(0, 2)}
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-slate-950">{isArabic ? "النتائج" : "Results"}</h2>
              <div className="mt-5 space-y-3">
                {results.map((result) => (
                  <div key={result} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                    <span className="font-medium text-slate-700">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-slate-950">{isArabic ? "تفاصيل المشروع" : "Project Details"}</h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">{isArabic ? "العميل" : "Client"}</dt>
                <dd className="font-semibold text-slate-900">{client}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">{isArabic ? "التصنيف" : "Category"}</dt>
                <dd className="font-semibold text-slate-900 capitalize">{item.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">{isArabic ? "السنة" : "Year"}</dt>
                <dd className="font-semibold text-slate-900">{item.year}</dd>
              </div>
            </dl>
            <hr className="my-6 border-slate-200" />
            <Link href="/contact" className="block">
              <Button className="w-full">{isArabic ? "ابدأ مشروعك الآن" : "Start Your Project"}</Button>
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
