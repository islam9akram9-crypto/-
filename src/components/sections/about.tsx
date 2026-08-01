import { useLocale, useTranslations } from "next-intl";
import { Target, Eye, Heart, Users } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();

  const values = [
    { icon: Target, title: locale === "ar" ? "التميز" : "Excellence", desc: locale === "ar" ? "نسعى للتميز في كل مشروع" : "We strive for excellence in every project" },
    { icon: Eye, title: locale === "ar" ? "الشفافية" : "Transparency", desc: locale === "ar" ? "تواصل واضح وصادق مع عملائنا" : "Clear and honest communication with clients" },
    { icon: Heart, title: locale === "ar" ? "الشغف" : "Passion", desc: locale === "ar" ? "نحب ما نفعل ونبدع فيه" : "We love what we do and excel at it" },
    { icon: Users, title: locale === "ar" ? "الشراكة" : "Partnership", desc: locale === "ar" ? "نعمل كشريك في نجاحك" : "We work as partners in your success" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("title")}</h2>
            <p className="text-lg text-slate-600 mb-6">{t("subtitle")}</p>
            <p className="text-slate-600 leading-relaxed mb-4">
              {locale === "ar"
                ? "نبض ميديا وكالة تسويق رقمي سعودية تأسست برؤية واضحة: تمكين الشركات من بناء حضور رقمي قوي ومؤثر. نجمع بين الإبداع والتقنية لنقدّم حلولاً متكاملة."
                : "Nabd Media is a Saudi digital marketing agency founded with a clear vision: empowering businesses to build strong, impactful digital presence. We combine creativity and technology to deliver integrated solutions."}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {values.map((v) => (
                <div key={v.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{v.title}</h4>
                    <p className="text-sm text-slate-500">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-6xl font-bold">
              {locale === "ar" ? "نبض" : "Nabd"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
