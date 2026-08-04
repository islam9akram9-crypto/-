import { Button } from "@/shared/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const data = {
  ar: [
    ["Launch", "بداية احترافية للحضور الرقمي", "2,900", ["تدقيق الهوية", "إعداد القنوات", "8 منشورات شهرية", "تقرير أداء"]],
    ["Growth", "نمو متكامل بالمحتوى والإعلانات", "6,900", ["استراتيجية شهرية", "إدارة حملات", "صفحات هبوط", "تحسين مستمر"]],
    ["Platform", "خدمة + تشغيل من داخل المنصة", "14,900", ["CRM", "إدارة مشاريع", "بوابة عميل", "فواتير وتقارير"]],
  ],
  en: [
    ["Launch", "Professional digital presence starter", "2,900", ["Brand audit", "Channel setup", "8 monthly posts", "Performance report"]],
    ["Growth", "Content and advertising growth", "6,900", ["Monthly strategy", "Campaign management", "Landing pages", "Ongoing optimization"]],
    ["Platform", "Service plus platform operations", "14,900", ["CRM", "Project management", "Client portal", "Invoices and reports"]],
  ],
};

export default async function PackagesPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const t = await getTranslations();

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-slate-950">{t("sections.packagesTitle")}</h1>
          <p className="mt-4 text-lg text-slate-600">
            {locale === "ar" ? "باقات قابلة للتطوير من خدمة وكالة إلى تشغيل كامل داخل المنصة." : "Packages that scale from agency services to full platform operations."}
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {data[locale].map(([name, description, price, features], index) => (
            <article key={name as string} className={`rounded-lg border bg-white p-6 shadow-sm ${index === 2 ? "border-teal-500 ring-2 ring-teal-100" : "border-slate-200"}`}>
              <h2 className="text-2xl font-bold">{name as string}</h2>
              <p className="mt-2 text-slate-500">{description as string}</p>
              <p className="mt-6 text-4xl font-bold">{price as string} <span className="text-base text-slate-500">{t("common.sar")}</span></p>
              <ul className="mt-6 space-y-3">
                {(features as string[]).map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full">{locale === "ar" ? "طلب الباقة" : "Request package"}</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
