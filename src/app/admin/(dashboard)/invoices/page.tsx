import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";

const invoices = [
  { id: "INV-001", client: "شركة التقنية الذكية", amount: "25,000 ر.س", status: "مدفوعة", date: "2025-06-01", due: "2025-06-15" },
  { id: "INV-002", client: "عيادات النخبة", amount: "45,000 ر.س", status: "منتظرة", date: "2025-06-05", due: "2025-06-20" },
  { id: "INV-003", client: "مطاعم الذوق الرفيع", amount: "60,000 ر.س", status: "متأخرة", date: "2025-05-20", due: "2025-06-04" },
  { id: "INV-004", client: "متجر للعطور", amount: "12,000 ر.س", status: "مدفوعة", date: "2025-05-25", due: "2025-06-09" },
  { id: "INV-005", client: "شركة العقارات المتحدة", amount: "80,000 ر.س", status: "منتظرة", date: "2025-06-10", due: "2025-06-25" },
];

const statusColors: Record<string, string> = {
  "مدفوعة": "bg-emerald-50 text-emerald-700",
  "منتظرة": "bg-amber-50 text-amber-700",
  "متأخرة": "bg-red-50 text-red-700",
};

export default function AdminInvoices() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">الفواتير</h1>
          <p className="mt-1 text-sm text-slate-500">إدارة الفواتير والمدفوعات</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4" />
          فاتورة جديدة
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">إجمالي المدفوع</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">143,000 ر.س</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">قيد الانتظار</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">125,000 ر.س</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">متأخرات</p>
          <p className="mt-2 text-2xl font-bold text-red-600">60,000 ر.س</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
              <th className="px-4 py-3 font-semibold">رقم الفاتورة</th>
              <th className="px-4 py-3 font-semibold">العميل</th>
              <th className="px-4 py-3 font-semibold">المبلغ</th>
              <th className="px-4 py-3 font-semibold">الحالة</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">تاريخ الإصدار</th>
              <th className="hidden px-4 py-3 font-semibold md:table-cell">الاستحقاق</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{invoice.id}</td>
                <td className="px-4 py-3 text-slate-600">{invoice.client}</td>
                <td className="px-4 py-3 font-medium text-slate-900">{invoice.amount}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[invoice.status] ?? "bg-slate-100 text-slate-600"}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">{invoice.date}</td>
                <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">{invoice.due}</td>
                <td className="px-4 py-3 text-left">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
