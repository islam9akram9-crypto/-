import { Button } from "@/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { getLocale } from "next-intl/server";
import { Award, Eye, Heart, Rocket, Target, Users } from "lucide-react";

export default async function AboutPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const isArabic = locale === "ar";

  return (
    <>
      {/* Page header */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-teal-300">{isArabic ? "من نحن" : "About Us"}</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{isArabic ? "نبض ميديا" : "Nabd Media"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            {isArabic
              ? "وكالة تسويق رقمي فلسطينية تجمع بين الإبداع والتقنية لنقدّم حلولاً متكاملة تنقل علامتك إلى آفاق جديدة."
              : "A Palestine digital marketing agency combining creativity and technology to deliver integrated solutions that take your brand to new heights."}
          </p>
        </div>
      </section>

      {/* Story / Vision / Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Eye,
                title: isArabic ? "رؤيتنا" : "Our Vision",
                desc: isArabic
                  ? "أن نكون الشركة الرائدة في تقديم حلول رقمية متكاملة في المنطقة، ونصنع معياراً جديداً في الجودة والإبداع."
                  : "To be the leading provider of integrated digital solutions in the region, setting a new standard for quality and creativity."},
              {
                icon: Target,
                title: isArabic ? "رسالتنا" : "Our Mission",
                desc: isArabic
                  ? "تمكين الشركات والعلامات من النمو عبر حضور رقمي قوي ومؤثر، مدعوم بأحدث التقنيات وأفضل الممارسات."
                  : "Empower businesses and brands to grow through a strong, impactful digital presence, powered by the latest technologies and best practices."},
              {
                icon: Rocket,
                title: isArabic ? "قصتنا" : "Our Story",
                desc: isArabic
                  ? "بدأنا برؤية واضحة: نسد الفجوة بين الإبداع والتقنية. اليوم نخدم عشرات الشركات في مختلف القطاعات."
                  : "We started with a clear vision: bridging the gap between creativity and technology. Today we serve dozens of businesses across multiple sectors."},
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title as string} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-950">{title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-slate-950 md:text-4xl">{isArabic ? "قيمنا" : "Our Values"}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
            {isArabic ? "المبادئ التي تحدد طريقة عملنا وعلاقتنا مع عملائنا" : "The principles that define how we work and our relationship with clients"}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: isArabic ? "التميّز" : "Excellence", desc: isArabic ? "معايير جودة عالية في كل تفصيلة" : "High quality standards in every detail" },
              { icon: Users, title: isArabic ? "الشراكة" : "Partnership", desc: isArabic ? "نعمل كفريق واحد مع عملائنا" : "We work as one team with our clients" },
              { icon: Eye, title: isArabic ? "الشفافية" : "Transparency", desc: isArabic ? "وضوح كامل في الأسعار والنتائج" : "Full clarity in pricing and results" },
              { icon: Heart, title: isArabic ? "الشغف" : "Passion", desc: isArabic ? "نحب ما نفعله ونؤمن بتأثيره" : "We love what we do and believe in its impact" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title as string} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 py-16 text-white">
        <div className="container mx-auto flex flex-col justify-between gap-6 px-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-bold">{isArabic ? "جاهز تبدأ معنا؟" : "Ready to start with us?"}</h2>
            <p className="mt-3 text-teal-50">{isArabic ? "احجز استشارة مجانية وتعرف على كيف يمكننا مساعدتك" : "Book a free consultation and see how we can help you"}</p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50">
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}