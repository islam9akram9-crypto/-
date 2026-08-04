import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface InvoiceListParams {
  organizationId: string;
  status?: string;
  clientId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface InvoiceListResult {
  items: Prisma.InvoiceGetPayload<{ include: { client: true; project: true; payments: true } }>[];
  total: number;
  page: number;
  pageSize: number;
}

export const invoiceRepository = {
  async findById(id: string, organizationId: string) {
    return prisma.invoice.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: { client: true, project: true, items: true, payments: true },
    });
  },

  async list({
    organizationId,
    status,
    clientId,
    search,
    page = 1,
    pageSize = 10,
  }: InvoiceListParams): Promise<InvoiceListResult> {
    const where: Prisma.InvoiceWhereInput = {
      organizationId,
      deletedAt: null,
      ...(clientId ? { clientId } : {}),
      ...(status ? { status: status as Prisma.InvoiceWhereInput["status"] } : {}),
      ...(search
        ? {
            OR: [
              { number: { contains: search, mode: "insensitive" } },
              { client: { name: { contains: search, mode: "insensitive" } } },
              { client: { company: { contains: search, mode: "insensitive" } } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        include: { client: true, project: true, payments: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.invoice.count({ where }),
    ]);

    return { items, total, page, pageSize };
  },

  async create(data: Prisma.InvoiceUncheckedCreateInput) {
    return prisma.invoice.create({ data });
  },

  async update(id: string, organizationId: string, data: Prisma.InvoiceUncheckedUpdateInput, actorId?: string) {
    const result = await prisma.invoice.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { ...data, ...(actorId ? { updatedById: actorId } : {}) },
    });
    if (result.count === 0) return null;
    return prisma.invoice.findFirst({ where: { id, organizationId } });
  },

  /** Soft-delete: sets deletedAt/deletedBy instead of removing the row. */
  async delete(id: string, organizationId: string, actorId?: string) {
    return prisma.invoice.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { deletedAt: new Date(), ...(actorId ? { deletedById: actorId } : {}) },
    });
  },

  async getFinancialSummary(organizationId: string) {
    const [paidAgg, pendingAgg, overdueAgg, totalAgg] = await Promise.all([
      prisma.invoice.aggregate({
        where: { organizationId, deletedAt: null, status: "PAID" },
        _sum: { total: true },
      }),
      prisma.invoice.aggregate({
        where: { organizationId, deletedAt: null, status: { in: ["DRAFT", "SENT"] } },
        _sum: { total: true },
      }),
      prisma.invoice.aggregate({
        where: { organizationId, deletedAt: null, status: "OVERDUE" },
        _sum: { total: true },
      }),
      prisma.invoice.aggregate({
        where: { organizationId, deletedAt: null },
        _sum: { total: true },
      }),
    ]);

    return {
      paid: paidAgg._sum.total ?? 0,
      pending: pendingAgg._sum.total ?? 0,
      overdue: overdueAgg._sum.total ?? 0,
      total: totalAgg._sum.total ?? 0,
    };
  },

  async countByStatus(organizationId: string) {
    const [draft, sent, paid, overdue, cancelled] = await Promise.all([
      prisma.invoice.count({ where: { organizationId, deletedAt: null, status: "DRAFT" } }),
      prisma.invoice.count({ where: { organizationId, deletedAt: null, status: "SENT" } }),
      prisma.invoice.count({ where: { organizationId, deletedAt: null, status: "PAID" } }),
      prisma.invoice.count({ where: { organizationId, deletedAt: null, status: "OVERDUE" } }),
      prisma.invoice.count({ where: { organizationId, deletedAt: null, status: "CANCELLED" } }),
    ]);
    return { draft, sent, paid, overdue, cancelled, total: draft + sent + paid + overdue + cancelled };
  },
};