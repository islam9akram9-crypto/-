import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { quoteRequestSchema } from "@/validators/public-forms";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = quoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone, company, serviceType, budget, message } = parsed.data;

    const org = await prisma.organization.findFirst();
    if (!org) {
      return NextResponse.json({ error: "No organization" }, { status: 500 });
    }

    await prisma.quoteRequest.create({
      data: { name, email, phone, company, serviceType, budget, message, organizationId: org.id },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}