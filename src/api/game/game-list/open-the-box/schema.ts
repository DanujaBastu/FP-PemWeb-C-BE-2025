import { z } from 'zod';

// Schema untuk setiap kotak
const openTheBoxItemSchema = z.object({
  id: z.string(),
  boxNumber: z.number(),
  type: z.enum(['text', 'image']),
  content: z.string().min(1, 'Content cannot be empty'),
  isLocked: z.boolean().optional(),
});

// Schema untuk Settings
const openTheBoxSettingsSchema = z.object({
  theme: z.enum(['classic', 'modern', 'mystery']).default('classic'),
  randomize: z.boolean().default(false),
});

// Schema Utama
export const createOpenTheBoxSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().optional(),
  // Kita biarkan key JSON tetap thumbnail_image agar sesuai DB, tapi validasinya di sini
  thumbnail_image: z.string().optional(),

  gameData: z.object({
    items: z.array(openTheBoxItemSchema).min(1, 'Must have at least one box'),
    settings: openTheBoxSettingsSchema,
  }),
});

// Ubah nama type agar sesuai aturan linter (harus berakhiran Props)
export type CreateOpenTheBoxProps = z.infer<typeof createOpenTheBoxSchema>;

// Type for gameData specifically
export type OpenTheBoxGameProps = z.infer<
  typeof createOpenTheBoxSchema
>['gameData'];
