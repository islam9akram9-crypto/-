import { auth } from "@/lib/auth";
import { portalRepository } from "@/repositories/portal.repository";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { ErrorState } from "@/shared/components/ui/error-state";
import { Calendar, FileUp, MessageCircle, ReceiptText, FolderKanban, LifeBuoy } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const PROJECT_STATUS_MAP: Record<string, { label: string; badge: "secondary" | "info" | "warning" | "success" }> = {
  PLANNING: { label: "تخطيط", badge: "secondary" },
  IN_PROGRESS: { label: "قيد التنفيذ", badge: "info" },
  REVIEW: { label: "مراجعة", badge: "warning" },
  COMPLETED: { label: "مكتمل", badge: "success" },
  ON_HOLD: { label: "متوقف", badge: "secondary" },
};

const INVOICE_STATUS_MAP: Record<string, { label: string; badge: "secondary" | "info" | "warning" | "success" | "destructive" }> = {
  DRAFT: { label: "مسودة", badge: "secondary" },
  SENT: { label: "مرسلة", badge: "info" },
  PAID: { label: "مدفوعة", badge: "success" },
  OVERDUE: { label: "متأخرة", badge: "destructive" },
  CANCELLED: { label: "ملغاة", badge: "secondary" },
};

const TICKET_STATUS_MAP: Record<string, { label: string; badge: "secondary" | "info" | "warning" | "success" }> = {
  OPEN: { label: "مفتوحة", badge: "info" },
  IN_PROGRESS: { label: "قيد المعالجة", badge: "warning" },
  RESOLVED: { label: "تم الحل", badge: "success" },
  CLOSED: { label: "مغلقة", badge: "secondary" },
};

export default async function ClientPortalPage() {
  const session = await auth();

  if (!session?.user?.organizationId || !session.user.clientId) {
    return (
      <ErrorState
        title="غير مصرح"
        description="يجب تسجيل الدخول بحساب عميل للوصول إلى البوابة."
      />
    );
  }

  const summary = await portalRepository.getClientSummary(
    session.user.organizationId,
    session.user.clientId
  );

  const quickActions = [
    { label: "رفع ملف", icon: FileUp },
    { label: "الفواتير", icon: ReceiptText },
    { label: "الدردشة", icon: MessageCircle },
    { label: "حجز اجتماع", icon: Calendar },
  ];

  const statCards = [
    { label: "المشاريع النشطة", value: summary.projects.active, icon: FolderKanban, color: "text-indigo-600" },
    { label: "المشاريع المكتملة", value: summary.projects.completed, icon: FolderKanban, color: "text-emerald-600" },
    { label: "الفواتير المدفوعة", value: summary.invoices.paid, icon: ReceiptText, color: "text-teal-600" },
    { label: "تذاكر مفتوحة", value: summary.tickets.open, icon: LifeBuoy, color: "text-amber-600" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-6" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-teal-700">بوابة العميل</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">مرحبًا بك في بوابة نبض ميديا</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            هنا تتابع مشاريعك، ملفاتك، موافقاتك، فواتيرك، ودعمك مع الفريق.
          </p>
        </section>

        {/* Quick actions */}
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {quickActions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="rounded-lg border border-slate-200 bg-white p-5 text-right shadow-sm transition-colors hover:border-teal-300"
            >
              <Icon className="mb-4 h-6 w-6 text-teal-600" />
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="p-5">
                <Icon className={`mb-3 h-6 w-6 ${color}`} />
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent projects */}
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-slate-950">أحدث المشاريع</h2>
          {summary.recentProjects.length === 0 ? (
            <EmptyState title="لا توجد مشاريع" description="لم يتم ربط أي مشاريع بحسابك بعد." />
          ) : (
            <div className="space-y-3">
              {summary.recentProjects.map((project) => {
                const status = PROJECT_STATUS_MAP[project.status] ?? PROJECT_STATUS_MAP.PLANNING;
                return (
                  <div
                    key={project.id}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                      <div>
                        <h3 className="font-bold text-slate-950">{project.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          التقدم الحالي {project.progress}% · {project.tasks.length} مهام
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={status.badge}>{status.label}</Badge>
                        <Button variant="outline" size="sm">عرض التفاصيل</Button>
                      </div>
                    </div>
                    <div className="mt-5 h-3 rounded-full bg-slate-100">
                      <div
                        className="h-3 rounded-full bg-teal-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Recent invoices */}
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-slate-950">أحدث الفواتير</h2>
          {summary.recentInvoices.length === 0 ? (
            <EmptyState title="لا توجد فواتير" description="لم يتم إصدار أي فواتير بعد." />
          ) : (
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                    <th className="px-4 py-3 font-semibold">رقم الفاتورة</th>
                    <th className="px-4 py-3 font-semibold">المبلغ</th>
                    <th className="px-4 py-3 font-semibold">الحالة</th>
                    <th className="hidden px-4 py-3 font-semibold md:table-cell">تاريخ الإصدار</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.recentInvoices.map((invoice) => {
                    const status = INVOICE_STATUS_MAP[invoice.status] ?? INVOICE_STATUS_MAP.DRAFT;
                    return (
                      <tr key={invoice.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-medium text-slate-900">{invoice.number}</td>
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {formatCurrency(Number(invoice.total), invoice.currency, "ar-SA")}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={status.badge}>{status.label}</Badge>
                        </td>
                        <td className="hidden px-4 py-3 text-xs text-slate-500 md:table-cell">
                          {formatDate(invoice.issueDate, "ar")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Recent tickets */}
        <section className="mt-6">
          <h2 className="mb-3 text-lg font-bold text-slate-950">تذاكر الدعم</h2>
          {summary.recentTickets.length === 0 ? (
            <EmptyState title="لا توجد تذاكر" description="لم تقم بفتح أي تذاكر دعم بعد." />
          ) : (
            <div className="space-y-3">
              {summary.recentTickets.map((ticket) => {
                const status = TICKET_STATUS_MAP[ticket.status] ?? TICKET_STATUS_MAP.OPEN;
                return (
                  <div
                    key={ticket.id}
                    className="flex flex-col justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{ticket.subject}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatDate(ticket.createdAt, "ar")}</p>
                    </div>
                    <Badge variant={status.badge}>{status.label}</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}