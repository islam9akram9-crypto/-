import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { routing, type Locale } from "@/lib/i18n/routing";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Code2,
  CreditCard,
  FileText,
  FolderKanban,
  Globe2,
  Headphones,
  Megaphone,
  Palette,
  PenLine,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import type React from "react";

const content = {
  ar: {
    serviceGroups: [
      ["التسويق الرقمي", "Facebook, Instagram, TikTok, LinkedIn, X, Threads, Snapchat, YouTube", Megaphone],
      ["الإعلانات", "Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, إعادة الاستهداف والتحسين", Target],
      ["التصميم", "الشعارات، الهوية، منشورات السوشال، البروفايلات، العروض، الإنفوجرافيك", Palette],
      ["إنتاج المحتوى", "منشورات، مقالات، إعلانات، صفحات هبوط، بريد إلكتروني، ومحتوى SEO", PenLine],
      ["التصوير والإنتاج", "تصوير منتجات وشركات، ريلز، مونتاج، وMotion Graphics", FileText],
      ["البرمجة", "مواقع، متاجر، أنظمة خاصة، Android, iOS, وصفحات هبوط", Code2],
      ["تحسين محركات البحث", "Technical SEO, On-page, Off-page, Keywords, Link Building", Search],
      ["خدمات إضافية", "ترجمة، استشارات، تدريب، وإدارة السمعة الرقمية", Globe2],
    ],
    modules: [
      ["Dashboard", "إيرادات، عملاء، مشاريع، مهام، إشعارات، وإحصائيات لحظية.", BarChart3],
      ["CRM", "عملاء محتملون، مراحل بيعية، ملاحظات، اجتماعات، وتحويل العميل إلى مشروع.", Users],
      ["المشاريع", "Kanban، مهام، ملفات، وقت، موافقات، ونسبة إنجاز واضحة.", FolderKanban],
      ["الفواتير", "فواتير، مدفوعات، اشتراكات، تقارير، وإيصالات دفع.", CreditCard],
      ["إدارة المحتوى", "خدمات، باقات، مدونة، أعمال، وسائط، وصفحات هبوط.", FileText],
      ["الإعدادات", "شركة، لغات، ثيم، بريد، دفع، صلاحيات، وتعدد شركات.", ShieldCheck],
      ["بوابة العميل", "مشاريع، ملفات، موافقات، فواتير، دعم، دردشة، وحجز اجتماعات.", Headphones],
      ["Multi-Tenant", "شعار وألوان ومستخدمون وعملاء ومشاريع ونطاق لكل شركة.", Building2],
    ],
    ai: [
      ["AI Assistant", "مساعد داخل المنصة يختصر العمل اليومي للفريق."],
      ["Content AI", "كتابة منشورات ومقالات وإعلانات وصفحات هبوط."],
      ["SEO AI", "تحليل الموقع واقتراح الكلمات وتحسين الصفحات."],
      ["Marketing AI", "اقتراح حملات وتحليل النتائج وتحسين الأداء."],
      ["Sales AI", "إنشاء عروض أسعار والرد والمتابعة مع العملاء."],
      ["Analytics AI", "تحليل الإيرادات والعملاء وتوقع النمو."],
      ["Translation AI", "ترجمة المحتوى ودعم توسع اللغات."],
    ],
    audiences: ["الشركات الناشئة", "المتاجر الإلكترونية", "المطاعم والمقاهي", "العيادات والمراكز الطبية", "المؤسسات التعليمية", "العقارات", "السفر والسياحة", "المؤسسات الحكومية", "المؤثرون", "العلامات الشخصية"],
    packages: [
      ["Launch", "لبناء الحضور الرقمي الأول", "2,900", ["تدقيق الهوية", "إعداد القنوات", "محتوى شهري", "تقرير أداء"]],
      ["Growth", "للنمو بالحملات والمحتوى", "6,900", ["استراتيجية شهرية", "إعلانات ممولة", "صفحات هبوط", "تحسين الحملات"]],
      ["Platform", "لإدارة العمل من النظام", "14,900", ["CRM ومشاريع", "بوابة عميل", "فواتير ومدفوعات", "تقارير وAI"]],
    ],
    roadmap: [
      ["المرحلة 1", "موقع احترافي، صفحات خدمات، أعمال، باقات، تواصل، وبنية ترجمة."],
      ["المرحلة 2", "لوحة تحكم داخلية: CRM، مشاريع، مهام، ملفات، وفواتير."],
      ["المرحلة 3", "بوابة العميل والدفع والدعم والموافقات وحجز الاجتماعات."],
      ["المرحلة 4", "ذكاء اصطناعي وأتمتة وتقارير وتعدد شركات."],
      ["المرحلة 5", "إطلاق المنتج كـ SaaS مع White Label وMarketplace وAPI عامة."],
    ],
  },
  en: {
    serviceGroups: [
      ["Digital marketing", "Facebook, Instagram, TikTok, LinkedIn, X, Threads, Snapchat, YouTube", Megaphone],
      ["Advertising", "Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, retargeting and optimization", Target],
      ["Design", "Logos, identity, social posts, profiles, presentations, and infographics", Palette],
      ["Content production", "Posts, articles, ads, landing pages, email, and SEO content", PenLine],
      ["Media production", "Product shoots, corporate shoots, reels, editing, and motion graphics", FileText],
      ["Development", "Websites, stores, custom systems, Android, iOS, and landing pages", Code2],
      ["SEO", "Technical SEO, on-page, off-page, keywords, and link building", Search],
      ["Additional services", "Translation, consulting, training, and reputation management", Globe2],
    ],
    modules: [
      ["Dashboard", "Revenue, clients, projects, tasks, notifications, and live statistics.", BarChart3],
      ["CRM", "Leads, sales stages, notes, meetings, and lead-to-project conversion.", Users],
      ["Projects", "Kanban, tasks, files, time, approvals, and clear progress.", FolderKanban],
      ["Invoicing", "Invoices, payments, subscriptions, reports, and receipts.", CreditCard],
      ["Content management", "Services, packages, blog, portfolio, media, and landing pages.", FileText],
      ["Settings", "Company, languages, theme, mail, payments, roles, and tenants.", ShieldCheck],
      ["Client portal", "Projects, files, approvals, invoices, support, chat, and meetings.", Headphones],
      ["Multi-tenant", "Logo, colors, users, clients, projects, and domain for each company.", Building2],
    ],
    ai: [
      ["AI Assistant", "An in-platform assistant that reduces daily team workload."],
      ["Content AI", "Writes posts, articles, ads, and landing pages."],
      ["SEO AI", "Audits sites, suggests keywords, and improves pages."],
      ["Marketing AI", "Suggests campaigns, analyzes results, and improves performance."],
      ["Sales AI", "Creates quotes, replies, and follows up with leads."],
      ["Analytics AI", "Analyzes revenue, clients, and growth forecasts."],
      ["Translation AI", "Translates content and supports language expansion."],
    ],
    audiences: ["Startups", "E-commerce stores", "Restaurants and cafes", "Clinics and medical centers", "Educational institutions", "Real estate", "Travel and tourism", "Government entities", "Influencers", "Personal brands"],
    packages: [
      ["Launch", "For first digital presence", "2,900", ["Brand audit", "Channel setup", "Monthly content", "Performance report"]],
      ["Growth", "For campaigns and content growth", "6,900", ["Monthly strategy", "Paid ads", "Landing pages", "Campaign optimization"]],
      ["Platform", "For managing work from the system", "14,900", ["CRM and projects", "Client portal", "Invoices and payments", "Reports and AI"]],
    ],
    roadmap: [
      ["Phase 1", "Professional website, services, portfolio, packages, contact, and i18n foundation."],
      ["Phase 2", "Internal dashboard: CRM, projects, tasks, files, and invoices."],
      ["Phase 3", "Client portal, payments, support, approvals, and meeting booking."],
      ["Phase 4", "AI, automation, reports, and multi-tenancy."],
      ["Phase 5", "Launch as SaaS with White Label, Marketplace, and public API."],
    ],
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = routing.locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : routing.defaultLocale;
  const t = await getTranslations({ locale });
  const data = content[locale];
  const isArabic = locale === "ar";

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(20,184,166,0.45),transparent_30%),radial-gradient(circle_at_85%_25%,rgba(245,158,11,0.32),transparent_26%),linear-gradient(135deg,#020617,#111827_55%,#042f2e)]" />
        <div className="container relative mx-auto grid min-h-[calc(100vh-4rem)] items-center gap-12 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-teal-50">
              <Sparkles className="h-4 w-4 text-amber-300" />
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">{t("hero.title")}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg" className="bg-teal-400 text-slate-950 hover:bg-teal-300">
                  <Rocket className="h-4 w-4" />
                  {t("hero.cta")}
                </Button>
              </Link>
              <a href="#platform">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10">
                  <Workflow className="h-4 w-4" />
                  {t("hero.secondary")}
                </Button>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-white p-5 text-slate-950">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm text-slate-500">{isArabic ? "نظام تشغيل الوكالة" : "Agency operating system"}</p>
                  <h2 className="text-2xl font-bold">{isArabic ? "Nabd OS" : "Nabd OS"}</h2>
                </div>
                <BrainCircuit className="h-10 w-10 text-teal-600" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  [isArabic ? "CRM" : "CRM", "86%"],
                  [isArabic ? "المشاريع" : "Projects", "74%"],
                  [isArabic ? "الفواتير" : "Billing", "62%"],
                  [isArabic ? "AI" : "AI", "91%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between text-sm">
                      <span className="font-medium">{label}</span>
                      <span className="text-teal-700">{value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200">
                      <div className="h-2 rounded-full bg-teal-500" style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-slate-200 p-4">
                <p className="text-sm font-semibold">{isArabic ? "مسار العميل" : "Client flow"}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {isArabic
                    ? "Lead -> عرض سعر -> مشروع -> فاتورة -> دعم -> نمو"
                    : "Lead -> Quote -> Project -> Invoice -> Support -> Growth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-10">
        <div className="container mx-auto grid gap-5 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["8+", isArabic ? "محاور خدمات" : "Service pillars"],
            ["10", isArabic ? "قطاعات مستهدفة" : "Target sectors"],
            ["11", isArabic ? "أدوار وصلاحيات" : "Roles and permissions"],
            ["SaaS", isArabic ? "رؤية المنتج" : "Product vision"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-slate-200 p-5">
              <p className="text-3xl font-bold text-slate-950">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <SectionTitle title={t("sections.servicesTitle")} subtitle={t("sections.servicesSubtitle")} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {data.serviceGroups.map(([title, description, Icon]) => (
              <FeatureCard
                key={title as string}
                title={title as string}
                description={description as string}
                icon={Icon as React.ComponentType<{ className?: string }>}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle title={t("sections.platformTitle")} subtitle={t("sections.platformSubtitle")} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {data.modules.map(([title, description, Icon]) => (
              <FeatureCard
                key={title as string}
                title={title as string}
                description={description as string}
                icon={Icon as React.ComponentType<{ className?: string }>}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4">
          <SectionTitle dark title={t("sections.aiTitle")} subtitle={t("sections.aiSubtitle")} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.ai.map(([title, description]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-400 text-slate-950">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-slate-950 md:text-4xl">{t("sections.audienceTitle")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {data.audiences.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-4">
                <Store className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <SectionTitle title={t("sections.packagesTitle")} subtitle={isArabic ? "ابدأ بخدمة واضحة، ثم اربط العميل تدريجيًا بالمنصة." : "Start with a clear service, then gradually connect the client to the platform."} />
          <div className="grid gap-5 lg:grid-cols-3">
            {data.packages.map(([name, description, price, features], index) => (
              <div key={name as string} className={`rounded-lg border bg-white p-6 shadow-sm ${index === 2 ? "border-teal-500 ring-2 ring-teal-100" : "border-slate-200"}`}>
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-bold">{name as string}</h3>
                    <p className="mt-2 text-sm text-slate-500">{description as string}</p>
                  </div>
                  {index === 2 && <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">SaaS</span>}
                </div>
                <p className="text-4xl font-bold">
                  {price as string} <span className="text-base font-medium text-slate-500">{t("common.sar")}</span>
                </p>
                <p className="mt-1 text-sm text-slate-500">{t("common.monthly")}</p>
                <ul className="mt-6 space-y-3">
                  {(features as string[]).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle title={t("sections.roadmapTitle")} subtitle={isArabic ? "نبنيها تدريجيًا: وكالة تعمل، ثم منصة داخلية، ثم منتج يباع للآخرين." : "Build it gradually: working agency, internal platform, then a product sold to others."} />
          <div className="grid gap-4 lg:grid-cols-5">
            {data.roadmap.map(([phase, description], index) => (
              <div key={phase} className="rounded-lg border border-slate-200 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">{index + 1}</div>
                <h3 className="font-semibold">{phase}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-600 py-16 text-white">
        <div className="container mx-auto flex flex-col justify-between gap-6 px-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">{t("sections.ctaTitle")}</h2>
            <p className="mt-3 max-w-3xl text-teal-50">{t("sections.ctaSubtitle")}</p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
              <BriefcaseBusiness className="h-4 w-4" />
              {t("hero.cta")}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionTitle({
  title,
  subtitle,
  dark = false,
}: {
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className={`text-3xl font-bold md:text-4xl ${dark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      <p className={`mt-4 text-lg leading-8 ${dark ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
