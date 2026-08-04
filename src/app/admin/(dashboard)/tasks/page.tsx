import { auth } from "@/lib/auth";
import { taskRepository } from "@/repositories/task.repository";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { EmptyState } from "@/shared/components/ui/empty-state";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Plus, Circle, CheckCircle2, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_MAP: Record<string, { label: string; badge: "secondary" | "info" | "warning" | "success"; color: string }> = {
  TODO: { label: "معلق", badge: "secondary", color: "bg-slate-400" },
  IN_PROGRESS: { label: "قيد التنفيذ", badge: "info", color: "bg-sky-500" },
  REVIEW: { label: "مراجعة", badge: "warning", color: "bg-amber-500" },
  DONE: { label: "مكتمل", badge: "success", color: "bg-emerald-500" },
};

export default async function AdminTasks() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    return <EmptyState title="غير مصرح" description="يجب تسجيل الدخول للوصول إلى هذه الصفحة." />;
  }

  const [tasks, counts] = await Promise.all([
    taskRepository.list({
      organizationId: session.user.organizationId,
      pageSize: 20,
    }),
    taskRepository.countByStatus(session.user.organizationId),
  ]);

  const statCards = [
    { label: "معلق", count: counts.todo, color: "bg-slate-400" },
    { label: "قيد التنفيذ", count: counts.inProgress, color: "bg-sky-500" },
    { label: "مراجعة", count: counts.review, color: "bg-amber-500" },
    { label: "مكتمل", count: counts.done, color: "bg-emerald-500" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">المهام</h1>
          <p className="mt-1 text-sm text-slate-500">متابعة مهام الفريق اليومية</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Plus className="h-4 w-4" />
          مهمة جديدة
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {statCards.map(({ label, count, color }) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{label}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-950">{count}</p>
          </div>
        ))}
      </div>

      {tasks.items.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="لا توجد مهام" description="أنشئ أول مهمة لبدء متابعة عمل الفريق." />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {tasks.items.map((task) => {
            const status = STATUS_MAP[task.status] ?? STATUS_MAP.TODO;
            const isDone = task.status === "DONE";
            return (
              <div
                key={task.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  {isDone ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  ) : (
                    <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
                  )}
                  <div>
                    <p className={`font-medium text-slate-900 ${isDone ? "text-slate-400 line-through" : ""}`}>
                      {task.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {task.project.name}
                      {task.assignee ? ` · ${task.assignee.name ?? "غير معين"}` : " · غير معين"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Badge variant={status.badge}>{status.label}</Badge>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {task.dueDate ? formatDate(task.dueDate, "ar") : "بدون موعد"}
                  </span>
                  {task.assignee && (
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">
                        {task.assignee.name?.slice(0, 2) ?? "؟"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}