import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface LeadListParams {
  organizationId: string;
  search?: string;
  stageId?: string;
  page?: number;
  pageSize?: number;
}

export interface LeadListResult {
  items: Prisma.LeadGetPayload<{ include: { stage: true } }>[];
  total: number;
  page: number;
  pageSize: number;
}

export const leadRepository = {
  async findById(id: string, organizationId: string) {
    return prisma.lead.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: { stage: true, client: true },
    });
  },

  async list({ organizationId, search, stageId, page = 1, pageSize = 10 }: LeadListParams): Promise<LeadListResult> {
    const where: Prisma.LeadWhereInput = {
      organizationId,
      deletedAt: null,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { company: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(stageId ? { stageId } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        include: { stage: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.lead.count({ where }),
    ]);

    return { items, total, page, pageSize };
  },

  async create(data: Prisma.LeadUncheckedCreateInput) {
    return prisma.lead.create({ data });
  },

  async update(id: string, organizationId: string, data: Prisma.LeadUncheckedUpdateInput, actorId?: string) {
    const result = await prisma.lead.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { ...data, ...(actorId ? { updatedById: actorId } : {}) },
    });
    if (result.count === 0) return null;
    return prisma.lead.findFirst({ where: { id, organizationId } });
  },

  /** Soft-delete: sets deletedAt/deletedBy instead of removing the row. */
  async delete(id: string, organizationId: string, actorId?: string) {
    return prisma.lead.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { deletedAt: new Date(), ...(actorId ? { deletedById: actorId } : {}) },
    });
  },

  async countByStage(organizationId: string) {
    const stages = await prisma.pipelineStage.findMany({
      where: { organizationId },
      orderBy: { order: "asc" },
    });

    const counts = await Promise.all(
      stages.map((stage) =>
        prisma.lead.count({
          where: { organizationId, stageId: stage.id, deletedAt: null },
        })
      )
    );

    return stages.map((stage, index) => ({
      id: stage.id,
      name: stage.name,
      color: stage.color,
      count: counts[index],
    }));
  },
};