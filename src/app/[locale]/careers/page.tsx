import { Button } from "@/components/ui/button";
import { getLocale } from "next-intl/server";
import { Briefcase, MapPin, Clock } from "lucide-react";

const jobs = [
  { titleAr: "مصمم جرافيك", titleEn: "Graphic Designer", typeAr: "دوام كامل", typeEn: "Full-time", locationAr: "الرياض", locationEn: "Riyadh", descAr: "تصميم هويات بصرية ومحتوى سوشال ميديا إبداعي.", descEn: "Design visual identities and creative social media content." },
  { titleAr: "مطور ويب", titleEn: "Web Developer", typeAr: "دوام كامل", typeEn: "Full-time", locationAr: "عن بُعد", locationEn: "Remote", descAr: "تطوير مواقع وتطبيقات ويب حديثة باستخدام Next.js.", descEn: "Build modern websites and web apps using Next.js." },
  { titleAr: "أخصائي تسويق رقمي", titleEn: "Digital Marketing Specialist", typeAr: "دوام كامل", typeEn: "Full-time", locationAr: "الرياض", locationEn: "Riyadh", descAr: "إدارة حملات إعلانية واستراتيجيات نمو للعملاء.", descEn: "Manage ad campaigns and growth strategies for clients." },
  { titleAr: "كاتب محتوى", titleEn: "Content Writer", typeAr: "جزئي", typeEn: "Part-time", locationAr: "عن بُعد", locationEn: "Remote", descAr: "كتابة محتوى تسويقي ومقالات بالعربية والإنجليزية.", descEn: "Write marketing content and articles in Arabic and English." },
] as const;

export default async function CareersPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const isArabic = locale === "ar";

  return (
    <>
      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-teal-300">{isArabic ? "انضم إلينا" : "Join Us"}</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{isArabic ? "اعمل مع نبض ميديا" : "Work with Nabd Media"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            {isArabic ? "نبحث عن مواهب شغوفة تريد بناء شيء مميز." : "We're looking for passionate talent who want to build something great."}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <article key={job.titleEn} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-950">{isArabic ? job.titleAr : job.titleEn}</h2>
                    <p className="text-sm text-slate-500">{isArabic ? job.descAr : job.descEn}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    {isArabic ? job.typeAr : job.typeEn}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {isArabic ? job.locationAr : job.locationEn}
                  </span>
                </div>
                <a href="mailto:hello@nabdmedia.com?subject=Job%20Application" className="mt-6 block">
                  <Button className="w-full">{isArabic ? "قدّم الآن" : "Apply Now"}</Button>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}