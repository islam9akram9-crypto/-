import { Link } from "@/lib/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

const posts = [
  { slug: "digital-marketing-guide", titleAr: "دليلك الشامل للتسويق الرقمي في 2025", titleEn: "Complete Digital Marketing Guide 2025", excerptAr: "أحدث اتجاهات التسويق الرقمي وكيفية تطبيقها.", excerptEn: "Latest digital marketing trends and how to apply them.", date: "2025-06-15", category: "Marketing", readTime: 8 },
  { slug: "brand-identity-importance", titleAr: "أهمية الهوية البصرية لعلامتك", titleEn: "Why Visual Identity Matters", excerptAr: "الهوية البصرية هي الشخصية الكاملة لعلامتك.", excerptEn: "Visual identity is your brand's complete personality.", date: "2025-05-28", category: "Branding", readTime: 6 },
  { slug: "seo-strategy-2025", titleAr: "استراتيجية SEO فعالة 2025", titleEn: "Effective SEO Strategy 2025", excerptAr: "خطوات عملية لتحسين تصنيف موقعك.", excerptEn: "Practical steps to improve your site ranking.", date: "2025-05-10", category: "SEO", readTime: 10 },
  { slug: "social-media-growth", titleAr: "نمو حساباتك على السوشال ميديا", titleEn: "Growing Your Social Media", excerptAr: "استراتيجيات مجربة لزيادة المتابعين والتفاعل.", excerptEn: "Proven strategies for followers and engagement.", date: "2025-04-22", category: "Marketing", readTime: 7 },
  { slug: "ecommerce-success", titleAr: "أسرار نجاح المتاجر الإلكترونية", titleEn: "E-commerce Success Secrets", excerptAr: "كل ما تحتاجه لمتجر إلكتروني ناجح.", excerptEn: "Everything you need for a successful online store.", date: "2025-04-05", category: "Web", readTime: 9 },
  { slug: "content-marketing-tips", titleAr: "اتقان التسويق بالمحتوى", titleEn: "Mastering Content Marketing", excerptAr: "كيف تصنع محتوى يبني علاقة مع جمهورك.", excerptEn: "How to create content that builds audience connection.", date: "2025-03-18", category: "Content", readTime: 5 },
];

const categoryColors: Record<string, string> = {
  Marketing: "bg-pink-50 text-pink-700",
  Branding: "bg-indigo-50 text-indigo-700",
  SEO: "bg-emerald-50 text-emerald-700",
  Web: "bg-sky-50 text-sky-700",
  Content: "bg-amber-50 text-amber-700",
};

export default async function BlogPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const isArabic = locale === "ar";

  return (
    <>
      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-teal-300">{isArabic ? "المدونة" : "Blog"}</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{isArabic ? "آخر المقالات والأفكار" : "Latest Articles & Ideas"}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            {isArabic ? "نشارك خبراتنا حول التسويق الرقمي والعلامات التجارية." : "Sharing our expertise on digital marketing and branding."}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[post.category] ?? "bg-slate-100 text-slate-700"}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.readTime} {isArabic ? "دقائق" : "min"}</span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-slate-950 group-hover:text-teal-700">
                    {isArabic ? post.titleAr : post.titleEn}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                    {isArabic ? post.excerptAr : post.excerptEn}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <span>{post.date}</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}