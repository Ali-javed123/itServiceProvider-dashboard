// components/service/ServiceForm.tsx
import React, { useRef } from 'react';
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
import { X, Upload } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = (setFieldValue: any) => {
    setFieldValue('image', undefined);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

            {/* Image - FIXED VERSION */}
            <div className="space-y-2">
              <Label htmlFor="image">
                Service Image {mode === 'edit' && <span className="text-xs text-gray-500">(Leave empty to keep current)</span>}
              </Label>
              
              <div className="flex flex-col gap-4">
                {/* File Input */}
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="image"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        // ✅ Set file in Formik
                        setFieldValue('image', file);
                        
                        // ✅ Create preview
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
                      dark:file:bg-gray-700 dark:file:text-blue-400
                      cursor-pointer"
                  />
                  
                  {/* Image Preview */}
                  {(imagePreview || (mode === 'edit' && currentImageUrl)) && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 flex-shrink-0 group">
                      <img 
                        src={imagePreview || currentImageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                      
                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(setFieldValue)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                          hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      
                      {/* New Badge for edit mode */}
                      {mode === 'edit' && imagePreview && imagePreview !== currentImageUrl && (
                        <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs text-center py-0.5">
                          New
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Upload Button Alternative */}
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Choose Image
                  </Button>
                  
                  {(imagePreview || currentImageUrl) && (
                    <span className="text-xs text-gray-500">
                      {imagePreview ? 'New image selected' : 'Current image'}
                    </span>
                  )}
                </div>
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