import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface ProjectListParams {
  organizationId: string;
  clientId?: string;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface ProjectListResult {
  items: Prisma.ProjectGetPayload<{ include: { client: true; _count: { select: { tasks: true } } } }>[];
  total: number;
  page: number;
  pageSize: number;
}

export const projectRepository = {
  async findById(id: string, organizationId: string) {
    return prisma.project.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: {
        client: true,
        tasks: { orderBy: { order: "asc" } },
        _count: { select: { files: true, timeEntries: true } },
      },
    });
  },

  async list({ organizationId, clientId, status, search, page = 1, pageSize = 10 }: ProjectListParams): Promise<ProjectListResult> {
    const where: Prisma.ProjectWhereInput = {
      organizationId,
      deletedAt: null,
      ...(clientId ? { clientId } : {}),
      ...(status ? { status: status as Prisma.ProjectWhereInput["status"] } : {}),
      ...(search
        ? { name: { contains: search, mode: "insensitive" } }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          client: true,
          _count: { select: { tasks: true } },
        },
        orderBy: { updatedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.project.count({ where }),
    ]);

    return { items, total, page, pageSize };
  },

  async create(data: Prisma.ProjectUncheckedCreateInput) {
    return prisma.project.create({ data });
  },

  async update(id: string, organizationId: string, data: Prisma.ProjectUncheckedUpdateInput, actorId?: string) {
    const result = await prisma.project.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { ...data, ...(actorId ? { updatedById: actorId } : {}) },
    });
    if (result.count === 0) return null;
    return prisma.project.findFirst({ where: { id, organizationId } });
  },

  /** Soft-delete: sets deletedAt/deletedBy instead of removing the row. */
  async delete(id: string, organizationId: string, actorId?: string) {
    return prisma.project.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { deletedAt: new Date(), ...(actorId ? { deletedById: actorId } : {}) },
    });
  },

  async countByStatus(organizationId: string) {
    const [total, active, inProgress, review, completed] = await Promise.all([
      prisma.project.count({ where: { organizationId, deletedAt: null } }),
      prisma.project.count({ where: { organizationId, deletedAt: null, status: { in: ["PLANNING", "IN_PROGRESS"] } } }),
      prisma.project.count({ where: { organizationId, deletedAt: null, status: "IN_PROGRESS" } }),
      prisma.project.count({ where: { organizationId, deletedAt: null, status: "REVIEW" } }),
      prisma.project.count({ where: { organizationId, deletedAt: null, status: "COMPLETED" } }),
    ]);
    return { total, active, inProgress, review, completed };
  },
};