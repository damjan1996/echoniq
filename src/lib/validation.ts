// src/lib/validation.ts
import { z } from 'zod';

import { VALIDATION_MESSAGES } from './constants';

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .min(1, { message: VALIDATION_MESSAGES.REQUIRED })
  .email({ message: VALIDATION_MESSAGES.EMAIL });

/**
 * Basic text field validation schema
 */
export const textSchema = z
  .string()
  .min(1, { message: VALIDATION_MESSAGES.REQUIRED })
  .max(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) });

/**
 * Optional text field schema
 */
export const optionalTextSchema = z
  .string()
  .max(255, { message: VALIDATION_MESSAGES.MAX_LENGTH(255) })
  .optional()
  .or(z.literal(''));

/**
 * Message/long text validation schema
 */
export const messageSchema = z
  .string()
  .min(1, { message: VALIDATION_MESSAGES.REQUIRED })
  .max(5000, { message: VALIDATION_MESSAGES.MAX_LENGTH(5000) });

/**
 * Phone number validation schema
 */
export const phoneSchema = z
  .string()
  .min(1, { message: VALIDATION_MESSAGES.REQUIRED })
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: VALIDATION_MESSAGES.PHONE,
  });

/**
 * Optional phone number validation schema
 */
export const optionalPhoneSchema = z
  .string()
  .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: VALIDATION_MESSAGES.PHONE,
  })
  .optional()
  .or(z.literal(''));

/**
 * Date validation schema
 */
export const dateSchema = z
  .string()
  .min(1, { message: VALIDATION_MESSAGES.REQUIRED })
  .regex(/^\d{4}-\d{2}-\d{2}$/, { message: VALIDATION_MESSAGES.DATE });

/**
 * Time validation schema
 */
export const timeSchema = z
  .string()
  .min(1, { message: VALIDATION_MESSAGES.REQUIRED })
  .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Bitte geben Sie eine gültige Uhrzeit ein (HH:MM)',
  });

/**
 * URL validation schema
 */
export const urlSchema = z
  .string()
  .url({ message: 'Bitte geben Sie eine gültige URL ein' })
  .optional()
  .or(z.literal(''));

/**
 * Boolean validation schema
 */
export const booleanSchema = z.boolean().optional().default(false);

/**
 * Number validation schema
 */
export const numberSchema = z
  .number({ invalid_type_error: VALIDATION_MESSAGES.NUMBER })
  .min(0, { message: 'Bitte geben Sie eine positive Zahl ein' });

/**
 * Optional number validation schema
 */
export const optionalNumberSchema = z
  .number({ invalid_type_error: VALIDATION_MESSAGES.NUMBER })
  .min(0, { message: 'Bitte geben Sie eine positive Zahl ein' })
  .optional()
  .nullable();

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: textSchema,
  email: emailSchema,
  subject: optionalTextSchema,
  message: messageSchema,
  phone: optionalPhoneSchema,
  subscribeToNewsletter: booleanSchema,
});

/**
 * Newsletter subscription validation schema
 */
export const newsletterSchema = z.object({
  email: emailSchema,
  firstName: optionalTextSchema,
  lastName: optionalTextSchema,
});

/**
 * Studio booking validation schema
 */
export const studioBookingSchema = z.object({
  name: textSchema,
  email: emailSchema,
  phone: phoneSchema,
  date: dateSchema,
  time: timeSchema,
  service: textSchema,
  numberOfPeople: optionalNumberSchema,
  additionalInfo: z.string().max(1000).optional().or(z.literal('')),
  subscribeToNewsletter: booleanSchema,
});

/**
 * Artist profile validation schema
 */
export const artistProfileSchema = z.object({
  name: textSchema,
  slug: textSchema,
  bio: z.string().max(2000).optional().or(z.literal('')),
  genre: optionalTextSchema,
  email: optionalTextSchema.pipe(z.string().email().optional().or(z.literal(''))),
  website: urlSchema,
  instagram: urlSchema,
  facebook: urlSchema,
  twitter: urlSchema,
  soundcloud: urlSchema,
  spotify: urlSchema,
  bandcamp: urlSchema,
  youtube: urlSchema,
  isPublished: booleanSchema,
  isFeatured: booleanSchema,
});

/**
 * Music release validation schema
 */
export const releaseSchema = z.object({
  title: textSchema,
  slug: textSchema,
  artistId: textSchema,
  description: z.string().max(2000).optional().or(z.literal('')),
  releaseDate: dateSchema,
  genre: optionalTextSchema,
  catalogNumber: optionalTextSchema,
  spotifyUrl: urlSchema,
  appleMusicUrl: urlSchema,
  bandcampUrl: urlSchema,
  soundcloudUrl: urlSchema,
  beatportUrl: urlSchema,
  youtubeUrl: urlSchema,
  isPublished: booleanSchema,
  isFeatured: booleanSchema,
  releaseType: z.enum(['EP', 'Album', 'Single', 'Compilation']).optional(),
});

/**
 * Track validation schema
 */
export const trackSchema = z.object({
  title: textSchema,
  releaseId: textSchema,
  trackNumber: optionalNumberSchema,
  duration: optionalNumberSchema,
  previewUrl: urlSchema,
  isrc: optionalTextSchema,
  isPublished: booleanSchema,
});

/**
 * Comment validation schema
 */
export const commentSchema = z.object({
  name: textSchema,
  email: emailSchema,
  content: messageSchema,
  postId: textSchema,
});

/**
 * Search validation schema
 */
export const searchSchema = z.object({
  query: z.string().min(2, { message: 'Bitte geben Sie mindestens 2 Zeichen ein' }),
});

/**
 * File upload validation schema
 */
export const fileUploadSchema = z.object({
  file: z.unknown(),
  type: z.enum(['image', 'audio', 'document']),
  maxSize: z.number().optional(),
  allowedExtensions: z.array(z.string()).optional(),
});

/**
 * Validate a function against a schema
 */
export async function validateData<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>>(
  schema: T,
  data: unknown
): Promise<{ success: boolean; data?: z.infer<T>; error?: z.ZodError<T> }> {
  try {
    const validatedData = await schema.parseAsync(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}

/**
 * Get formatted error messages from Zod validation error
 */
export function getErrorMessages(error: z.ZodError<unknown>): Record<string, string> {
  const errors: Record<string, string> = {};

  error.errors.forEach((err) => {
    if (err.path.length > 0) {
      const fieldName = err.path.join('.');
      errors[fieldName] = err.message;
    }
  });

  return errors;
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: Record<string, string>): {
  message: string;
  fields: Record<string, string>;
} {
  const fieldCount = Object.keys(errors).length;
  const message =
    fieldCount === 1
      ? 'Ein Fehler ist aufgetreten. Bitte überprüfen Sie Ihre Eingabe.'
      : `${fieldCount} Fehler sind aufgetreten. Bitte überprüfen Sie Ihre Eingaben.`;

  return {
    message,
    fields: errors,
  };
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  return urlSchema.safeParse(url).success;
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function isValidDate(date: string): boolean {
  return dateSchema.safeParse(date).success;
}

/**
 * Validate time format (HH:MM)
 */
export function isValidTime(time: string): boolean {
  return timeSchema.safeParse(time).success;
}
