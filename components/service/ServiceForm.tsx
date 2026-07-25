import React from 'react';
import { Formik, Form, Field } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CategoryItem, ServiceFormValues } from '@/types/service.types';
import { serviceSchema } from '@/validation/service.schema';

interface ServiceFormProps {
  initialValues: ServiceFormValues;
  categories: CategoryItem[];
  isSubmitting: boolean;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
  onSubmit: (values: ServiceFormValues) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  mode: 'create' | 'edit';
  currentImageUrl?: string;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  initialValues,
  categories,
  isSubmitting,
  imagePreview,
  setImagePreview,
  onSubmit,
  onCancel,
  submitLabel,
  mode,
  currentImageUrl,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(serviceSchema)}
      onSubmit={onSubmit}
      enableReinitialize={mode === 'edit'}
    >
      {({ setFieldValue, values, errors, touched, handleSubmit, isSubmitting: formSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Field name="category">
                {({ field }: any) => (
                  <Select
                    value={field.value}
                    onValueChange={(value) => setFieldValue('category', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.serviceCategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
              {errors.category && touched.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Field
                type="text"
                name="title"
                placeholder="Enter service title"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              />
              {errors.title && touched.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Field
                as="textarea"
                name="description"
                placeholder="Enter service description"
                rows={4}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              />
              {errors.description && touched.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <Label htmlFor="icon">
                Icon Class <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Field
                  type="text"
                  name="icon"
                  placeholder="e.g., fa-solid fa-cart-shopping"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                />
                {values.icon && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <i className={`${values.icon} text-2xl text-blue-500`} />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Enter FontAwesome class name (e.g., fa-solid fa-cart-shopping)
              </p>
              {errors.icon && touched.icon && (
                <p className="text-sm text-red-500">{errors.icon}</p>
              )}
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label htmlFor="image">
                Service Image {mode === 'edit' && <span className="text-xs text-gray-500">(Leave empty to keep current)</span>}
              </Label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue('image', file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="flex-1 text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    dark:file:bg-gray-700 dark:file:text-blue-400"
                />
                {(imagePreview || (mode === 'edit' && currentImageUrl)) && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border flex-shrink-0">
                    <img 
                      src={imagePreview || currentImageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    {mode === 'edit' && imagePreview !== currentImageUrl && imagePreview && (
                      <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs text-center py-0.5">
                        New
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Max size: 5MB. Supported: JPEG, PNG, WebP, GIF
              </p>
              {errors.image && touched.image && (
                <p className="text-sm text-red-500">{errors.image as string}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting || formSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || formSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting || formSubmitting ? (
                  <>
                    <span className="mr-2">⏳</span>
                    {mode === 'create' ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  submitLabel
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};