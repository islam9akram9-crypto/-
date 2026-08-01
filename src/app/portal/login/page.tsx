import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function PortalLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image src="/nabd-icon.png" alt="Nabd Media" width={64} height={64} priority className="mx-auto rounded-xl object-cover shadow-lg" />
          <h1 className="mt-4 text-2xl font-bold text-slate-950">ط¨ظˆط§ط¨ط© ط§ظ„ط¹ظ…ظٹظ„</h1>
          <p className="mt-2 text-sm text-slate-500">ط³ط¬ظ‘ظ„ ط§ظ„ط¯ط®ظˆظ„ ظ„ظ…طھط§ط¨ط¹ط© ظ…ط´ط§ط±ظٹط¹ظƒ</p>
        </div>
        <form className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-5">
            <div>
              <Label htmlFor="email">ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ</Label>
              <Input id="email" name="email" type="email" required className="mt-2" placeholder="client@email.com" />
            </div>
            <div>
              <Label htmlFor="password">ظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط±</Label>
              <Input id="password" name="password" type="password" required className="mt-2" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
            </div>
            <Button type="submit" className="w-full">طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
