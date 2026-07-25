// components/CategoryForm.tsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { serviceCategorySchema } from '@/lib/validations/serviceCategoryValidation';
import { generateSlug } from '../../utils/service.category.helper';
import type { ServiceCategoryFormValues } from '../../types/serviceCategory';

interface CategoryFormProps {
  initialValues: ServiceCategoryFormValues;
  onSubmit: (values: ServiceCategoryFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = 'Submit',
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(serviceCategorySchema)}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form>
          <div className="py-6 space-y-4">
            {/* Category Name */}
            <div className="space-y-2">
              <Label htmlFor="serviceCategory">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Field
                type="text"
                name="serviceCategory"
                placeholder="Enter category name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  setFieldValue('serviceCategory', value);
                  if (!values.slug) {
                    setFieldValue('slug', generateSlug(value));
                  }
                }}
              />
              {errors.serviceCategory && touched.serviceCategory && (
                <p className="text-sm text-red-500">{errors.serviceCategory}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex gap-2">
                <Field
                  type="text"
                  name="slug"
                  placeholder="auto-generated"
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (values.serviceCategory) {
                      setFieldValue('slug', generateSlug(values.serviceCategory));
                    }
                  }}
                >
                  Generate
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Leave empty to auto-generate from category name
              </p>
              {errors.slug && touched.slug && (
                <p className="text-sm text-red-500">{errors.slug}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};