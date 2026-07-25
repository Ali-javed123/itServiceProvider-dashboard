import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  
  category: z.string()
    .min(1, 'Please select a category'),
  
  icon: z.string()
    .min(1, 'Please enter an icon class')
    .regex(/^fa/, 'Icon must be a FontAwesome class (e.g., fa-solid fa-star)'),
  
  image: z.instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'Image size must be less than 5MB'
    )
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
      'Only JPEG, PNG, WebP, and GIF images are allowed'
    ),
});