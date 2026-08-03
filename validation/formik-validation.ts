// lib/formik-validation.ts
import * as z from 'zod';

// Custom adapter to convert Zod schema to Formik validation
export function zodToFormikValidation<T extends z.ZodTypeAny>(schema: T) {
  return {
    validate: (values: any) => {
      try {
        // Validate using Zod
        const result = schema.safeParse(values);
        
        if (!result.success) {
          // Convert Zod errors to Formik errors format
          const errors: Record<string, string> = {};

          // ZodError exposes issues (ZodIssue[]) rather than errors
          result.error?.issues?.forEach((err: any) => {
            const path = err.path.join('.');
            if (path) {
              errors[path] = err.message;
            }
          });

          return errors;
        }
        
        return {}; // No errors
      } catch (error) {
        console.warn('Validation error:', error);
        return {};
      }
    },
  };
}