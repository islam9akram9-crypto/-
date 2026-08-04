import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { getLocale } from "next-intl/server";

export default async function ContactPage() {
  const locale = (await getLocale()) as "ar" | "en";
  const isArabic = locale === "ar";

  return (
    <section className="py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h1 className="text-4xl font-bold text-slate-950">{isArabic ? "تواصل معنا" : "Contact us"}</h1>
          <p className="mt-4 leading-8 text-slate-600">
            {isArabic
              ? "أرسل تفاصيل مشروعك أو فكرة المنصة، وسنرتب الخطوة التالية: خدمة، نظام داخلي، أو نسخة SaaS."
              : "Send your project or platform idea, and we will shape the next step: service, internal system, or SaaS version."}
          </p>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-teal-600" /> hello@nabdmedia.com</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-teal-600" /> +966 50 000 0000</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal-600" /> {isArabic ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}</p>
          </div>
        </div>
        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={isArabic ? "الاسم" : "Name"} name="name" />
            <Field label={isArabic ? "البريد الإلكتروني" : "Email"} name="email" type="email" />
            <Field label={isArabic ? "الهاتف" : "Phone"} name="phone" />
            <Field label={isArabic ? "الشركة" : "Company"} name="company" />
          </div>
          <div className="mt-5">
            <Label htmlFor="message">{isArabic ? "تفاصيل المشروع" : "Project details"}</Label>
            <Textarea id="message" name="message" className="mt-2 min-h-36" />
          </div>
          <Button className="mt-6 w-full">{isArabic ? "إرسال الطلب" : "Send request"}</Button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} className="mt-2" />
    </div>
  );
}
