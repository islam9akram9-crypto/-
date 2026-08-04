import { auth } from "@/lib/auth";
import { projectRepository } from "@/repositories/project.repository";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { Plus, FolderKanban, Clock, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_MAP: Record<string, { label: string; badge: "secondary" | "info" | "warning" | "success"; color: string }> = {
  PLANNING: { label: "تخطيط", badge: "secondary", color: "bg-slate-400" },
  IN_PROGRESS: { label: "قيد التنفيذ", badge: "info", color: "bg-sky-500" },
  REVIEW: { label: "مراجعة", badge: "warning", color: "bg-amber-500" },
  COMPLETED: { label: "مكتمل", badge: "success", color: "bg-emerald-500" },
  ON_HOLD: { label: "متوقف", badge: "secondary", color: "bg-slate-400" },
};

export default async function AdminProjects() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    return <EmptyState title="غير مصرح" description="يجب تسجيل الدخول للوصول إلى هذه الصفحة." />;
  }

  const [projects, counts] = await Promise.all([
    projectRepository.list({
      organizationId: session.user.organizationId,
      pageSize: 20,
    }),
    projectRepository.countByStatus(session.user.organizationId),
  ]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">المشاريع</h1>
          <p className="mt-1 text-sm text-slate-500">إدارة جميع مشاريع العملاء ومتابعة التقدم</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4" />
          مشروع جديد
        </Button>
      </div>

      <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <FolderKanban className="h-4 w-4" />
        {counts.active} مشروع نشط · {counts.completed} مكتمل
      </div>

      {projects.items.length === 0 ? (
        <EmptyState title="لا توجد مشاريع" description="أنشئ أول مشروع لبدء متابعة العمل مع العملاء." />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project) => {
            const status = STATUS_MAP[project.status] ?? STATUS_MAP.PLANNING;
            return (
              <Card key={project.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${status.color}`} />
                    <span className="text-xs font-medium text-slate-400">
                      {project.id.slice(-6).toUpperCase()}
                    </span>
                  </div>

                  <h2 className="mt-2 font-bold text-slate-950">{project.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{project.client.name}</p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{project.progress}%</span>
                      <Badge variant={status.badge}>{status.label}</Badge>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div
                        className={`h-2 rounded-full ${status.color}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                    {project.dueDate ? (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(project.dueDate, "ar")}
                      </span>
                    ) : (
                      <span>—</span>
                    )}

                    {project.progress === 100 ? (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        تم التسليم
                      </span>
                    ) : (
                      <span>{project._count.tasks} مهام</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}