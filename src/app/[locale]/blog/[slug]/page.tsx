import { Button } from "@/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

const posts = [
  { slug: "digital-marketing-guide", titleAr: "دليلك الشامل للتسويق الرقمي في 2025", titleEn: "Complete Digital Marketing Guide 2025", excerptAr: "أحدث اتجاهات التسويق الرقمي وكيفية تطبيقها.", excerptEn: "Latest digital marketing trends and how to apply them.", contentAr: ["في عالم اليوم الرقمي المتسارع، أصبح التسويق الرقمي ضرورة لا رفاهية. من الإعلانات الممولة إلى المحتوى الإبداعي، تحتاج العلامات إلى استراتيجية متكاملة.", "في هذا الدليل، نستعرض أهم الاتجاهات لعام 2025: الذكاء الاصطناعي في الإعلانات، التسويق عبر المؤثرين، المحتوى التفاعلي، والتحليل المتقدم للبيانات.", "المفتاح هو البدء باستراتيجية واضحة، وقياس النتائج باستمرار، والتكيف مع ما يعمل لجمهورك."], contentEn: ["In today's fast digital world, digital marketing is a necessity, not a luxury. From paid ads to creative content, brands need integrated strategies.", "In this guide, we cover the top trends for 2025: AI in advertising, influencer marketing, interactive content, and advanced data analytics.", "The key is starting with a clear strategy, measuring results consistently, and adapting to what works for your audience."], date: "2025-06-15", category: "Marketing", readTime: 8 },
  { slug: "brand-identity-importance", titleAr: "أهمية الهوية البصرية لعلامتك", titleEn: "Why Visual Identity Matters", excerptAr: "الهوية البصرية هي الشخصية الكاملة لعلامتك.", excerptEn: "Visual identity is your brand's complete personality.", contentAr: ["الهوية البصرية ليست مجرد شعار جميل. إنها الطريقة التي يعرفك بها العالم.", "من الألوان إلى الخطوط إلى الصور، كل عنصر يروي قصة عن علامتك ويبني ثقة مع جمهورك.", "استثمر في هوية بصرية متكاملة وسترى الفرق في طريقة تفاعل عملائك معك."], contentEn: ["Visual identity is not just a pretty logo. It's how the world recognizes you.", "From colors to typography to imagery, every element tells a story about your brand and builds trust with your audience.", "Invest in a complete visual identity and you'll see the difference in how customers engage with you."], date: "2025-05-28", category: "Branding", readTime: 6 },
  { slug: "seo-strategy-2025", titleAr: "استراتيجية SEO فعالة 2025", titleEn: "Effective SEO Strategy 2025", excerptAr: "خطوات عملية لتحسين تصنيف موقعك.", excerptEn: "Practical steps to improve your site ranking.", contentAr: ["تحسين محركات البحث هو رحلة مستمرة، وليس وجهة نهائية.", "ابدأ بتدقيق تقني شامل، ثم ركز على المحتوى عالي الجودة الذي يجيب على أسئلة المستخدمين.", "الكلمات المفتاحية الطويلة (Long-tail Keywords) والبحث الصوتي هما من أهم اتجاهات 2025."], contentEn: ["SEO is an ongoing journey, not a final destination.", "Start with a thorough technical audit, then focus on high-quality content that answers user questions.", "Long-tail keywords and voice search are among the most important 2025 trends."], date: "2025-05-10", category: "SEO", readTime: 10 },
  { slug: "social-media-growth", titleAr: "نمو حساباتك على السوشال ميديا", titleEn: "Growing Your Social Media", excerptAr: "استراتيجيات مجربة لزيادة المتابعين والتفاعل.", excerptEn: "Proven strategies for followers and engagement.", contentAr: ["النمو الحقيقي على السوشال ميديا لا يأتي من الحظ، بل من استراتيجية مدروسة.", "افهم جمهورك، انشر محتوى قيماً باستمرار، وتفاعل مع متابعيك بصدق.", "استخدم التحليلات لاكتشاف ما يعمل وتضاعف من جهودك في هذا الاتجاه."], contentEn: ["Real social media growth doesn't come from luck, but from a thoughtful strategy.", "Understand your audience, post valuable content consistently, and engage with your followers genuinely.", "Use analytics to discover what works and double down on it."], date: "2025-04-22", category: "Marketing", readTime: 7 },
  { slug: "ecommerce-success", titleAr: "أسرار نجاح المتاجر الإلكترونية", titleEn: "E-commerce Success Secrets", excerptAr: "كل ما تحتاجه لمتجر إلكتروني ناجح.", excerptEn: "Everything you need for a successful online store.", contentAr: ["النجاح في التجارة الإلكترونية يبدأ بتجربة مستخدم استثنائية.", "سرعة التحميل، سهولة الدفع، الأمان، والدعم السريع — هذه هي أساسيات التحويل.", "لا تنسَ التسويق: المبيعات لا تأتي وحدها، بل تحتاج محركاً مستمراً."], contentEn: ["E-commerce success starts with an exceptional user experience.", "Fast loading, easy checkout, security, and quick support — these are conversion fundamentals.", "Don't forget marketing: sales don't come alone, they need a continuous engine."], date: "2025-04-05", category: "Web", readTime: 9 },
];

const categoryColors: Record<string, string> = {
  Marketing: "bg-pink-50 text-pink-700",
  Branding: "bg-indigo-50 text-indigo-700",
  SEO: "bg-emerald-50 text-emerald-700",
  Web: "bg-sky-50 text-sky-700",
};

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const isArabic = locale === "ar";
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const title = isArabic ? post.titleAr : post.titleEn;
  const excerpt = isArabic ? post.excerptAr : post.excerptEn;
  const paragraphs = isArabic ? post.contentAr : post.contentEn;

  return (
    <>
      <article className="bg-slate-50 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900">
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            {isArabic ? "العودة للمدونة" : "Back to Blog"}
          </Link>
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[post.category] ?? "bg-slate-100 text-slate-700"}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime} {isArabic ? "دقائق" : "min"}
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">{title}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{excerpt}</p>
          </div>
          <div className="mt-10 rounded-xl bg-white p-8 shadow-sm">
            {paragraphs.map((p, i) => (
              <p key={i} className={`leading-8 text-slate-700 ${i > 0 ? "mt-6" : ""}`}>{p}</p>
            ))}
          </div>
          <div className="mt-10 rounded-xl bg-slate-950 p-8 text-center text-white">
            <h2 className="text-2xl font-bold">{isArabic ? "هل تحتاج مساعدة في هذا المجال؟" : "Need help in this area?"}</h2>
            <p className="mt-3 text-slate-300">{isArabic ? "فريقنا جاهز لمساعدتك." : "Our team is ready to help you."}</p>
            <Link href="/contact" className="mt-6 inline-block">
              <Button className="bg-teal-400 text-slate-950 hover:bg-teal-300">
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
