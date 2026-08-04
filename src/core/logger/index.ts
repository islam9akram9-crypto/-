/**
 * Central application logger.
 * Always use `logger` from this module — never raw `console.*`
 * scattered across the codebase.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_ORDER: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function shouldLog(level: LogLevel): boolean {
  const configured = (process.env.LOG_LEVEL as LogLevel) ?? "info";
  return LEVEL_ORDER[level] >= LEVEL_ORDER[configured];
}

function serializeExtra(extra: unknown): Record<string, unknown> | undefined {
  if (extra === undefined || extra === null) return undefined;
  if (typeof extra === "object") return extra as Record<string, unknown>;
  return { value: extra };
}

function write(level: LogLevel, message: string, extra?: unknown) {
  if (!shouldLog(level)) return;
  const payload = serializeExtra(extra);
  // In production, a structured logger (e.g. pino) can replace console output.
  if (payload) {
    console[level](`[${level.toUpperCase()}] ${message}`, payload);
  } else {
    console[level](`[${level.toUpperCase()}] ${message}`);
  }
}

export const logger = {
  debug: (message: string, extra?: unknown) => write("debug", message, extra),
  info: (message: string, extra?: unknown) => write("info", message, extra),
  warn: (message: string, extra?: unknown) => write("warn", message, extra),
  error: (message: string, extra?: unknown) => write("error", message, extra),
};