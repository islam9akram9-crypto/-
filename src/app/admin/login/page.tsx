import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image src="/nabd-icon.png" alt="Nabd Media" width={64} height={64} priority className="mx-auto rounded-xl object-cover shadow-lg" />
          <h1 className="mt-4 text-2xl font-bold text-white">ظ„ظˆط­ط© طھط­ظƒظ… ظ†ط¨ط¶ ظ…ظٹط¯ظٹط§</h1>
          <p className="mt-2 text-sm text-slate-400">ط³ط¬ظ‘ظ„ ط§ظ„ط¯ط®ظˆظ„ ظ„ظ„ظ…طھط§ط¨ط¹ط©</p>
        </div>
        <form className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur" action="/api/auth/callback/credentials" method="POST">
          <div className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-slate-300">ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ</Label>
              <Input id="email" name="email" type="email" required className="mt-2 border-white/10 bg-white/5 text-white" placeholder="admin@nabdmedia.com" />
            </div>
            <div>
              <Label htmlFor="password" className="text-slate-300">ظƒظ„ظ…ط© ط§ظ„ظ…ط±ظˆط±</Label>
              <Input id="password" name="password" type="password" required className="mt-2 border-white/10 bg-white/5 text-white" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
            </div>
            <Button type="submit" className="w-full bg-teal-400 text-slate-950 hover:bg-teal-300">
              طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
