/**
 * RBAC permission system.
 * Roles: SUPER_ADMIN, ADMIN, STAFF, CLIENT.
 * Permissions are derived from roles; SUPER_ADMIN bypasses all checks.
 */

import { ForbiddenError, UnauthorizedError } from "@/core/errors/app-error";

export type Role = "SUPER_ADMIN" | "ADMIN" | "STAFF" | "CLIENT";

export type Permission =
  | "dashboard:view"
  | "crm:view"
  | "crm:create"
  | "crm:update"
  | "crm:delete"
  | "projects:view"
  | "projects:create"
  | "projects:update"
  | "projects:delete"
  | "tasks:view"
  | "tasks:create"
  | "tasks:update"
  | "tasks:delete"
  | "invoices:view"
  | "invoices:create"
  | "invoices:update"
  | "invoices:delete"
  | "clients:view"
  | "clients:create"
  | "clients:update"
  | "clients:delete"
  | "support:view"
  | "support:create"
  | "support:update"
  | "media:view"
  | "media:upload"
  | "media:delete"
  | "notifications:view"
  | "activity:view"
  | "audit:view"
  | "settings:view"
  | "settings:update"
  | "users:view"
  | "users:manage"
  | "reports:view"
  | "calendar:view"
  | "calendar:create"
  | "portal:view"
  | "portal:manage";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    "dashboard:view",
    "crm:view",
    "crm:create",
    "crm:update",
    "crm:delete",
    "projects:view",
    "projects:create",
    "projects:update",
    "projects:delete",
    "tasks:view",
    "tasks:create",
    "tasks:update",
    "tasks:delete",
    "invoices:view",
    "invoices:create",
    "invoices:update",
    "invoices:delete",
    "clients:view",
    "clients:create",
    "clients:update",
    "clients:delete",
    "support:view",
    "support:create",
    "support:update",
    "media:view",
    "media:upload",
    "media:delete",
    "notifications:view",
    "activity:view",
    "audit:view",
    "settings:view",
    "settings:update",
    "users:view",
    "users:manage",
    "reports:view",
    "calendar:view",
    "calendar:create",
    "portal:view",
    "portal:manage",
  ],
  ADMIN: [
    "dashboard:view",
    "crm:view",
    "crm:create",
    "crm:update",
    "crm:delete",
    "projects:view",
    "projects:create",
    "projects:update",
    "projects:delete",
    "tasks:view",
    "tasks:create",
    "tasks:update",
    "tasks:delete",
    "invoices:view",
    "invoices:create",
    "invoices:update",
    "invoices:delete",
    "clients:view",
    "clients:create",
    "clients:update",
    "clients:delete",
    "support:view",
    "support:create",
    "support:update",
    "media:view",
    "media:upload",
    "media:delete",
    "notifications:view",
    "activity:view",
    "audit:view",
    "settings:view",
    "settings:update",
    "users:view",
    "users:manage",
    "reports:view",
    "calendar:view",
    "calendar:create",
    "portal:view",
    "portal:manage",
  ],
  STAFF: [
    "dashboard:view",
    "crm:view",
    "crm:create",
    "crm:update",
    "projects:view",
    "projects:create",
    "projects:update",
    "tasks:view",
    "tasks:create",
    "tasks:update",
    "invoices:view",
    "clients:view",
    "clients:create",
    "clients:update",
    "support:view",
    "support:create",
    "support:update",
    "media:view",
    "media:upload",
    "notifications:view",
    "activity:view",
    "calendar:view",
    "calendar:create",
    "portal:view",
  ],
  CLIENT: [
    "dashboard:view",
    "projects:view",
    "tasks:view",
    "invoices:view",
    "support:view",
    "support:create",
    "media:view",
    "notifications:view",
    "calendar:view",
    "portal:view",
  ],
};

export function getPermissionsForRole(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false;
  if (role === "SUPER_ADMIN") return true;
  return getPermissionsForRole(role).includes(permission);
}

export type SessionUser = {
  id: string;
  role?: string;
  organizationId?: string;
  clientId?: string | null;
};

/**
 * Throws if the user is not signed in.
 */
export function requireUser(session: SessionUser | null): SessionUser {
  if (!session?.id) throw new UnauthorizedError();
  return session;
}

/**
 * Throws if the user lacks the given permission.
 */
export function requirePermission(
  session: SessionUser | null,
  permission: Permission
): SessionUser {
  const user = requireUser(session);
  if (!hasPermission(user.role as Role, permission)) {
    throw new ForbiddenError();
  }
  return user;
}

/**
 * Throws if the user is not a member of the given organization.
 */
export function requireOrganization(
  session: SessionUser | null,
  organizationId: string
): SessionUser {
  const user = requireUser(session);
  if (user.organizationId !== organizationId) {
    throw new ForbiddenError("You do not have access to this organization.");
  }
  return user;
}