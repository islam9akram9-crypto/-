import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface PortalSummary {
  projects: { total: number; active: number; completed: number };
  invoices: { total: number; paid: number; outstanding: number };
  tickets: { open: number; resolved: number };
  recentProjects: Prisma.ProjectGetPayload<{
    include: { tasks: true; invoices: true };
  }>[];
  recentInvoices: Prisma.InvoiceGetPayload<{
    include: { payments: true; items: true };
  }>[];
  recentTickets: Prisma.SupportTicketGetPayload<object>[];
}

export const portalRepository = {
  async getClientSummary(
    organizationId: string,
    clientId: string
  ): Promise<PortalSummary> {
    const clientWhere: Prisma.ClientWhereInput = {
      id: clientId,
      organizationId,
      deletedAt: null,
    };

    const client = await prisma.client.findFirst({ where: clientWhere });
    if (!client) {
      return {
        projects: { total: 0, active: 0, completed: 0 },
        invoices: { total: 0, paid: 0, outstanding: 0 },
        tickets: { open: 0, resolved: 0 },
        recentProjects: [],
        recentInvoices: [],
        recentTickets: [],
      };
    }

    const projectWhere: Prisma.ProjectWhereInput = {
      organizationId,
      clientId,
      deletedAt: null,
    };
    const invoiceWhere: Prisma.InvoiceWhereInput = {
      organizationId,
      clientId,
      deletedAt: null,
    };
    const ticketWhere: Prisma.SupportTicketWhereInput = {
      organizationId,
      clientId,
      deletedAt: null,
    };

    const [
      projectsTotal,
      projectsActive,
      projectsCompleted,
      invoicesTotal,
      invoicesPaid,
      outstandingAgg,
      ticketsOpen,
      ticketsResolved,
      recentProjects,
      recentInvoices,
      recentTickets,
    ] = await Promise.all([
      prisma.project.count({ where: projectWhere }),
      prisma.project.count({
        where: {
          ...projectWhere,
          status: { in: ["PLANNING", "IN_PROGRESS", "REVIEW", "ON_HOLD"] },
        },
      }),
      prisma.project.count({ where: { ...projectWhere, status: "COMPLETED" } }),
      prisma.invoice.count({ where: invoiceWhere }),
      prisma.invoice.count({ where: { ...invoiceWhere, status: "PAID" } }),
      prisma.invoice.aggregate({
        where: { ...invoiceWhere, status: { in: ["SENT", "OVERDUE"] } },
        _sum: { total: true },
      }),
      prisma.supportTicket.count({
        where: { ...ticketWhere, status: { in: ["OPEN", "IN_PROGRESS"] } },
      }),
      prisma.supportTicket.count({
        where: { ...ticketWhere, status: { in: ["RESOLVED", "CLOSED"] } },
      }),
      prisma.project.findMany({
        where: projectWhere,
        include: { tasks: true, invoices: true },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
      prisma.invoice.findMany({
        where: invoiceWhere,
        include: { payments: true, items: true },
        orderBy: { issueDate: "desc" },
        take: 5,
      }),
      prisma.supportTicket.findMany({
        where: ticketWhere,
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return {
      projects: { total: projectsTotal, active: projectsActive, completed: projectsCompleted },
      invoices: {
        total: invoicesTotal,
        paid: invoicesPaid,
        outstanding: Number(outstandingAgg._sum?.total ?? 0),
      },
      tickets: { open: ticketsOpen, resolved: ticketsResolved },
      recentProjects,
      recentInvoices,
      recentTickets,
    };
  },
};