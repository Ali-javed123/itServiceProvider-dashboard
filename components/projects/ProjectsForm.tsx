"use client"

import React, { useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Trash2 } from 'lucide-react';
import { Plus } from 'lucide-react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Pencil, AlertCircle } from 'lucide-react';
import { Project } from '@/types/projects.type';
import { ProjectsForm as  ProjectsType} from "./ProjectsForm";
import { fi } from 'zod/v4/locales';

interface ProjectFormProps {
  initialValues: Project;
  isSubmitting: boolean;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
  setImage:(preview: File | null) => void;
  image:any;
  onSubmit: (values: any) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
  mode: 'create' | 'edit';
  currentImageUrl?: string;
  data:any
  selectedData:any
}

const SkillSchema = z.object({
  skills: z.string().min(1, 'skill is required!'),
  
});
const linkSchema = z.object({

    link: z.string().min(1, 'link is required!'),
    btnText: z.string().min(1, 'btnText is required!'),

});

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(2, 'description must be at least 2 characters'),
  image: z.any().optional(),
  skills:z.array(SkillSchema).min(1, 'At least one skill is required'),
  link:z.array(linkSchema).min(1, 'At least one link is required')
});

export const ProjectsForm = ({initialValues,isSubmitting,imagePreview,setImagePreview,onSubmit,onCancel,submitLabel,mode,currentImageUrl,setImage, data,selectedData}:ProjectFormProps) => {


console.log("imagePreview",imagePreview)

    const fileInputRef=useRef<HTMLInputElement>(null)


    const handleRemoveImage = (setFieldValue: any) => {
    setFieldValue('image', null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div>
<Formik
 initialValues={initialValues}
validationSchema={toFormikValidationSchema(projectSchema)}
onSubmit={onSubmit}
enableReinitialize={mode === 'edit'}
>
 {({ setFieldValue, values, errors, touched, handleSubmit }) => (
console.log("Formik errors:", errors),
console.log("Formik value:", errors),

        <Form onSubmit={handleSubmit}>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                            <Field
                             type="text"
                              name="title"
                              placeholder="Enter team member's full name"
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                               />
                                {errors.title && touched.title && (
                                 <p className="text-sm text-red-500">{errors.title}</p>
                                 )}
                                    </div>
                           <div className="space-y-2">
                          <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                            <Field
                             type="text"
                              name="description"
                              placeholder="Enter team member's full name"
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                               />
                                {errors.description && touched.description && (
                                 <p className="text-sm text-red-500">{errors.description}</p>
                                 )}
                                    </div>
                                     {/* Features */}
          <div className="space-y-4">
  <Label>
    Skills <span className="text-red-500">*</span>
  </Label>

  <FieldArray name="skills">
    {({ push, remove }) => (
      <div className="space-y-4">
        {values.skills.map((skill: { skills: string }, index: number) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
          >
            <div className="flex-1 space-y-2">
              <Field
                type="text"
                name={`skills.${index}.skills`}
                placeholder="Enter your skill"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {values.skills.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => push({ skills: "" })}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>
    )}
  </FieldArray>

  {errors.skills && touched.skills && (
    <p className="text-sm text-red-500">
      {typeof errors.skills === "string"
        ? errors.skills
        : "Please add at least one skill"}
    </p>
  )}
</div>
            <div className="space-y-4">
            <Label>Project Link <span className="text-red-500">*</span></Label>
           <FieldArray name="link">
  {({ push, remove }) => (
    <div className="space-y-4">
      {values.link.map((item: any, index: number) => (
        <div
          key={index}
          className="relative rounded-xl border border-gray-200 bg-gray-50/50 p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/50"
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                Project Link {index + 1}
              </h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Add a URL and button text for your project
              </p>
            </div>

            {values.link.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Project URL */}
            <div className="space-y-2">
              <label
                htmlFor={`link.${index}.link`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Project URL
              </label>

              <Field
                id={`link.${index}.link`}
                type="url"
                name={`link.${index}.link`}
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>

            {/* Button Text */}
            <div className="space-y-2">
              <label
                htmlFor={`link.${index}.btnText`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Button Text
              </label>

              <Field
                id={`link.${index}.btnText`}
                type="text"
                name={`link.${index}.btnText`}
                placeholder="Live Demo"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Link Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => push({ link: "", btnText: "" })}
        className="w-full rounded-lg border-dashed py-6 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/30"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Project Link
      </Button>
    </div>
  )}
</FieldArray>
            {/* FIXED: Check if errors.featured is a string before rendering */}
{errors.link && touched.link && (
  <p className="text-sm text-red-500">
    {typeof errors.link === 'string' 
      ? errors.link 
      : 'Please add at least one link'}
  </p>
)}
          </div>
          <div className="space-y-3">
                        <Label htmlFor="image" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Profile Image {mode === 'edit' && <span className="text-xs text-gray-400 font-normal">(Leave empty to keep current)</span>}
                        </Label>
          
                        <input
                          ref={fileInputRef}
                          type="file"
                          name="image"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            if (file) {
                              setFieldValue('image', file);
                              setImage(file)
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setImagePreview(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
          
                        <div
                          className={`
                            relative border-2 border-dashed rounded-xl transition-all duration-200
                            ${imagePreview || currentImageUrl
                              ? 'border-blue-400 bg-blue-50/30 dark:bg-blue-900/10'
                              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/20 dark:hover:bg-blue-900/5'
                            }
                          `}
                        >
                        {(imagePreview || selectedData || currentImageUrl) ? (

                            <div className="relative p-4">
                              <div className="relative w-full max-w-[200px] mx-auto aspect-square rounded-lg overflow-hidden shadow-md">
                                <img
                                  src={selectedData?.image?.url || imagePreview || currentImageUrl}
                                  alt="Team member preview"
                                  className="w-full h-full object-cover"
                                />
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
                                JPEG, PNG, WebP (Max 5MB)
                              </p>
                            </div>
                          )}
                        </div>
          
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
          
                        {errors.image && touched.image && (
                          <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/10 px-3 py-2 rounded-lg">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.image as string}</span>
                          </div>
                        )}
                      </div>
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
)}
</Formik>

    </div>
  )
}
