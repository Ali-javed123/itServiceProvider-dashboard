// lib/validations/serviceCategoryValidation.ts
import { z } from 'zod'

export const serviceCategorySchema = z.object({
  serviceCategory: z.string()
    .min(3, 'Category name must be at least 3 characters')
    .max(50, 'Category name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Category name can only contain letters, numbers, spaces, and hyphens'),
  
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional()
    .or(z.literal('')),
})

export type ServiceCategoryFormValues = z.infer<typeof serviceCategorySchema>