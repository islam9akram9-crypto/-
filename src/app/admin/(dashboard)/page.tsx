import { auth } from "@/lib/auth";
import { dashboardService } from "@/services/dashboard.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { ErrorState } from "@/shared/components/ui/error-state";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { DonutChart } from "@/shared/components/ui/donut-chart";
import { BarChart } from "@/shared/components/ui/bar-chart";
import { formatCurrency, cn } from "@/lib/utils";
import { UnauthorizedError } from "@/core/errors/app-error";
import { Banknote, Users, FolderKanban, ReceiptText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    return (
      <ErrorState
        title="غير مصرح"
        description="يجب تسجيل الدخول للوصول إلى لوحة التحكم."
      />
    );
  }

  let stats;
  let errorMessage: string | null = null;

  try {
    stats = await dashboardService.getStats(session.user.organizationId);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      errorMessage = error.message;
    } else {
      errorMessage = "تعذر تحميل بيانات لوحة التحكم.";
    }
  }

  if (errorMessage) {
    return <ErrorState title="حدث خطأ" description={errorMessage} />;
  }

  if (!stats) {
    return <ErrorState title="حدث خطأ" description="تعذر تحميل بيانات لوحة التحكم." />;
  }

  const revenueTotal = formatCurrency(stats.revenue.total, "SAR", "ar-SA");
  const revenuePaid = formatCurrency(stats.revenue.paid, "SAR", "ar-SA");
  const revenueOutstanding = formatCurrency(stats.revenue.outstanding, "SAR", "ar-SA");

  const metricCards = [
    {
      label: "إجمالي الإيرادات",
      value: revenueTotal,
      icon: Banknote,
      accent: "text-indigo-600",
    },
    {
      label: "العملاء",
      value: String(stats.clients),
      icon: Users,
      accent: "text-teal-600",
    },
    {
      label: "المشاريع النشطة",
      value: String(stats.projects.active),
      icon: FolderKanban,
      accent: "text-emerald-600",
    },
    {
      label: "الفواتير",
      value: String(stats.invoices.total),
      icon: ReceiptText,
      accent: "text-amber-600",
    },
  ];

  const stageColors: Record<string, string> = {
    "جديد": "#0ea5e9",
    "مؤهل": "#f59e0b",
    "عرض سعر": "#6366f1",
    "إغلاق": "#10b981",
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-teal-600">Nabd OS</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-slate-500">نظرة عامة على أداء الوكالة</p>
        </div>
        <Badge variant="success" className="w-fit">
          {session.user.role === "SUPER_ADMIN" ? "مسؤول النظام" : "موظف"}
        </Badge>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map(({ label, value, icon: Icon, accent }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <Icon className={cn("mb-3 h-6 w-6", accent)} />
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue + Pipeline */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>الإيرادات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <span className="text-sm text-slate-600">مدفوعة</span>
              <span className="font-medium text-emerald-600">{revenuePaid}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
              <span className="text-sm text-slate-600">مستحقة</span>
              <span className="font-medium text-amber-600">{revenueOutstanding}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-3">
              <span className="text-sm font-medium text-indigo-700">الإجمالي</span>
              <span className="font-semibold text-indigo-700">{revenueTotal}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المراحل البيعية</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.leads.byStage.length > 0 ? (
              <DonutChart
                data={stats.leads.byStage.map((stage) => ({
                  label: stage.name,
                  value: stage.count,
                  color: stageColors[stage.name] ?? stage.color,
                }))}
              />
            ) : (
              <EmptyState title="لا توجد مراحل بيعية" description="أضف عملاء محتملين لبدء التتبع." />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Projects by status */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>المشاريع حسب الحالة</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.projects.total > 0 ? (
            <BarChart
              data={[
                { label: "نشط", value: stats.projects.active, color: "#6366f1" },
                { label: "مكتمل", value: stats.projects.completed, color: "#10b981" },
                { label: "مهام", value: stats.tasks.done, color: "#14b8a6" },
              ]}
            />
          ) : (
            <EmptyState title="لا توجد مشاريع" description="أنشئ أول مشروع للبدء." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}