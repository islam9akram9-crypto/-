import { Button } from "@/components/ui/button";
import { Plus, Clock, Circle, CheckCircle2 } from "lucide-react";

const tasks = [
  { id: "T-001", title: "مراجعة حملة متجر العطور", project: "حملة إعلانات متجر العطور", assignee: "سارة", due: "اليوم", status: "قيد التنفيذ", color: "bg-amber-400" },
  { id: "T-002", title: "إرسال عرض سعر لعيادة طبية", project: "إعادة تصميم الهوية", assignee: "أحمد", due: "غداً", status: "معلق", color: "bg-slate-300" },
  { id: "T-003", title: "اعتماد تصميمات مطعم جديد", project: "تطوير منصة الطلبات", assignee: "ريم", due: "2025-06-25", status: "مراجعة", color: "bg-indigo-400" },
  { id: "T-004", title: "متابعة فاتورة شركة عقارية", project: "موقع عقاري تفاعلي", assignee: "خالد", due: "2025-06-28", status: "مكتمل", color: "bg-emerald-500" },
];

const statusColors: Record<string, string> = {
  "معلق": "bg-slate-100 text-slate-600",
  "قيد التنفيذ": "bg-amber-50 text-amber-700",
  "مراجعة": "bg-indigo-50 text-indigo-700",
  "مكتمل": "bg-emerald-50 text-emerald-700",
};

export default function AdminTasks() {
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

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["معلق", 8, "bg-slate-300"],
          ["قيد التنفيذ", 12, "bg-amber-400"],
          ["مراجعة", 5, "bg-indigo-400"],
          ["مكتمل", 24, "bg-emerald-500"],
        ].map(([label, count, color]) => (
          <div key={label as string} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">{label}</span>
              <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-950">{count}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              {task.status === "مكتمل" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              ) : (
                <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
              )}
              <div>
                <p className={`font-medium text-slate-900 ${task.status === "مكتمل" ? "line-through text-slate-400" : ""}`}>
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">{task.project} · {task.assignee}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className={`rounded-full px-3 py-1 font-medium ${statusColors[task.status] ?? "bg-slate-100 text-slate-600"}`}>
                {task.status}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                {task.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}