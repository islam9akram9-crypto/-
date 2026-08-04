import { auth } from "@/lib/auth";
import { invoiceRepository } from "@/repositories/invoice.repository";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { Plus, Download } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_MAP: Record<string, { label: string; badge: "secondary" | "info" | "warning" | "success" | "destructive" }> = {
  DRAFT: { label: "مسودة", badge: "secondary" },
  SENT: { label: "مرسلة", badge: "info" },
  PAID: { label: "مدفوعة", badge: "success" },
  OVERDUE: { label: "متأخرة", badge: "destructive" },
  CANCELLED: { label: "ملغاة", badge: "secondary" },
};

export default async function AdminInvoices() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    return <EmptyState title="غير مصرح" description="يجب تسجيل الدخول للوصول إلى هذه الصفحة." />;
  }

  const [invoices, summary] = await Promise.all([
    invoiceRepository.list({
      organizationId: session.user.organizationId,
      pageSize: 20,
    }),
    invoiceRepository.getFinancialSummary(session.user.organizationId),
  ]);

  const summaryCards = [
    { label: "إجمالي المدفوع", value: Number(summary.paid), color: "text-emerald-600" },
    { label: "قيد الانتظار", value: Number(summary.pending), color: "text-amber-600" },
    { label: "متأخرات", value: Number(summary.overdue), color: "text-red-600" },
  ];

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
        {summaryCards.map(({ label, value, color }) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className={`mt-2 text-2xl font-bold ${color}`}>
              {formatCurrency(value, "SAR", "ar-SA")}
            </p>
          </div>
        ))}
      </div>

      {invoices.items.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="لا توجد فواتير" description="أنشئ أول فاتورة لبدء إدارة المدفوعات." />
        </div>
      ) : (
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
              {invoices.items.map((invoice) => {
                const status = STATUS_MAP[invoice.status] ?? STATUS_MAP.DRAFT;
                return (
                  <tr key={invoice.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900">{invoice.number}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {invoice.client.name}
                      {invoice.client.company ? ` (${invoice.client.company})` : ""}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {formatCurrency(Number(invoice.total), invoice.currency, "ar-SA")}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={status.badge}>{status.label}</Badge>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">
                      {formatDate(invoice.issueDate, "ar")}
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">
                      {formatDate(invoice.dueDate, "ar")}
                    </td>
                    <td className="px-4 py-3 text-left">
                      <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}