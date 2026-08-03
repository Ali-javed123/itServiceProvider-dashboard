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

import { Upload, X, Pencil, AlertCircle } from 'lucide-react';

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
            <div className="space-y-3">
  <Label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-300">
    Service Image {mode === 'edit' && <span className="text-xs text-gray-400 font-normal">(Leave empty to keep current)</span>}
  </Label>
  
  {/* Hidden File Input */}
  <input
    ref={fileInputRef}
    type="file"
    name="image"
    accept="image/jpeg,image/png,image/webp,image/gif"
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
    className="hidden"
  />

  {/* Drop Zone / Upload Area */}
  <div 
    className={`
      relative border-2 border-dashed rounded-xl transition-all duration-200
      ${imagePreview || currentImageUrl 
        ? 'border-blue-400 bg-blue-50/30 dark:bg-blue-900/10' 
        : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/20 dark:hover:bg-blue-900/5'
      }
      ${errors.image && touched.image ? 'border-red-400 bg-red-50/20 dark:bg-red-900/10' : ''}
    `}
  >
    {/* Image Preview */}
    {(imagePreview || (mode === 'edit' && currentImageUrl)) ? (
      <div className="relative p-4">
        <div className="relative w-full max-w-[200px] mx-auto aspect-square rounded-lg overflow-hidden shadow-md">
          <img 
            src={imagePreview || currentImageUrl} 
            alt="Service preview" 
            className="w-full h-full object-cover" 
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-lg"
              title="Change image"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleRemoveImage(setFieldValue)}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* Status Badges */}
          {mode === 'edit' && imagePreview && imagePreview !== currentImageUrl && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg animate-pulse">
              New
            </div>
          )}
          {mode === 'edit' && !imagePreview && currentImageUrl && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-lg">
              Current
            </div>
          )}
        </div>
      </div>
    ) : (
      /* Empty Drop Zone */
      <div 
        className="flex flex-col items-center justify-center p-8 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
          <Upload className="w-8 h-8 text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Click to upload or drag & drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          JPEG, PNG, WebP, GIF (Max 5MB)
        </p>
      </div>
    )}
  </div>

  {/* Action Buttons - shown when image exists */}
  {(imagePreview || currentImageUrl) && (
    <div className="flex items-center gap-3 flex-wrap">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="text-xs"
      >
        <Upload className="w-3.5 h-3.5 mr-1.5" />
        Change
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => handleRemoveImage(setFieldValue)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs"
      >
        <X className="w-3.5 h-3.5 mr-1.5" />
        Remove
      </Button>
      
      {imagePreview && (
        <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          Ready to upload
        </span>
      )}
    </div>
  )}

  {/* Error Message */}
  {errors.image && touched.image && (
    <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/10 px-3 py-2 rounded-lg">
      <AlertCircle className="w-4 h-4" />
      <span>{errors.image as string}</span>
    </div>
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