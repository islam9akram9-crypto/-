/**
 * Central application error types.
 * All business/service layer errors must extend AppError so the UI
 * can render localized, safe error states without leaking internals.
 */

export type ErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly statusCode: number;
  readonly details?: unknown;

  constructor(
    code: ErrorCode,
    message: string,
    options: { statusCode?: number; details?: unknown; cause?: unknown } = {}
  ) {
    super(message, { cause: options.cause });
    this.name = "AppError";
    this.code = code;
    this.statusCode = options.statusCode ?? statusCodeFor(code);
    this.details = options.details;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "You must be signed in to perform this action.") {
    super("UNAUTHORIZED", message, { statusCode: 401 });
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "You do not have permission to perform this action.") {
    super("FORBIDDEN", message, { statusCode: 403 });
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "The requested resource was not found.") {
    super("NOT_FOUND", message, { statusCode: 404 });
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message = "The provided input is invalid.", details?: unknown) {
    super("VALIDATION_ERROR", message, { statusCode: 422, details });
    this.name = "ValidationError";
  }
}

export class ConflictError extends AppError {
  constructor(message = "The request conflicts with the current state.") {
    super("CONFLICT", message, { statusCode: 409 });
    this.name = "ConflictError";
  }
}

export class RateLimitError extends AppError {
  constructor(message = "Too many requests. Please try again later.") {
    super("RATE_LIMITED", message, { statusCode: 429 });
    this.name = "RateLimitError";
  }
}

function statusCodeFor(code: ErrorCode): number {
  switch (code) {
    case "UNAUTHORIZED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "VALIDATION_ERROR":
      return 422;
    case "CONFLICT":
      return 409;
    case "RATE_LIMITED":
      return 429;
    default:
      return 500;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}