import { auth } from "@/lib/auth";
import { leadRepository } from "@/repositories/lead.repository";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { DataTable, type Column } from "@/shared/components/ui/data-table";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { UserPlus, Phone, Mail, Building2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  value: number | null;
  createdAt: Date;
  stage: { name: string; color: string } | null;
};

const columns: Column<LeadRow>[] = [
  {
    key: "name",
    header: "العميل",
    cell: (lead) => (
      <div>
        <p className="font-medium text-slate-900">{lead.name}</p>
        <p className="text-xs text-slate-400">{lead.id.slice(-6).toUpperCase()}</p>
      </div>
    ),
  },
  {
    key: "company",
    header: "الشركة",
    cell: (lead) => (
      <span className="flex items-center gap-1.5 text-slate-600">
        <Building2 className="h-4 w-4 text-slate-400" />
        {lead.company ?? "—"}
      </span>
    ),
  },
  {
    key: "contact",
    header: "التواصل",
    cell: (lead) => (
      <div className="space-y-1 text-xs text-slate-500">
        <p className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          {lead.email}
        </p>
        {lead.phone && (
          <p className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            {lead.phone}
          </p>
        )}
      </div>
    ),
    hideBelow: "md",
  },
  {
    key: "stage",
    header: "المرحلة",
    cell: (lead) =>
      lead.stage ? (
        <Badge variant="secondary">{lead.stage.name}</Badge>
      ) : (
        <span className="text-slate-400">—</span>
      ),
  },
  {
    key: "value",
    header: "القيمة",
    cell: (lead) =>
      lead.value ? (
        <span className="font-medium text-slate-900">{formatCurrency(lead.value, "SAR", "ar-SA")}</span>
      ) : (
        <span className="text-slate-400">—</span>
      ),
    hideBelow: "lg",
  },
  {
    key: "createdAt",
    header: "التاريخ",
    cell: (lead) => (
      <span className="text-xs text-slate-500">{formatDate(lead.createdAt, "ar")}</span>
    ),
  },
];

export default async function AdminCRM() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    return <EmptyState title="غير مصرح" description="يجب تسجيل الدخول للوصول إلى هذه الصفحة." />;
  }

  const [leads, stages] = await Promise.all([
    leadRepository.list({
      organizationId: session.user.organizationId,
      pageSize: 20,
    }),
    leadRepository.countByStage(session.user.organizationId),
  ]);

  const totalPipelineValue = leads.items.reduce(
    (sum, lead) => sum + (lead.value ? Number(lead.value) : 0),
    0
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">إدارة العملاء المحتملين</h1>
          <p className="mt-1 text-sm text-slate-500">
            متابعة العملاء المحتملين عبر مراحل البيع
          </p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <UserPlus className="h-4 w-4" />
          عميل جديد
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage) => (
          <Card key={stage.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">{stage.name}</span>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
              </div>
              <p className="mt-2 text-3xl font-bold text-slate-950">{stage.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={leads.items.map((lead) => ({
            id: lead.id,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            value: lead.value ? Number(lead.value) : null,
            createdAt: lead.createdAt,
            stage: lead.stage ? { name: lead.stage.name, color: lead.stage.color } : null,
          }))}
          rowKey={(lead) => lead.id}
          emptyTitle="لا توجد عملاء محتملون"
          emptyDescription="ابدأ بإضافة أول عميل محتمل لمتابعة مراحل البيع."
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <p>
          عرض {leads.items.length} من أصل {leads.total} عميل محتمل · القيمة الإجمالية{" "}
          {formatCurrency(totalPipelineValue, "SAR", "ar-SA")}
        </p>
      </div>
    </div>
  );
}