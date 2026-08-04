# NABAD MEDIA — PROJECT CONTEXT

> **STATUS:** SINGLE SOURCE OF TRUTH — v1.0
> This document governs all architecture, implementation, and product decisions for the Nabad Media platform. Never ignore, replace, or contradict it without explicit written approval.

---

## 1. PROJECT IDENTITY

| Field | Value |
|---|---|
| **Name** | Nabad Media (نبض ميديا) |
| **Type** | Enterprise SaaS Platform — Agency Operating System |
| **Vision** | One platform managing an entire digital agency: CRM → Projects → Invoices → Files → Clients → Support → Marketing → AI → Automation → Analytics → Reports → Client Portal → Workflow → Knowledge Base → Billing — all connected |
| **Inspiration** | HubSpot, ClickUp, Notion, Monday, Odoo, Stripe Dashboard, Vercel Dashboard, Linear, GitHub, Framer (quality inspiration only — never copied) |
| **Status** | Foundation complete (~60%). Architecture exists, DB exists, Auth exists, Dashboard/CRM/CMS/Support/Billing foundations exist. **NOT production ready.** |

---

## 2. TECH STACK (LOCKED)

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router, React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Backend | Next.js Server Actions + API Routes |
| ORM | Prisma 6 + PostgreSQL |
| Auth | NextAuth v5 (credentials, JWT sessions) |
| Validation | Zod 4 |
| i18n | next-intl (Arabic `ar` RTL / English `en` LTR) |
| UI Primitives | Radix UI |
| Deployment | Vercel |
| Icons | lucide-react |

---

## 3. ARCHITECTURE (LOCKED)

### 3.1 Feature-Based Architecture (MANDATORY)

```
src/
├── app/                 # Next.js App Router (routes only — no business logic)
├── features/            # Business features — independent, one per module
│   └── <feature>/
│       ├── components/
│       ├── actions/
│       ├── services/
│       ├── repositories/
│       ├── schemas/
│       ├── validators/
│       ├── types/
│       ├── hooks/
│       └── constants/
├── core/                # Shared infrastructure (used by ALL features)
│   ├── media/
│   ├── notifications/
│   ├── activity/
│   ├── audit/
│   ├── files/
│   ├── comments/
│   ├── notes/
│   ├── tags/
│   ├── search/
│   ├── storage/
│   ├── email/
│   ├── permissions/
│   ├── analytics/
│   ├── logger/
│   ├── settings/
│   ├── events/
│   └── feature-flags/
├── shared/              # UI design system + cross-cutting shared code
│   ├── components/ui/   # Design system (reusable only)
│   ├── components/layout/
│   ├── hooks/
│   ├── lib/
│   └── constants/
├── config/              # Environment config, app constants, feature toggles
├── lib/                 # App-level libs: prisma, auth, i18n, utils
├── types/               # Global ambient types (next-auth etc.)
├── providers/           # React context providers (client entry)
├── services/            # Cross-feature domain services
├── repositories/        # Cross-feature data access
├── validators/          # Cross-feature Zod schemas
├── emails/              # Email templates
├── hooks/               # Global hooks
└── utils/               # Global utilities
```

### 3.2 Layering Rules (STRICT — never violated)

```
UI (pages/components)
        ↓
Services        (business logic ONLY — never in pages/components)
        ↓
Repositories    (DB access ONLY — never business logic)
        ↓
Prisma
```

- **NEVER** access Prisma directly from a page or component.
- **NEVER** place business logic inside pages, components, forms, or UI.
- UI ↔ Service ↔ Repository ↔ Prisma. That is the only allowed path.

### 3.3 Validation (LOCKED)

- Validate at every boundary: **Client → Server → Database**.
- Zod is the only validation library.
- Every Server Action validates input with a Zod schema before processing.

### 3.4 TypeScript Rules (LOCKED)

- `strict: true`. No `any`. No unsafe casting.
- DTOs between layers.
- Strong typing everywhere; interfaces and types used correctly.

### 3.5 React / Next.js Rules (LOCKED)

- Prefer Server Components. Client Components only when interactivity is required.
- Avoid unnecessary state, avoid prop drilling, reuse hooks.
- App Router only. Use Server Actions appropriately. Optimize rendering, use caching correctly, minimize client bundle.

