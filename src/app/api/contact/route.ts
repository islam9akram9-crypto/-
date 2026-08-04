import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/validators/public-forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, message } = parsed.data;

    const org = await prisma.organization.findFirst();
    if (!org) {
      return NextResponse.json({ error: "No organization" }, { status: 500 });
    }

    await prisma.contactSubmission.create({
      data: { name, email, phone, subject: company, message, organizationId: org.id },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}