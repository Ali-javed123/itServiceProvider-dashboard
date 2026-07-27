// components/AboutFormModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { aboutFormSchema, AboutFormData } from '@/validation/about.validation';
import { IPage } from '@/types/about.type';
import { useAbout } from '@/lib/hooks/useAbout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Plus, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: IPage | null;
  onSuccess?: () => void;
}

// Icon options for features
const ICON_OPTIONS = [
  { value: 'fa-solid fa-gears', label: 'Gears' },
  { value: 'fa-solid fa-gear', label: 'Gear' },
  { value: 'fa-solid fa-cloud', label: 'Cloud' },
  { value: 'fa-solid fa-server', label: 'Server' },
  { value: 'fa-solid fa-code', label: 'Code' },
  { value: 'fa-solid fa-database', label: 'Database' },
  { value: 'fa-solid fa-shield', label: 'Shield' },
  { value: 'fa-solid fa-rocket', label: 'Rocket' },
];

export default function AboutFormModal({
  isOpen,
  onClose,
  editData,
  onSuccess,
}: AboutFormModalProps) {
  const { createAbout, updateAbout, loading } = useAbout();
  const [imageOnePreview, setImageOnePreview] = useState<string | null>(null);
  const [imageTwoPreview, setImageTwoPreview] = useState<string | null>(null);
  const fileInputRefOne = useRef<HTMLInputElement>(null);
  const fileInputRefTwo = useRef<HTMLInputElement>(null);

  // Initialize Formik
  const formik = useFormik<AboutFormData>({
    initialValues: {
      title: editData?.title || '',
      description: editData?.description || '',
      imgIcon1: editData?.imgIcon1 || '',
      imgIcon2: editData?.imgIcon2 || '',
      cardTitle: editData?.cardTitle || '',
      cardDescription: editData?.cardDescription || '',
      btnText: editData?.btnText || 'More details',
      features: editData?.features || [
        { title: '', description: '', icon: 'fa-solid fa-gears' },
      ],
      image_one: undefined,
      image_two: undefined,
      existingImageOne: editData?.image_one?.url || '',
      existingImageTwo: editData?.image_two?.url || '',
    },
    validationSchema: toFormikValidationSchema(aboutFormSchema),
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        
        // Append all fields
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('imgIcon1', values.imgIcon1);
        formData.append('imgIcon2', values.imgIcon2);
        formData.append('cardTitle', values.cardTitle);
        formData.append('cardDescription', values.cardDescription);
        formData.append('btnText', values.btnText);
        formData.append('features', JSON.stringify(values.features));

        // Append images if new files are selected
        if (values.image_one instanceof File) {
          formData.append('image_one', values.image_one);
        }
        if (values.image_two instanceof File) {
          formData.append('image_two', values.image_two);
        }

        let result;
        if (editData?._id) {
          result = await updateAbout(editData._id, formData);
        } else {
          result = await createAbout(formData);
        }

        if (result) {
          onClose();
          onSuccess?.();
        }
      } catch (error) {
        console.error('Submit error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle image selection
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'image_one' | 'image_two'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        formik.setFieldError(fieldName, 'Please upload a valid image (JPEG, PNG, WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        formik.setFieldError(fieldName, 'Image size should be less than 5MB');
        return;
      }

      formik.setFieldValue(fieldName, file);
      
      // Preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target?.result as string;
        if (fieldName === 'image_one') {
          setImageOnePreview(preview);
        } else {
          setImageTwoPreview(preview);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = (fieldName: 'image_one' | 'image_two') => {
    formik.setFieldValue(fieldName, undefined);
    if (fieldName === 'image_one') {
      setImageOnePreview(null);
      if (fileInputRefOne.current) fileInputRefOne.current.value = '';
    } else {
      setImageTwoPreview(null);
      if (fileInputRefTwo.current) fileInputRefTwo.current.value = '';
    }
  };

  // Get image display URL
  const getImageDisplayUrl = (fieldName: 'image_one' | 'image_two') => {
    const preview = fieldName === 'image_one' ? imageOnePreview : imageTwoPreview;
    if (preview) return preview;
    if (fieldName === 'image_one' && editData?.image_one?.url) {
      return editData.image_one.url;
    }
    if (fieldName === 'image_two' && editData?.image_two?.url) {
      return editData.image_two.url;
    }
    return null;
  };

  // Helper function to safely get nested error
  const getFieldError = (fieldName: string) => {
    const meta = formik.getFieldMeta(fieldName);
    return meta.touched && meta.error ? meta.error : undefined;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editData ? 'Edit About Page' : 'Create About Page'}
          </DialogTitle>
          <DialogDescription>
            Fill in the details to {editData ? 'update' : 'create'} the about page content.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                formik.touched.title && formik.errors.title && 'border-red-500'
              )}
              placeholder="Enter about page title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-sm text-red-500">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              className={cn(
                formik.touched.description && formik.errors.description && 'border-red-500'
              )}
              placeholder="Enter about page description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500">{formik.errors.description}</p>
            )}
          </div>

          {/* Images with improved styling */}
          <div className="grid grid-cols-2 gap-6">
            {/* Image One */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Image One</Label>
              <div 
                className={cn(
                  "relative border-2 border-dashed rounded-xl p-4 transition-all duration-200",
                  "hover:border-primary/70  hover:bg-primary/5",
                  getFieldError('image_one') && 'border-red-500 bg-red-50'
                )}
              >
                {getImageDisplayUrl('image_one') ? (
                  <div className="relative group">
                    <img
                      src={getImageDisplayUrl('image_one')!}
                      alt="Image one preview"
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage('image_one')}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
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
                  ref={fileInputRefOne}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleImageChange(e, 'image_one')}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {getFieldError('image_one') && (
                <p className="text-sm text-red-500">{getFieldError('image_one')}</p>
              )}
            </div>

            {/* Image Two */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Image Two</Label>
              <div 
                className={cn(
                  "relative border-2 border-dashed rounded-xl p-4 transition-all duration-200",
                  "hover:border-primary/70 hover:bg-primary/5",
                  getFieldError('image_two') && 'border-red-500 bg-red-50'
                )}
              >
                {getImageDisplayUrl('image_two') ? (
                  <div className="relative group">
                    <img
                      src={getImageDisplayUrl('image_two')!}
                      alt="Image two preview"
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage('image_two')}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <ImageIcon className="w-8 h-8 text-primary/70" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                    <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP (Max 5MB)</p>
                  </div>
                )}
                <input
                  ref={fileInputRefTwo}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleImageChange(e, 'image_two')}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {getFieldError('image_two') && (
                <p className="text-sm text-red-500">{getFieldError('image_two')}</p>
              )}
            </div>
          </div>

          {/* Icons - Using Input with Datalist instead of Select */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="imgIcon1">Icon 1</Label>
              <div className="relative">
                <Input
                  id="imgIcon1"
                  name="imgIcon1"
                  value={formik.values.imgIcon1}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  list="icon-list-1"
                  className={cn(
                    "font-mono",
                    formik.touched.imgIcon1 && formik.errors.imgIcon1 && 'border-red-500'
                  )}
                  placeholder="Type icon class name (e.g., fa-solid fa-gears)"
                />
                <datalist id="icon-list-1">
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </datalist>
              </div>
              <p className="text-xs text-gray-400">
                Type icon class name or select from suggestions
              </p>
              {formik.touched.imgIcon1 && formik.errors.imgIcon1 && (
                <p className="text-sm text-red-500">{formik.errors.imgIcon1}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imgIcon2">Icon 2</Label>
              <div className="relative">
                <Input
                  id="imgIcon2"
                  name="imgIcon2"
                  value={formik.values.imgIcon2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  list="icon-list-2"
                  className={cn(
                    "font-mono",
                    formik.touched.imgIcon2 && formik.errors.imgIcon2 && 'border-red-500'
                  )}
                  placeholder="Type icon class name (e.g., fa-solid fa-gears)"
                />
                <datalist id="icon-list-2">
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </datalist>
              </div>
              <p className="text-xs text-gray-400">
                Type icon class name or select from suggestions
              </p>
              {formik.touched.imgIcon2 && formik.errors.imgIcon2 && (
                <p className="text-sm text-red-500">{formik.errors.imgIcon2}</p>
              )}
            </div>
          </div>

          {/* Card Section */}
          <div className="space-y-2">
            <Label htmlFor="cardTitle">Card Title</Label>
            <Input
              id="cardTitle"
              name="cardTitle"
              value={formik.values.cardTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                formik.touched.cardTitle && formik.errors.cardTitle && 'border-red-500'
              )}
              placeholder="Enter card title"
            />
            {formik.touched.cardTitle && formik.errors.cardTitle && (
              <p className="text-sm text-red-500">{formik.errors.cardTitle}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardDescription">Card Description</Label>
            <Textarea
              id="cardDescription"
              name="cardDescription"
              value={formik.values.cardDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={3}
              className={cn(
                formik.touched.cardDescription && formik.errors.cardDescription && 'border-red-500'
              )}
              placeholder="Enter card description"
            />
            {formik.touched.cardDescription && formik.errors.cardDescription && (
              <p className="text-sm text-red-500">{formik.errors.cardDescription}</p>
            )}
          </div>

          {/* Button Text */}
          <div className="space-y-2">
            <Label htmlFor="btnText">Button Text</Label>
            <Input
              id="btnText"
              name="btnText"
              value={formik.values.btnText}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(
                formik.touched.btnText && formik.errors.btnText && 'border-red-500'
              )}
              placeholder="Enter button text"
            />
            {formik.touched.btnText && formik.errors.btnText && (
              <p className="text-sm text-red-500">{formik.errors.btnText}</p>
            )}
          </div>

          {/* Features Section - Fixed with getFieldMeta */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Features</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  formik.setFieldValue('features', [
                    ...formik.values.features,
                    { title: '', description: '', icon: 'fa-solid fa-gears' }
                  ]);
                }}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Feature
              </Button>
            </div>

            {formik.values.features.map((feature, index) => {
              // Get field meta for each field
              const titleMeta = formik.getFieldMeta(`features.${index}.title`);
              const descriptionMeta = formik.getFieldMeta(`features.${index}.description`);
              const iconMeta = formik.getFieldMeta(`features.${index}.icon`);

              return (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-3 relative   transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (formik.values.features.length > 1) {
                        const newFeatures = formik.values.features.filter((_, i) => i !== index);
                        formik.setFieldValue('features', newFeatures);
                      } else {
                        formik.setFieldError('features', 'At least one feature is required');
                      }
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="space-y-2">
                    <Label htmlFor={`features.${index}.title`}>
                      Feature {index + 1} Title
                    </Label>
                    <Input
                      id={`features.${index}.title`}
                      name={`features.${index}.title`}
                      value={feature.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn(
                        titleMeta.touched && titleMeta.error && 'border-red-500'
                      )}
                      placeholder="Enter feature title"
                    />
                    {titleMeta.touched && titleMeta.error && (
                      <p className="text-sm text-red-500">{titleMeta.error}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`features.${index}.description`}>
                      Description
                    </Label>
                    <Textarea
                      id={`features.${index}.description`}
                      name={`features.${index}.description`}
                      value={feature.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      rows={2}
                      className={cn(
                        descriptionMeta.touched && descriptionMeta.error && 'border-red-500'
                      )}
                      placeholder="Enter feature description"
                    />
                    {descriptionMeta.touched && descriptionMeta.error && (
                      <p className="text-sm text-red-500">{descriptionMeta.error}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`features.${index}.icon`}>Icon</Label>
                    <div className="relative">
                      <Input
                        id={`features.${index}.icon`}
                        name={`features.${index}.icon`}
                        value={feature.icon}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        list={`icon-list-feature-${index}`}
                        className={cn(
                          "font-mono",
                          iconMeta.touched && iconMeta.error && 'border-red-500'
                        )}
                        placeholder="Type icon class name (e.g., fa-solid fa-gears)"
                      />
                      <datalist id={`icon-list-feature-${index}`}>
                        {ICON_OPTIONS.map((icon) => (
                          <option key={icon.value} value={icon.value}>
                            {icon.label}
                          </option>
                        ))}
                      </datalist>
                    </div>
                    <p className="text-xs text-gray-400">
                      Type icon class name or select from suggestions
                    </p>
                    {iconMeta.touched && iconMeta.error && (
                      <p className="text-sm text-red-500">{iconMeta.error}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {formik.touched.features && formik.errors.features && typeof formik.errors.features === 'string' && (
              <p className="text-sm text-red-500">{formik.errors.features}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || formik.isSubmitting}>
              {formik.isSubmitting || loading ? (
                <>
                  <span className="mr-2">⏳</span>
                  {editData ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>{editData ? 'Update' : 'Create'}</>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}