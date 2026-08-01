import { Button } from "@/components/ui/button";
import { Plus, FolderKanban, Clock, CheckCircle2 } from "lucide-react";

const projects = [
  { id: "P-001", name: "إطلاق الهوية والموقع", client: "شركة التقنية الذكية", status: "قيد التنفيذ", progress: 68, due: "2025-06-30", color: "bg-teal-500" },
  { id: "P-002", name: "حملة إعلانات متجر العطور", client: "متجر العطور", status: "مراجعة", progress: 85, due: "2025-06-25", color: "bg-indigo-500" },
  { id: "P-003", name: "إعادة تصميم الهوية", client: "عيادات النخبة", status: "مكتمل", progress: 100, due: "2025-06-15", color: "bg-emerald-500" },
];

const statusColors: Record<string, string> = {
  "تخطيط": "bg-slate-100 text-slate-700",
  "قيد التنفيذ": "bg-sky-50 text-sky-700",
  "مراجعة": "bg-amber-50 text-amber-700",
  "مكتمل": "bg-emerald-50 text-emerald-700",
};

export default function AdminProjects() {
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

      <div className="flex items-center gap-2 text-sm text-slate-500">
        <FolderKanban className="h-4 w-4" />
        18 مشروع نشط
      </div>

      <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${project.color}`} />
              <span className="text-xs font-medium text-slate-400">{project.id}</span>
            </div>
            <h2 className="mt-2 font-bold text-slate-950">{project.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{project.client}</p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{project.progress}%</span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[project.status]}`}>
                  {project.status}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className={`h-2 rounded-full ${project.color}`} style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {project.due}
              </span>
              {project.progress === 100 ? (
                <span className="flex items-center gap-1 text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  تم التسليم
                </span>
              ) : (
                <span>{project.progress}% منجز</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}