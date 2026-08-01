import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Phone, Mail, Building2, MoreHorizontal, Filter } from "lucide-react";

const leads = [
  { id: "L-001", name: "أحمد المطيري", company: "شركة التقنية الذكية", email: "ahmed@smarttech.com", phone: "+966 55 123 4567", stage: "جديد", value: "25,000 ر.س", date: "2025-06-01" },
  { id: "L-002", name: "سارة العتيبي", company: "عيادات النخبة", email: "sara@eliteclinic.com", phone: "+966 50 987 6543", stage: "مؤهل", value: "45,000 ر.س", date: "2025-06-02" },
  { id: "L-003", name: "محمد الغامدي", company: "مطاعم الذوق الرفيع", email: "mohammed@gourmet.com", phone: "+966 53 456 7890", stage: "عرض سعر", value: "60,000 ر.س", date: "2025-06-03" },
  { id: "L-004", name: "نورة الدوسري", company: "متجر للعطور", email: "noura@perfumes.com", phone: "+966 56 234 5678", stage: "إغلاق", value: "35,000 ر.س", date: "2025-06-04" },
  { id: "L-005", name: "خالد الشمري", company: "شركة العقارات المتحدة", email: "khaled@unitedre.com", phone: "+966 54 345 6789", stage: "جديد", value: "80,000 ر.س", date: "2025-06-05" },
  { id: "L-006", name: "ريم القحطاني", company: "مؤسسة التعليم الحديث", email: "reem@modernedu.com", phone: "+966 58 456 7890", stage: "مؤهل", value: "20,000 ر.س", date: "2025-06-06" },
];

const stageColors: Record<string, string> = {
  "جديد": "bg-sky-50 text-sky-700",
  "مؤهل": "bg-amber-50 text-amber-700",
  "عرض سعر": "bg-indigo-50 text-indigo-700",
  "إغلاق": "bg-emerald-50 text-emerald-700",
};

const pipeline = [
  { stage: "جديد", count: 12, color: "bg-sky-500" },
  { stage: "مؤهل", count: 8, color: "bg-amber-500" },
  { stage: "عرض سعر", count: 5, color: "bg-indigo-500" },
  { stage: "إغلاق", count: 3, color: "bg-emerald-500" },
];

export default function AdminCRM() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">إدارة العملاء المحتملين</h1>
          <p className="mt-1 text-sm text-slate-500">متابعة العملاء المحتملين عبر مراحل البيع</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <UserPlus className="h-4 w-4" />
          عميل جديد
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {pipeline.map((item) => (
          <div key={item.stage} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{item.stage}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-950">{item.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="ابحث عن عميل محتمل..." className="pr-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
          تصفية
        </Button>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
              <th className="px-4 py-3 font-semibold">العميل</th>
              <th className="px-4 py-3 font-semibold">الشركة</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">التواصل</th>
              <th className="px-4 py-3 font-semibold">المرحلة</th>
              <th className="hidden px-4 py-3 font-semibold lg:table-cell">القيمة</th>
              <th className="px-4 py-3 font-semibold">التاريخ</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{lead.name}</p>
                  <p className="text-xs text-slate-400">{lead.id}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    {lead.company}
                  </span>
                </td>
                <td className="hidden px-4 py-3 md:table-cell">
                  <div className="space-y-1 text-xs text-slate-500">
                    <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{lead.email}</p>
                    <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{lead.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${stageColors[lead.stage] ?? "bg-slate-100 text-slate-700"}`}>
                    {lead.stage}
                  </span>
                </td>
                <td className="hidden px-4 py-3 font-medium text-slate-900 lg:table-cell">{lead.value}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{lead.date}</td>
                <td className="px-4 py-3 text-left">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <p>عرض 6 من أصل 28 عميل محتمل</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>السابق</Button>
          <Button variant="outline" size="sm">التالي</Button>
        </div>
      </div>
    </div>
  );
}