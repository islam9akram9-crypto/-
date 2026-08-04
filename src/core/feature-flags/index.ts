/**
 * Feature flags — allow safe progressive rollout of modules.
 * Flags are resolved from environment variables first, then from
 * the database-backed FeatureFlag model (Phase 1) when available.
 */

export type FeatureFlagKey =
  | "media-library"
  | "workflow-engine"
  | "automation"
  | "analytics"
  | "client-portal"
  | "ai-studio"
  | "approvals"
  | "comments"
  | "tags"
  | "knowledge-base"
  | "calendar"
  | "reports"
  | "notifications"
  | "audit-logs"
  | "activity-center";

const DEFAULT_FLAGS: Record<FeatureFlagKey, boolean> = {
  "media-library": true,
  "workflow-engine": false,
  automation: false,
  analytics: true,
  "client-portal": true,
  "ai-studio": false,
  approvals: false,
  comments: true,
  tags: true,
  "knowledge-base": false,
  calendar: true,
  reports: true,
  notifications: true,
  "audit-logs": true,
  "activity-center": true,
};

function envOverride(key: FeatureFlagKey): boolean | undefined {
  const value = process.env[`FEATURE_${key.toUpperCase().replace(/-/g, "_")}`];
  if (value === undefined) return undefined;
  return value === "true" || value === "1";
}

export function isFeatureEnabled(key: FeatureFlagKey): boolean {
  const override = envOverride(key);
  if (override !== undefined) return override;
  return DEFAULT_FLAGS[key];
}

export function getEnabledFeatures(): FeatureFlagKey[] {
  return (Object.keys(DEFAULT_FLAGS) as FeatureFlagKey[]).filter((key) =>
    isFeatureEnabled(key)
  );
}