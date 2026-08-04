import { prisma } from "@/lib/prisma";
import { AppError } from "@/core/errors/app-error";

export interface DashboardStats {
  revenue: { total: number; paid: number; outstanding: number };
  clients: number;
  projects: { total: number; active: number; completed: number };
  leads: { total: number; byStage: { name: string; color: string; count: number }[] };
  tasks: { total: number; done: number };
  invoices: { total: number; paid: number; overdue: number };
}

/** Convert Prisma Decimal to a plain number for display/arithmetic. */
function toNumber(value: unknown): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number") return value;
  if (typeof value === "object" && "toNumber" in (value as object)) {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value);
}

export const dashboardService = {
  async getStats(organizationId: string): Promise<DashboardStats> {
    if (!organizationId) {
      throw new AppError("VALIDATION_ERROR", "Organization ID is required");
    }

    const [
      revenueAgg,
      clientsCount,
      projectsCount,
      projectsCompleted,
      leadsCount,
      tasksTotal,
      tasksDone,
      invoicesTotal,
      invoicesPaid,
      invoicesOverdue,
    ] = await Promise.all([
      prisma.invoice.aggregate({
        where: { organizationId, deletedAt: null },
        _sum: { total: true },
      }),
      prisma.client.count({ where: { organizationId, deletedAt: null } }),
      prisma.project.count({ where: { organizationId, deletedAt: null, status: { not: "COMPLETED" } } }),
      prisma.project.count({ where: { organizationId, deletedAt: null, status: "COMPLETED" } }),
      prisma.lead.count({ where: { organizationId, deletedAt: null } }),
      prisma.task.count({ where: { organizationId, deletedAt: null } }),
      prisma.task.count({ where: { organizationId, deletedAt: null, status: "DONE" } }),
      prisma.invoice.count({ where: { organizationId, deletedAt: null } }),
      prisma.invoice.count({ where: { organizationId, deletedAt: null, status: "PAID" } }),
      prisma.invoice.count({ where: { organizationId, deletedAt: null, status: "OVERDUE" } }),
    ]);

    const stages = await prisma.pipelineStage.findMany({
      where: { organizationId },
      orderBy: { order: "asc" },
    });
    const stageCounts = await Promise.all(
      stages.map((stage) =>
        prisma.lead.count({
          where: { organizationId, stageId: stage.id, deletedAt: null },
        })
      )
    );
    const leadsByStage = stages.map((stage, index) => ({
      name: stage.name,
      color: stage.color,
      count: stageCounts[index],
    }));

    const paidAgg = await prisma.payment.aggregate({
      where: { invoice: { organizationId }, status: "COMPLETED", deletedAt: null },
      _sum: { amount: true },
    });

    const totalRevenue = toNumber(revenueAgg._sum.total);
    const paidRevenue = toNumber(paidAgg._sum.amount);

    return {
      revenue: {
        total: totalRevenue,
        paid: paidRevenue,
        outstanding: totalRevenue - paidRevenue,
      },
      clients: clientsCount,
      projects: {
        total: projectsCount + projectsCompleted,
        active: projectsCount,
        completed: projectsCompleted,
      },
      leads: {
        total: leadsCount,
        byStage: leadsByStage,
      },
      tasks: { total: tasksTotal, done: tasksDone },
      invoices: {
        total: invoicesTotal,
        paid: invoicesPaid,
        overdue: invoicesOverdue,
      },
    };
  },
};