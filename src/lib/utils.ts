import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "SAR", locale = "ar-SA") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
}

export function formatDate(date: Date | string, locale = "ar") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string, locale = "ar") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getLocalizedField<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: string
): string {
  const key = locale === "ar" ? `${field}Ar` : `${field}En`;
  return (item[key] as string) ?? (item[`${field}Ar`] as string) ?? "";
}
