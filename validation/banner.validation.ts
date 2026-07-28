// validation/banner.validation.ts
import * as z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const bannerSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  
  heading: z.string()
    .min(3, 'Heading must be at least 3 characters')
    .max(100, 'Heading must be less than 100 characters'),
  
  btnTextOne: z.string()
    .min(2, 'Button text must be at least 2 characters')
    .max(50, 'Button text must be less than 50 characters'),
  
  btnTextTwo: z.string()
    .min(2, 'Button text must be at least 2 characters')
    .max(50, 'Button text must be less than 50 characters'),
  
  image: z.any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      'Image must be a valid file'
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      'Image size must be less than 5MB'
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPEG, PNG, WebP, and GIF images are allowed'
    ),
});

export type BannerFormData = z.infer<typeof bannerSchema>;