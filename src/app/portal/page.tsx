import { Button } from "@/components/ui/button";
import { Calendar, FileUp, MessageCircle, ReceiptText } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ClientPortalPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-teal-700">بوابة العميل</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">مرحبًا، هذا نموذج بوابة نبض ميديا</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            هنا يتابع العميل المشاريع، الملفات، الموافقات، الفواتير، الدعم، والدردشة مع الفريق.
          </p>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["رفع ملف", FileUp],
            ["الفواتير", ReceiptText],
            ["الدردشة", MessageCircle],
            ["حجز اجتماع", Calendar],
          ].map(([label, Icon]) => (
            <button key={label as string} className="rounded-lg border border-slate-200 bg-white p-5 text-right shadow-sm transition-colors hover:border-teal-300">
              <Icon className="mb-4 h-6 w-6 text-teal-600" />
              <span className="font-semibold">{label as string}</span>
            </button>
          ))}
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="font-bold text-slate-950">مشروع إطلاق الهوية والموقع</h2>
              <p className="mt-1 text-sm text-slate-500">التقدم الحالي 68%</p>
            </div>
            <Button>فتح تذكرة دعم</Button>
          </div>
          <div className="mt-5 h-3 rounded-full bg-slate-100">
            <div className="h-3 rounded-full bg-teal-500" style={{ width: "68%" }} />
          </div>
        </section>
      </div>
    </main>
  );
}
