import { Button } from "@/components/ui/button";
import { BarChart3, CreditCard, FolderKanban, Users } from "lucide-react";

const metrics = [
  ["الإيرادات", "128,400 ر.س", BarChart3],
  ["العملاء", "64", Users],
  ["المشاريع", "18", FolderKanban],
  ["الفواتير", "37", CreditCard],
];

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-lg bg-slate-950 p-6 text-white md:flex-row md:items-center">
          <div>
            <p className="text-sm text-teal-300">Nabd OS</p>
            <h1 className="mt-2 text-3xl font-bold">لوحة التحكم</h1>
            <p className="mt-2 text-slate-300">نموذج أولي لإدارة CRM، المشاريع، الفواتير، والفريق.</p>
          </div>
          <Button className="bg-teal-400 text-slate-950 hover:bg-teal-300">إنشاء عميل محتمل</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map(([label, value, Icon]) => (
            <div key={label as string} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Icon className="mb-4 h-6 w-6 text-teal-600" />
              <p className="text-sm text-slate-500">{label as string}</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">{value as string}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-950">المراحل البيعية</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {["Lead", "Qualified", "Proposal", "Won"].map((stage, index) => (
                <div key={stage} className="rounded-lg bg-slate-50 p-4">
                  <p className="font-semibold">{stage}</p>
                  <p className="mt-2 text-2xl font-bold">{[12, 8, 5, 3][index]}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-950">مهام اليوم</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>مراجعة حملة متجر العطور</li>
              <li>إرسال عرض سعر لعيادة طبية</li>
              <li>اعتماد تصميمات مطعم جديد</li>
              <li>متابعة فاتورة شركة عقارية</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
