// components/home-banner/BannerForm.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X, Upload } from 'lucide-react';
import { bannerSchema, BannerFormData } from '@/validation/banner.validation';
import { cn } from '@/lib/utils';

interface BannerFormProps {
  initialValues: BannerFormData;
  isSubmitting: boolean;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
  onSubmit: (values: BannerFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  mode: 'create' | 'edit';
  currentImage?: string;
}

export const BannerForm: React.FC<BannerFormProps> = ({
  initialValues,
  isSubmitting,
  imagePreview,
  setImagePreview,
  onSubmit,
  onCancel,
  submitLabel,
  mode,
  currentImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(bannerSchema)}
      onSubmit={onSubmit}
      enableReinitialize={mode === 'edit'}
    >
      {({ setFieldValue, values, errors, touched, handleSubmit }) => {
        const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.currentTarget.files?.[0];
          if (file) {
            setFieldValue('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        };

        const handleRemoveImage = () => {
          setFieldValue('image', undefined);
          setImagePreview(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        };

        return (
          <Form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter banner title"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700",
                    errors.title && touched.title && "border-red-500"
                  )}
                />
                {errors.title && touched.title && (
                  <p className="text-sm text-red-500">{String(errors.title)}</p>
                )}
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <Label htmlFor="heading">
                  Heading <span className="text-red-500">*</span>
                </Label>
                <Field
                  type="text"
                  name="heading"
                  placeholder="Enter banner heading"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700",
                    errors.heading && touched.heading && "border-red-500"
                  )}
                />
                {errors.heading && touched.heading && (
                  <p className="text-sm text-red-500">{String(errors.heading)}</p>
                )}
              </div>

              {/* Button Text 1 */}
              <div className="space-y-2">
                <Label htmlFor="btnTextOne">
                  Button Text 1 <span className="text-red-500">*</span>
                </Label>
                <Field
                  type="text"
                  name="btnTextOne"
                  placeholder="Enter first button text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700",
                    errors.btnTextOne && touched.btnTextOne && "border-red-500"
                  )}
                />
                {errors.btnTextOne && touched.btnTextOne && (
                  <p className="text-sm text-red-500">{String(errors.btnTextOne)}</p>
                )}
              </div>

              {/* Button Text 2 */}
              <div className="space-y-2">
                <Label htmlFor="btnTextTwo">
                  Button Text 2 <span className="text-red-500">*</span>
                </Label>
                <Field
                  type="text"
                  name="btnTextTwo"
                  placeholder="Enter second button text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700",
                    errors.btnTextTwo && touched.btnTextTwo && "border-red-500"
                  )}
                />
                {errors.btnTextTwo && touched.btnTextTwo && (
                  <p className="text-sm text-red-500">{String(errors.btnTextTwo)}</p>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>
                  Banner Image {mode === 'edit' && <span className="text-xs text-gray-500">(Leave empty to keep current)</span>}
                </Label>
                
                <div className={cn(
                  "relative border-2 border-dashed rounded-xl p-6 transition-all duration-200",
                  "hover:border-primary/70 hover:bg-primary/5",
                  errors.image && touched.image && "border-red-500 bg-red-50"
                )}>
                  {(imagePreview || currentImage) ? (
                    <div className="relative group">
                      <img
                        src={imagePreview || currentImage}
                        alt="Banner preview"
                        className="w-full h-64 object-cover rounded-lg shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={handleRemoveImage}
                          className="gap-2"
                        >
                          <X className="w-4 h-4" />
                          Remove Image
                        </Button>
                      </div>
                      {mode === 'edit' && imagePreview && imagePreview !== currentImage && (
                        <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          New Image
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Upload className="w-8 h-8 text-primary/70" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (Max 5MB)</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {errors.image && touched.image && (
                  <p className="text-sm text-red-500">{String(errors.image)}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
                  {isSubmitting ? (
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
        );
      }}
    </Formik>
  );
};