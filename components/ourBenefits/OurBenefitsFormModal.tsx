// components/our-benefits/OurBenefitsFormModal.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ourBenefitsFormSchema, OurBenefitsFormData } from '@/validation/ourBenefits.validation';
import { OurBenefits } from '../../types/benefit.types';
import { useOurBenefits } from '@/lib/hooks/useOurBenefits';
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
import { Plus, Trash2, X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editData?: OurBenefits | null;
  onSuccess?: () => void;
}

export function OurBenefitsFormModal({ isOpen, onClose, editData, onSuccess }: FormModalProps) {
  const { createItem, updateItem, loading } = useOurBenefits();

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // State for files and previews
  const [featuredItems, setFeaturedItems] = useState<
    { image: File | null; preview: string | null }[]
  >([]);
  console.log("featuredItem",featuredItems)

  // Reset state when modal opens or editData changes
  useEffect(() => {
    if (editData) {
      const count = editData.featured?.length || 0;
      const items = editData.featured.map(f => ({
        image: null,
        preview: f.image?.url || null,
      }));
      setFeaturedItems(items);
    } else {
      // Create mode: one empty feature
      setFeaturedItems([{ image: null, preview: null }]);
    }
  }, [editData, isOpen]);

  // Formik initialization
  const formik = useFormik<OurBenefitsFormData>({
    initialValues: {
      title: editData?.title || '',
      subHeading: editData?.subHeading || '',
      btnText: editData?.btnText || 'Learn More',
      featured: editData?.featured?.length
        ? editData.featured.map(f => ({
            heading: f.heading,
            description: f.description,
            icon: f.icon,
            existingImageUrl: f.image?.url || '',
            existingPublicId: f.image?.public_id || '',
          }))
        : [{ heading: '', description: '', icon: 'fa-solid fa-gears' }],
      list: editData?.list?.length
        ? editData.list.map(l => ({ list: l.list }))
        : [{ list: '' }],
    },
    validationSchema: toFormikValidationSchema(ourBenefitsFormSchema),
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('subHeading', values.subHeading);
        formData.append('btnText', values.btnText);

        // Build featured payload
        const featuredPayload = values.featured.map((f, index) => {
          const { existingImageUrl, existingPublicId, ...rest } = f;
          
          // If there is a new file, don't include existing image data
          if (featuredItems[index]?.image) {
            return { ...rest };
          }
          
          // Otherwise, keep the existing image data
          return {
            ...rest,
            image: (existingImageUrl && existingPublicId)
              ? { url: existingImageUrl, public_id: existingPublicId }
              : undefined,
          };
        });
        
        formData.append('featured', JSON.stringify(featuredPayload));
        formData.append('list', JSON.stringify(values.list.map(l => ({ list: l.list }))));

        // ✅ IMPORTANT: Append all files with the correct field name 'featuredImages'
        // The backend expects this exact field name for multiple files
        featuredItems.forEach((item, index) => {
  if (item.image instanceof File) {
    formData.append('image', item.image);
    console.log(`Appending file for index ${index}:`, item.image);
  }
});

        // Log FormData contents for debugging
        console.log('FormData entries:');
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        let result;
        if (editData?._id) {
          result = await updateItem(editData._id, formData);
        } else {
          result = await createItem(formData);
        }
        
        if (result) {
          onClose();
          onSuccess?.();
        }
      } catch (error) {
        console.warn('Submit error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      formik.setFieldError(`featured.${index}.imageFile`, 'Invalid file type');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      formik.setFieldError(`featured.${index}.imageFile`, 'File too large (max 5MB)');
      return;
    }

    // Revoke old preview URL if it exists and is a blob
    const oldPreview = featuredItems[index]?.preview;
    if (oldPreview && oldPreview.startsWith('blob:')) {
      URL.revokeObjectURL(oldPreview);
    }

    // Update featuredItems state
    setFeaturedItems(prev => {
      const newItems = [...prev];
      newItems[index] = {
        image: file,
        preview: URL.createObjectURL(file),
      };
      return newItems;
    });

    // Clear existing image info so backend uses new file
    formik.setFieldValue(`featured.${index}.existingImageUrl`, '');
    formik.setFieldValue(`featured.${index}.existingPublicId`, '');
  };

  // Remove image
  const removeImage = (index: number) => {
    const item = featuredItems[index];
    if (item?.preview && item.preview.startsWith('blob:')) {
      URL.revokeObjectURL(item.preview);
    }
    setFeaturedItems(prev => {
      const newItems = [...prev];
      newItems[index] = { image: null, preview: null };
      return newItems;
    });
    formik.setFieldValue(`featured.${index}.existingImageUrl`, '');
    formik.setFieldValue(`featured.${index}.existingPublicId`, '');
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = '';
    }
  };

  // Get display URL (preview from state if exists, else existing from formik)
  const getImageDisplayUrl = (index: number) => {
    const preview = featuredItems[index]?.preview;
    if (preview) return preview;
    return formik.values.featured[index]?.existingImageUrl || null;
  };

  // Helper for form errors
  const getFieldError = (field: string) => {
    const meta = formik.getFieldMeta(field);
    return meta.touched && meta.error ? meta.error : undefined;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit Benefit Section' : 'Create Benefit Section'}</DialogTitle>
          <DialogDescription>Fill in the details to {editData ? 'update' : 'create'} the section.</DialogDescription>
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
              className={cn(formik.touched.title && formik.errors.title && 'border-red-500')}
              placeholder="Enter section title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-sm text-red-500">{formik.errors.title}</p>
            )}
          </div>

          {/* Sub Heading */}
          <div className="space-y-2">
            <Label htmlFor="subHeading">Sub Heading</Label>
            <Input
              id="subHeading"
              name="subHeading"
              value={formik.values.subHeading}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={cn(formik.touched.subHeading && formik.errors.subHeading && 'border-red-500')}
              placeholder="Enter sub heading"
            />
            {formik.touched.subHeading && formik.errors.subHeading && (
              <p className="text-sm text-red-500">{formik.errors.subHeading}</p>
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
              className={cn(formik.touched.btnText && formik.errors.btnText && 'border-red-500')}
              placeholder="Enter button text"
            />
            {formik.touched.btnText && formik.errors.btnText && (
              <p className="text-sm text-red-500">{formik.errors.btnText}</p>
            )}
          </div>

          {/* Featured Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Featured Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  formik.setFieldValue('featured', [
                    ...formik.values.featured,
                    { heading: '', description: '', icon: 'fa-solid fa-gears' }
                  ]);
                  setFeaturedItems(prev => [...prev, { image: null, preview: null }]);
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Feature
              </Button>
            </div>

            {formik.values.featured.map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    if (formik.values.featured.length > 1) {
                      const newFeatured = formik.values.featured.filter((_, i) => i !== index);
                      formik.setFieldValue('featured', newFeatured);
                      // Remove corresponding featuredItems entry
                      setFeaturedItems(prev => {
                        const newItems = [...prev];
                        if (newItems[index]?.preview?.startsWith('blob:')) {
                          URL.revokeObjectURL(newItems[index].preview!);
                        }
                        newItems.splice(index, 1);
                        return newItems;
                      });
                    } else {
                      formik.setFieldError('featured', 'At least one featured item is required');
                    }
                  }}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="space-y-2">
                  <Label htmlFor={`featured.${index}.heading`}>Heading</Label>
                  <Input
                    id={`featured.${index}.heading`}
                    name={`featured.${index}.heading`}
                    value={feature.heading}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(getFieldError(`featured.${index}.heading`) && 'border-red-500')}
                    placeholder="Feature heading"
                  />
                  {getFieldError(`featured.${index}.heading`) && (
                    <p className="text-sm text-red-500">{getFieldError(`featured.${index}.heading`)}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`featured.${index}.description`}>Description</Label>
                  <Textarea
                    id={`featured.${index}.description`}
                    name={`featured.${index}.description`}
                    value={feature.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={2}
                    className={cn(getFieldError(`featured.${index}.description`) && 'border-red-500')}
                    placeholder="Feature description"
                  />
                  {getFieldError(`featured.${index}.description`) && (
                    <p className="text-sm text-red-500">{getFieldError(`featured.${index}.description`)}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`featured.${index}.icon`}>Icon</Label>
                  <div className="relative">
                    <Input
                      id={`featured.${index}.icon`}
                      name={`featured.${index}.icon`}
                      value={feature.icon}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      list={`icon-list-feature-${index}`}
                      className={cn('font-mono', getFieldError(`featured.${index}.icon`) && 'border-red-500')}
                      placeholder="Icon class (e.g., fa-solid fa-gears)"
                    />
                    <datalist id={`icon-list-feature-${index}`}>
                      {ICON_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </datalist>
                  </div>
                  {getFieldError(`featured.${index}.icon`) && (
                    <p className="text-sm text-red-500">{getFieldError(`featured.${index}.icon`)}</p>
                  )}
                </div>

                {/* Image upload */}
                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className={cn(
                    "relative border-2 border-dashed rounded-xl p-4 transition-all duration-200",
                    "hover:border-primary/70 hover:bg-primary/5",
                    getFieldError(`featured.${index}.imageFile`) && 'border-red-500 bg-red-50'
                  )}>
                    {getImageDisplayUrl(index) ? (
                      <div className="relative group">
                        <img
                          src={getImageDisplayUrl(index)!}
                          alt={`Feature ${index+1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Upload className="w-8 h-8 text-primary/70 mb-3" />
                        <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                        <p className="text-xs text-gray-400">JPEG, PNG, WebP (Max 5MB)</p>
                      </div>
                    )}
                    <input
                      ref={el => { fileInputRefs.current[index] = el; }}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleImageChange(e, index)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  {getFieldError(`featured.${index}.imageFile`) && (
                    <p className="text-sm text-red-500">{getFieldError(`featured.${index}.imageFile`)}</p>
                  )}
                </div>
              </div>
            ))}
            {formik.touched.featured && typeof formik.errors.featured === 'string' && (
              <p className="text-sm text-red-500">{formik.errors.featured}</p>
            )}
          </div>

          {/* List Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>List Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  formik.setFieldValue('list', [...formik.values.list, { list: '' }]);
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> Add Item
              </Button>
            </div>
            {formik.values.list.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1 space-y-2">
                  <Input
                    name={`list.${index}.list`}
                    value={item.list}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={cn(getFieldError(`list.${index}.list`) && 'border-red-500')}
                    placeholder="List item text"
                  />
                  {getFieldError(`list.${index}.list`) && (
                    <p className="text-sm text-red-500">{getFieldError(`list.${index}.list`)}</p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (formik.values.list.length > 1) {
                      const newList = formik.values.list.filter((_, i) => i !== index);
                      formik.setFieldValue('list', newList);
                    } else {
                      formik.setFieldError('list', 'At least one list item is required');
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            {formik.touched.list && typeof formik.errors.list === 'string' && (
              <p className="text-sm text-red-500">{formik.errors.list}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading || formik.isSubmitting}>
              {formik.isSubmitting || loading ? (
                <>{editData ? 'Updating...' : 'Creating...'}</>
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