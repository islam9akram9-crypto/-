import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function PortalLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/nabd-icon.png"
            alt="Nabd Media"
            width={64}
            height={64}
            priority
            className="mx-auto rounded-xl object-cover shadow-lg"
          />

          <h1 className="mt-4 text-2xl font-bold text-slate-950">
            بوابة العميل
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            سجّل الدخول لمتابعة مشاريعك
          </p>
        </div>

        <form
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          action="/api/auth/callback/credentials"
          method="POST"
        >
          <div className="space-y-5">
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>

              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2"
                placeholder="client@email.com"
              />
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>

              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full">
              تسجيل الدخول
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}