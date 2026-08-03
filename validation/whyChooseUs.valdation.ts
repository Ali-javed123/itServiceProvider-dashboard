// validation/whyChooseUs.schema.ts
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const featureSchema = z.object({
  icon: z.string().min(1, 'Icon is required'),
  title: z.string().min(1, 'Feature title is required'),
});

export const chooseUsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  heading: z.string().min(1, 'Heading is required'),
  description: z.string().min(1, 'Description is required'),
  subHeading: z.string().min(1, 'Sub heading is required'),
  btnText: z.string().min(1, 'Button text is required'),
  featured: z.array(featureSchema).min(1, 'At least one feature is required'),
  image: z
    .any()
    .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), 
      'Max image size is 5MB'
    )
    .refine((file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
    .optional(),
});

export const updateChooseUsSchema = chooseUsSchema.partial();