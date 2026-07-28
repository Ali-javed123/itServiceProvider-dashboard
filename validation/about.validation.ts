// validations/about.validation.ts
import * as z from 'zod';

// Feature Schema
export const featureSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon: z.string().min(1, 'Icon is required'),
});
    
// About Page Form Schema
export const aboutFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title too long'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(500, 'Description too long'),
  imgIcon1: z.string().min(1, 'Icon 1 is required'),
  imgIcon2: z.string().min(1, 'Icon 2 is required'),
  cardTitle: z.string().min(3, 'Card title must be at least 3 characters'),
  cardDescription: z.string().min(10, 'Card description must be at least 10 characters'),
  btnText: z.string().min(1, 'Button text is required'),
  features: z.array(featureSchema).min(1, 'At least one feature is required'),
  image_one: z.any().optional(),
  image_two: z.any().optional(),
  existingImageOne: z.string().optional(),
  existingImageTwo: z.string().optional(),
});

export type AboutFormData = z.infer<typeof aboutFormSchema>;