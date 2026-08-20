// validation/ourBenefits.validation.ts
import { z } from 'zod';

const featuredSchema = z.object({
  heading: z.string().min(1, 'Heading is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
  imageFile: z.any().optional(),
  existingImageUrl: z.string().optional(),
  existingPublicId: z.string().optional(),
});

const listItemSchema = z.object({
  list: z.string().min(1, 'List item is required'),
});

export const ourBenefitsFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subHeading: z.string().min(1, 'Sub heading is required'),
  btnText: z.string().min(1, 'Button text is required'),
  featured: z.array(featuredSchema).min(1, 'At least one featured item is required'),
  list: z.array(listItemSchema).min(1, 'At least one list item is required'),
});

export type OurBenefitsFormData = z.infer<typeof ourBenefitsFormSchema>;