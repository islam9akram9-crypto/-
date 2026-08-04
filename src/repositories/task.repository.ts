import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export interface TaskListParams {
  organizationId: string;
  status?: string;
  projectId?: string;
  assigneeId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface TaskListResult {
  items: Prisma.TaskGetPayload<{ include: { project: true; assignee: true } }>[];
  total: number;
  page: number;
  pageSize: number;
}

export const taskRepository = {
  async findById(id: string, organizationId: string) {
    return prisma.task.findFirst({
      where: { id, organizationId, deletedAt: null },
      include: { project: true, assignee: true },
    });
  },

  async list({
    organizationId,
    status,
    projectId,
    assigneeId,
    search,
    page = 1,
    pageSize = 10,
  }: TaskListParams): Promise<TaskListResult> {
    const where: Prisma.TaskWhereInput = {
      organizationId,
      deletedAt: null,
      ...(projectId ? { projectId } : {}),
      ...(assigneeId ? { assigneeId } : {}),
      ...(status ? { status: status as Prisma.TaskWhereInput["status"] } : {}),
      ...(search ? { title: { contains: search, mode: "insensitive" } } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: { project: true, assignee: true },
        orderBy: [{ status: "asc" }, { order: "asc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.task.count({ where }),
    ]);

    return { items, total, page, pageSize };
  },

  async create(data: Prisma.TaskUncheckedCreateInput) {
    return prisma.task.create({ data });
  },

  async update(id: string, organizationId: string, data: Prisma.TaskUncheckedUpdateInput, actorId?: string) {
    const result = await prisma.task.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { ...data, ...(actorId ? { updatedById: actorId } : {}) },
    });
    if (result.count === 0) return null;
    return prisma.task.findFirst({ where: { id, organizationId } });
  },

  /** Soft-delete: sets deletedAt/deletedBy instead of removing the row. */
  async delete(id: string, organizationId: string, actorId?: string) {
    return prisma.task.updateMany({
      where: { id, organizationId, deletedAt: null },
      data: { deletedAt: new Date(), ...(actorId ? { deletedById: actorId } : {}) },
    });
  },

  async countByStatus(organizationId: string) {
    const [todo, inProgress, review, done] = await Promise.all([
      prisma.task.count({ where: { organizationId, deletedAt: null, status: "TODO" } }),
      prisma.task.count({ where: { organizationId, deletedAt: null, status: "IN_PROGRESS" } }),
      prisma.task.count({ where: { organizationId, deletedAt: null, status: "REVIEW" } }),
      prisma.task.count({ where: { organizationId, deletedAt: null, status: "DONE" } }),
    ]);
    return { todo, inProgress, review, done, total: todo + inProgress + review + done };
  },
};