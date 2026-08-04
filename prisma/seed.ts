import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Organization ─────────────────────────────────────────────────────────
  const org = await prisma.organization.upsert({
    where: { slug: "nabd-media" },
    update: {},
    create: {
      name: "نبض ميديا",
      slug: "nabd-media",
      primaryColor: "#6366f1",
    },
  });
  console.log(`✅ Organization: ${org.name}`);

  // ─── Admin User ───────────────────────────────────────────────────────────
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@nabdmedia.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin@12345";

  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: "مدير النظام",
        passwordHash,
        role: "SUPER_ADMIN",
        organizationId: org.id,
      },
    });
    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
  }

  // ─── Pipeline Stages (tenant-scoped) ──────────────────────────────────────
  const stages = [
    { name: "جديد", order: 0, color: "#0ea5e9" },
    { name: "مؤهل", order: 1, color: "#f59e0b" },
    { name: "عرض سعر", order: 2, color: "#6366f1" },
    { name: "إغلاق", order: 3, color: "#10b981" },
  ];

  for (const stage of stages) {
    const existing = await prisma.pipelineStage.findFirst({
      where: { organizationId: org.id, name: stage.name },
    });
    if (existing) {
      await prisma.pipelineStage.update({
        where: { id: existing.id },
        data: { order: stage.order, color: stage.color },
      });
    } else {
      await prisma.pipelineStage.create({
        data: { ...stage, organizationId: org.id },
      });
    }
  }
  console.log(`✅ Pipeline stages created: ${stages.length}`);

  // ─── Site Settings ────────────────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { organizationId: org.id },
    update: {},
    create: {
      organizationId: org.id,
      companyNameAr: "نبض ميديا",
      companyNameEn: "Nabd Media",
      taglineAr: "نبض الإبداع الرقمي",
      taglineEn: "The Pulse of Digital Creativity",
      email: "hello@nabdmedia.com",
      phone: "+966 50 000 0000",
      addressAr: "الرياض، المملكة العربية السعودية",
      addressEn: "Riyadh, Saudi Arabia",
    },
  });
  console.log("✅ Site settings created");

  // ─── Sample Clients ───────────────────────────────────────────────────────
  const clients = [
    { name: "أحمد المطيري", email: "ahmed@smarttech.com", phone: "+966 55 123 4567", company: "شركة التقنية الذكية" },
    { name: "سارة العتيبي", email: "sara@eliteclinic.com", phone: "+966 50 987 6543", company: "عيادات النخبة" },
    { name: "محمد الغامدي", email: "mohammed@gourmet.com", phone: "+966 53 456 7890", company: "مطاعم الذوق الرفيع" },
  ];

  for (const client of clients) {
    const existing = await prisma.client.findFirst({
      where: { email: client.email, organizationId: org.id },
    });
    if (!existing) {
      await prisma.client.create({ data: { ...client, organizationId: org.id } });
    }
  }
  console.log(`✅ Sample clients created: ${clients.length}`);

  // ─── Sample Projects ──────────────────────────────────────────────────────
  const firstClient = await prisma.client.findFirst({ where: { organizationId: org.id } });
  if (firstClient) {
    const projects = [
      {
        name: "إطلاق الهوية والموقع",
        description: "تصميم هوية بصرية كاملة وتطوير موقع إلكتروني",
        status: "IN_PROGRESS" as const,
        progress: 68,
        clientId: firstClient.id,
        organizationId: org.id,
      },
      {
        name: "حملة إعلانات متجر العطور",
        description: "إدارة حملات إعلانية ممولة على منصات التواصل",
        status: "REVIEW" as const,
        progress: 85,
        clientId: firstClient.id,
        organizationId: org.id,
      },
    ];

    for (const project of projects) {
      await prisma.project.create({ data: project });
    }
    console.log(`✅ Sample projects created: ${projects.length}`);
  }

  // ─── Feature Flags ────────────────────────────────────────────────────────
  const flags = [
    { key: "media-library", enabled: true, description: "مكتبة الوسائط" },
    { key: "workflow-engine", enabled: false, description: "محرك سير العمل" },
    { key: "automation", enabled: false, description: "الأتمتة" },
    { key: "analytics", enabled: true, description: "التحليلات" },
    { key: "client-portal", enabled: true, description: "بوابة العميل" },
    { key: "ai-studio", enabled: false, description: "استوديو الذكاء الاصطناعي" },
    { key: "approvals", enabled: false, description: "نظام الموافقات" },
    { key: "comments", enabled: true, description: "نظام التعليقات" },
    { key: "tags", enabled: true, description: "نظام الوسوم" },
    { key: "knowledge-base", enabled: false, description: "قاعدة المعرفة" },
    { key: "calendar", enabled: true, description: "التقويم" },
    { key: "reports", enabled: true, description: "التقارير" },
    { key: "notifications", enabled: true, description: "الإشعارات" },
    { key: "audit-logs", enabled: true, description: "سجلات التدقيق" },
    { key: "activity-center", enabled: true, description: "مركز النشاط" },
  ];

  for (const flag of flags) {
    await prisma.featureFlag.upsert({
      where: { organizationId_key: { organizationId: org.id, key: flag.key } },
      update: { enabled: flag.enabled },
      create: { ...flag, organizationId: org.id },
    });
  }
  console.log(`✅ Feature flags created: ${flags.length}`);

  console.log("🎉 Seeding complete!");
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });