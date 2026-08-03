// components/whyChooseUs/WhyChooseUsForm.tsx
import React, { useState, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Upload, Trash2 } from 'lucide-react';
import { chooseUsSchema } from '@/validation/whyChooseUs.valdation';
import { ChooseUsFormValues, Feature } from '@/types/whyChooseUs.types';

interface WhyChooseUsFormProps {
  initialValues: ChooseUsFormValues;
  isSubmitting: boolean;
  onSubmit: (values: ChooseUsFormValues) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  mode: 'create' | 'edit';
  currentImageUrl?: string;
}

export const WhyChooseUsForm: React.FC<WhyChooseUsFormProps> = ({
  initialValues,
  isSubmitting,
  onSubmit,
  onCancel,
  submitLabel,
  mode,
  currentImageUrl,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
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
      validationSchema={toFormikValidationSchema(chooseUsSchema)}
      onSubmit={onSubmit}
      enableReinitialize={mode === 'edit'}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
            <Field
              type="text"
              name="title"
              placeholder="Enter section title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.title && touched.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <Label htmlFor="heading">Heading <span className="text-red-500">*</span></Label>
            <Field
              type="text"
              name="heading"
              placeholder="Enter main heading"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.heading && touched.heading && (
              <p className="text-sm text-red-500">{errors.heading}</p>
            )}
          </div>

          {/* Sub Heading */}
          <div className="space-y-2">
            <Label htmlFor="subHeading">Sub Heading <span className="text-red-500">*</span></Label>
            <Field
              type="text"
              name="subHeading"
              placeholder="Enter sub heading"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.subHeading && touched.subHeading && (
              <p className="text-sm text-red-500">{errors.subHeading}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
            <Field
              as={Textarea}
              name="description"
              placeholder="Enter description"
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.description && touched.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Button Text */}
          <div className="space-y-2">
            <Label htmlFor="btnText">Button Text <span className="text-red-500">*</span></Label>
            <Field
              type="text"
              name="btnText"
              placeholder="Enter button text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            {errors.btnText && touched.btnText && (
              <p className="text-sm text-red-500">{errors.btnText}</p>
            )}
          </div>

          {/* Features */}
          <div className="space-y-4">
            <Label>Features <span className="text-red-500">*</span></Label>
            <FieldArray name="featured">
              {({ push, remove }) => (
                <div className="space-y-4">
                  {values.featured.map((feature: Feature, index: number) => (
                    <div key={index} className="flex gap-4 items-start p-4 border rounded-lg">
                      <div className="flex-1 space-y-2">
                        <Field
                          type="text"
                          name={`featured.${index}.icon`}
                          placeholder="Icon class (e.g., fa-solid fa-star)"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                        />
                        <Field
                          type="text"
                          name={`featured.${index}.title`}
                          placeholder="Feature title"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                        className="flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => push({ icon: '', title: '' })}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
              )}
            </FieldArray>
            {/* FIXED: Check if errors.featured is a string before rendering */}
{errors.featured && touched.featured && (
  <p className="text-sm text-red-500">
    {typeof errors.featured === 'string' 
      ? errors.featured 
      : 'Please add at least one feature'}
  </p>
)}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">
              Image {mode === 'edit' && <span className="text-xs text-gray-400">(Leave empty to keep current)</span>}
            </Label>
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleImageChange(e, setFieldValue)}
              className="hidden"
            />
            
            {imagePreview ? (
              <div className="relative w-48 h-48">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(setFieldValue)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (Max 5MB)</p>
              </div>
            )}
            {errors.image && touched.image && (
              <p className="text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
              {isSubmitting ? 'Saving...' : submitLabel}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};