---

## 4. DESIGN SYSTEM (LOCKED)

### 4.1 Reference

- Primary UI reference: **https://www.uupm.cc/** — study layouts, spacing, typography, SaaS dashboard patterns before creating any interface.
- Style: Modern SaaS — Minimal, Premium, Professional, Enterprise, Accessible, Responsive, Fast, Reusable.
- Never: old UI, Bootstrap-looking UI, generic admin templates.

### 4.2 Mandatory Components (reusable, single responsibility, max ~250 lines)

Button · Input · Textarea · Select · Card · Modal · Drawer · Badge · Avatar · Tooltip · Dropdown · Table · DataTable · Alert · Toast · Tabs · Accordion · Charts · Skeleton · Loading State · Empty State · Error State · Success State · Pagination · Filters · Search · Breadcrumb

### 4.3 UX Rules (MANDATORY — every page)

Every page has: **Loading State · Error State · Success State · Empty State · Permission State · 404 State.** No exceptions.

### 4.4 Responsive (MANDATORY)

Desktop First → Tablet → Mobile → Large Screens → Touch Devices. Everything responsive.

---

## 5. CORE MODULES (shared by ALL features — never duplicated)

Media · Notifications · Activity · Audit · Files · Comments · Notes · Tags · Search · Storage · Email · Permissions · Analytics · Logger · Settings · Events

---

## 6. MODULES

### 6.1 Completed (verified)
Authentication · Organizations · Users · Clients · Projects · Leads · Services · Packages · Portfolio · Blog · Quote Requests · Contact · Support Tickets · Invoices · Subscriptions · Dashboard · Basic CMS · Client Portal (foundation)

> **NOTE:** Admin Dashboard, CRM, Projects, Tasks, and Invoices pages are wired to real repositories/services. Client Portal (portal page + login) is wired to real data via `portalRepository`. Contact and Quote API routes are Zod-validated. UI primitives consolidated under `src/shared/components/ui` (duplicate `src/components/ui` removed).

### 6.2 Missing (build roadmap)
Notification Center · Activity Center · Audit Logs · Media Library · Workflow Engine · Automation · Analytics · AI Studio · Approval System · Comment System · Tag System · Knowledge Base · Calendar · Tasks (full) · Reports · Background Jobs · Queues · Monitoring · Caching · Feature Flags · Plugin System

---

## 7. MULTI-TENANCY (Phase 4)

- Every tenant-scoped model carries `organizationId`.
- All queries MUST scope by the session's `organizationId` — never query without tenant scoping.
- Roles: `SUPER_ADMIN`, `ADMIN`, `STAFF`, `CLIENT`.

---

## 8. SECURITY (LOCKED)

- RBAC enforced via shared permissions module + middleware.
- All server actions authenticated + authorized.
- Input validated at every boundary (Zod).
- No secrets in client bundles; environment variables via `src/config/env.ts` (Zod-validated).
- Admin and portal routes protected (middleware is currently a no-op — MUST be fixed).

---

## 9. ROADMAP

| Phase | Scope |
|---|---|
| **0** | Foundation: PROJECT_CONTEXT, feature-based structure, complete design system, shared primitives (permissions/logger/events/env/errors), seed scripts |
| **1** | Data layer: extend Prisma schema for all missing modules; repositories + services + validators; migration |
| **2** | Admin OS core (real data): auth enforcement, dashboard, CRM, projects, tasks, invoices, support, media, notifications, audit, settings |
| **3** | Advanced: workflow engine, automation, calendar, knowledge base, approvals, tags/comments, reports & analytics, global search |
| **4** | Client portal + AI Studio |
| **5** | Production hardening: caching, queues, monitoring, tests, docs |

---

## 10. CONVENTIONS

- **Language:** UI is Arabic-first (RTL) with English support. Marketing content is bilingual (Ar/En fields on content models).
- **Colors:** Primary indigo-600; brand teal accents (`#14b8a6`) for CTA on dark surfaces.
- **Currency:** SAR default.
- **IDs:** `cuid()` primary keys; human codes (e.g. `INV-0001`) derived per-organization.
- **Dates:** `DateTime` UTC in DB; formatted per locale at render.
- Anything not defined here defaults to modern enterprise SaaS best practices.