import { LayoutDashboard, Users, FolderKanban, ListTodo, ReceiptText, LogOut, ExternalLink } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import Image from "next/image";

const navItems = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/crm", label: "العملاء", icon: Users },
  { href: "/admin/projects", label: "المشاريع", icon: FolderKanban },
  { href: "/admin/tasks", label: "المهام", icon: ListTodo },
  { href: "/admin/invoices", label: "الفواتير", icon: ReceiptText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100" dir="rtl">
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 flex-col border-l border-slate-200 bg-slate-950 text-white lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <Image
            src="/nabd-icon.png"
            alt="Nabd Media"
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="text-sm font-bold">نبض ميديا</p>
            <p className="text-xs text-slate-400">Nabd OS</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            عرض الموقع
          </Link>

          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </Link>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:mr-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur">
          <div className="lg:hidden">
            <p className="text-sm font-bold text-slate-950">نبض ميديا</p>
            <p className="text-xs text-slate-500">Nabd OS</p>
          </div>

          <div className="hidden text-sm text-slate-500 lg:block">
            مركز التحكم
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              مسؤول
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              م
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}