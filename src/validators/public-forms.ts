import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().max(30).optional().nullable(),
  company: z.string().max(150).optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export const quoteRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().max(30).optional().nullable(),
  company: z.string().max(150).optional().nullable(),
  serviceType: z.string().max(150).optional().nullable(),
  budget: z.string().max(50).optional().nullable(),
  message: z.string().max(5000).optional().nullable(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;