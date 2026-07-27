// // app/(admin)/service-categories/page.tsx
// 'use client'

// import React, { useState, useCallback, useRef, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
// import { Formik, Form, Field } from 'formik'
// import { toFormikValidationSchema } from 'zod-formik-adapter'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { toast } from 'sonner'
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
// import { api } from '@/lib/api'
// import { serviceCategorySchema } from '@/lib/validations/serviceCategoryValidation'
// import type { ServiceCategoryFormValues } from '../../types/serviceCategory'

// // ==================== TYPES ====================
// interface ServiceCategory {
//   _id: string;
//   serviceCategory: string;
//   slug: string;
//   services: any[];
//   createdAt: string;
//   updatedAt: string;
// }

// interface CategoryResponse {
//   success: boolean;
//   data: ServiceCategory[];
//   message?: string;
// }

// interface SingleCategoryResponse {
//   success: boolean;
//   data: ServiceCategory;
//   message?: string;
// }

// // ==================== COMPONENT ====================
// const Page = () => {
//   // State
//   const [categories, setCategories] = useState<ServiceCategory[]>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)
//   const [open, setOpen] = useState<boolean>(false)
//   const [editOpen, setEditOpen] = useState<boolean>(false)
//   const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null)
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
//   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  
//   // Ref to prevent double submissions
//   const isSubmittingRef = useRef<boolean>(false)

//   // ==================== API CALLS ====================
  
//   // GET all categories
//   const fetchCategories = useCallback(async () => {
//     try {
//       setLoading(true)
//       setError(null)
      
//       const response = await api.get<CategoryResponse>('/service-category', {
//         headers: {
//           'Cache-Control': 'no-cache',
//           'Pragma': 'no-cache',
//           'Expires': '0',
//         }
//       })
      
//       const payload = response.data
//       if (payload && payload.success && Array.isArray(payload.data)) {
//         setCategories(payload.data)
//       } else if (Array.isArray(payload)) {
//         setCategories(payload)
//       } else {
//         setCategories([])
//         console.warn('⚠️ Unexpected data format:', payload)
//       }
//     } catch (err: any) {
//       console.error('❌ Error fetching categories:', err)
//       setError(err.message || 'Failed to load categories')
//       toast.error('Failed to load categories')
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   // CREATE category
//   const createCategory = useCallback(async (values: ServiceCategoryFormValues) => {
//     // ✅ Prevent multiple submissions
//     if (isSubmittingRef.current || isButtonDisabled) {
//       console.log('⛔ Submission already in progress')
//       return
//     }
    
//     isSubmittingRef.current = true
//     setIsButtonDisabled(true)
//     setIsSubmitting(true)
    
//     try {
//       const response = await api.post<SingleCategoryResponse>('/service-category', values)
//       const payload = response.data
      
//       if (payload && payload.success && payload.data) {
//         toast.success(`Category "${payload.data.serviceCategory}" created successfully!`)
//         setOpen(false)
//         // ✅ Refresh categories after create
//         await fetchCategories()
//       } else {
//         toast.error(payload.message || 'Failed to create category')
//       }
//     } catch (err: any) {
//       console.error('❌ Error creating category:', err)
//       toast.error(err.response?.data?.message || 'Failed to create category')
//     } finally {
//       setIsSubmitting(false)
//       setTimeout(() => {
//         isSubmittingRef.current = false
//         setIsButtonDisabled(false)
//       }, 500)
//     }
//   }, [fetchCategories, isButtonDisabled])

//   // UPDATE category
//   const updateCategory = useCallback(async (id: string, values: ServiceCategoryFormValues) => {
//     if (!id) return
    
//     // ✅ Prevent multiple submissions
//     if (isSubmittingRef.current || isButtonDisabled) {
//       console.log('⛔ Submission already in progress')
//       return
//     }
    
//     isSubmittingRef.current = true
//     setIsButtonDisabled(true)
//     setIsSubmitting(true)
    
//     try {
//       const response = await api.put<SingleCategoryResponse>(`/service-category/${id}`, values)
//       const payload = response.data
      
//       if (payload && payload.success && payload.data) {
//         toast.success(`Category "${payload.data.serviceCategory}" updated successfully!`)
//         setEditOpen(false)
//         setEditingCategory(null)
//         // ✅ Refresh categories after update
//         await fetchCategories()
//       } else {
//         toast.error(payload.message || 'Failed to update category')
//       }
//     } catch (err: any) {
//       console.error('❌ Error updating category:', err)
//       toast.error(err.response?.data?.message || 'Failed to update category')
//     } finally {
//       setIsSubmitting(false)
//       setTimeout(() => {
//         isSubmittingRef.current = false
//         setIsButtonDisabled(false)
//       }, 500)
//     }
//   }, [fetchCategories, isButtonDisabled])

//   // DELETE category
//   const deleteCategory = useCallback(async (id: string, name: string) => {
//     if (!confirm(`Are you sure you want to delete category "${name}"?`)) return
    
//     // ✅ Prevent multiple submissions
//     if (isSubmittingRef.current || isButtonDisabled) {
//       console.log('⛔ Submission already in progress')
//       return
//     }
    
//     isSubmittingRef.current = true
//     setIsButtonDisabled(true)
    
//     try {
//       const response = await api.delete<{ success: boolean; message?: string }>(
//         `/service-category/${id}`
//       )
//       const payload = response.data
      
//       if (payload && payload.success) {
//         toast.success('Category deleted successfully!')
//         // ✅ Refresh categories after delete
//         await fetchCategories()
//       } else {
//         toast.error(payload.message || 'Failed to delete category')
//       }
//     } catch (err: any) {
//       console.error('❌ Error deleting category:', err)
//       toast.error(err.response?.data?.message || 'Failed to delete category')
//     } finally {
//       setTimeout(() => {
//         isSubmittingRef.current = false
//         setIsButtonDisabled(false)
//       }, 500)
//     }
//   }, [fetchCategories, isButtonDisabled])

//   // ==================== EFFECTS ====================
  
//   useEffect(() => {
//     fetchCategories()
//   }, [fetchCategories])

//   // ==================== HELPERS ====================
  
//   // Auto-generate slug from category name
//   const generateSlug = (name: string): string => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, '-')
//       .replace(/^-+|-+$/g, '')
//   }

//   // ==================== INITIAL VALUES ====================
  
//   const initialValues: ServiceCategoryFormValues = {
//     serviceCategory: '',
//     slug: '',
//   }

//   const getEditInitialValues = (): ServiceCategoryFormValues => {
//     if (!editingCategory) return initialValues
//     return {
//       serviceCategory: editingCategory.serviceCategory || '',
//       slug: editingCategory.slug || '',
//     }
//   }

//   // ==================== RENDER ====================

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="text-gray-500 mt-4">Loading categories...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px]">
//         <p className="text-red-500 text-lg">Error: {error}</p>
//         <Button 
//           variant="outline" 
//           onClick={fetchCategories}
//           className="mt-4"
//         >
//           Retry
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//             Service Categories
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mt-1">
//             Manage your service categories
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <Button
//             variant="outline"
//             onClick={fetchCategories}
//             disabled={isButtonDisabled}
//           >
//             🔄 Refresh
//           </Button>
//           <Button
//             onClick={() => setOpen(true)}
//             className="flex items-center gap-2"
//             disabled={isButtonDisabled}
//           >
//             <FaPlus className="h-4 w-4" />
//             Add Category
//           </Button>
//         </div>
//       </div>

//       {/* Categories Grid */}
//       {categories.length === 0 ? (
//         <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-50 dark:bg-gray-900 rounded-lg">
//           <p className="text-gray-500 dark:text-gray-400 text-lg">
//             No categories found
//           </p>
//           <Button
//             variant="outline"
//             onClick={() => setOpen(true)}
//             className="mt-4"
//             disabled={isButtonDisabled}
//           >
//             Create your first category
//           </Button>
//         </div>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {categories.map((category) => (
//             <div
//               key={category._id}
//               className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700"
//             >
//               {/* Category Info */}
//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   {category.serviceCategory}
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   Slug: {category.slug}
//                 </p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                   Services: {category.services?.length || 0}
//                 </p>
//                 <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
//                   Created: {new Date(category.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-2 justify-end mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => {
//                     setEditingCategory(category)
//                     setEditOpen(true)
//                   }}
//                   className="flex items-center gap-1"
//                   disabled={isButtonDisabled}
//                 >
//                   <FaEdit className="h-3 w-3" />
//                   Edit
//                 </Button>
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => deleteCategory(category._id, category.serviceCategory)}
//                   className="flex items-center gap-1"
//                   disabled={isButtonDisabled}
//                 >
//                   <FaTrash className="h-3 w-3" />
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Total Count */}
//       {categories.length > 0 && (
//         <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
//           Total Categories: {categories.length}
//         </div>
//       )}

//       {/* ==================== CREATE DIALOG ==================== */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-2xl">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={toFormikValidationSchema(serviceCategorySchema)}
//             onSubmit={createCategory}
//           >
//             {({ setFieldValue, values, errors, touched, handleSubmit }) => (
//               <Form onSubmit={handleSubmit}>
//                 <DialogHeader>
//                   <DialogTitle>Create New Category</DialogTitle>
//                 </DialogHeader>

//                 <div className="py-6 space-y-4">
//                   {/* Category Name */}
//                   <div className="space-y-2">
//                     <Label htmlFor="serviceCategory">
//                       Category Name <span className="text-red-500">*</span>
//                     </Label>
//                     <Field
//                       type="text"
//                       name="serviceCategory"
//                       placeholder="Enter category name"
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                         const value = e.target.value
//                         setFieldValue('serviceCategory', value)
//                         if (!values.slug) {
//                           setFieldValue('slug', generateSlug(value))
//                         }
//                       }}
//                     />
//                     {errors.serviceCategory && touched.serviceCategory && (
//                       <p className="text-sm text-red-500">{errors.serviceCategory}</p>
//                     )}
//                   </div>

//                   {/* Slug */}
//                   <div className="space-y-2">
//                     <Label htmlFor="slug">Slug</Label>
//                     <div className="flex gap-2">
//                       <Field
//                         type="text"
//                         name="slug"
//                         placeholder="auto-generated"
//                         className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           if (values.serviceCategory) {
//                             setFieldValue('slug', generateSlug(values.serviceCategory))
//                           }
//                         }}
//                       >
//                         Generate
//                       </Button>
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Leave empty to auto-generate from category name
//                     </p>
//                     {errors.slug && touched.slug && (
//                       <p className="text-sm text-red-500">{errors.slug}</p>
//                     )}
//                   </div>
//                 </div>

//                 <DialogFooter>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => {
//                       setOpen(false)
//                     }}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     type="submit" 
//                     disabled={isSubmitting || isButtonDisabled}
//                   >
//                     {isSubmitting ? 'Creating...' : 'Create Category'}
//                   </Button>
//                 </DialogFooter>
//               </Form>
//             )}
//           </Formik>
//         </DialogContent>
//       </Dialog>

//       {/* ==================== EDIT DIALOG ==================== */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent className="max-w-2xl">
//           <Formik
//             key={editingCategory?._id || 'edit'}
//             initialValues={getEditInitialValues()}
//             validationSchema={toFormikValidationSchema(serviceCategorySchema)}
//             onSubmit={(values) => {
//               if (editingCategory) {
//                 updateCategory(editingCategory._id, values)
//               }
//             }}
//           >
//             {({ setFieldValue, values, errors, touched, handleSubmit }) => (
//               <Form onSubmit={handleSubmit}>
//                 <DialogHeader>
//                   <DialogTitle>Edit Category</DialogTitle>
//                 </DialogHeader>

//                 <div className="py-6 space-y-4">
//                   {/* Category Name */}
//                   <div className="space-y-2">
//                     <Label htmlFor="serviceCategory">
//                       Category Name <span className="text-red-500">*</span>
//                     </Label>
//                     <Field
//                       type="text"
//                       name="serviceCategory"
//                       placeholder="Enter category name"
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                         const value = e.target.value
//                         setFieldValue('serviceCategory', value)
//                         if (!values.slug) {
//                           setFieldValue('slug', generateSlug(value))
//                         }
//                       }}
//                     />
//                     {errors.serviceCategory && touched.serviceCategory && (
//                       <p className="text-sm text-red-500">{errors.serviceCategory}</p>
//                     )}
//                   </div>

//                   {/* Slug */}
//                   <div className="space-y-2">
//                     <Label htmlFor="slug">Slug</Label>
//                     <div className="flex gap-2">
//                       <Field
//                         type="text"
//                         name="slug"
//                         placeholder="auto-generated"
//                         className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           if (values.serviceCategory) {
//                             setFieldValue('slug', generateSlug(values.serviceCategory))
//                           }
//                         }}
//                       >
//                         Generate
//                       </Button>
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Leave empty to auto-generate from category name
//                     </p>
//                     {errors.slug && touched.slug && (
//                       <p className="text-sm text-red-500">{errors.slug}</p>
//                     )}
//                   </div>
//                 </div>

//                 <DialogFooter>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => {
//                       setEditOpen(false)
//                       setEditingCategory(null)
//                     }}
//                     disabled={isSubmitting}
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     type="submit" 
//                     disabled={isSubmitting || isButtonDisabled}
//                   >
//                     {isSubmitting ? 'Updating...' : 'Update Category'}
//                   </Button>
//                 </DialogFooter>
//               </Form>
//             )}
//           </Formik>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

// export default Page

// app/(admin)/service-categories/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FaPlus } from 'react-icons/fa';

// Components
import { CategorySkeleton } from '@/components/servicesCategory/CategorySkeleton';
import { CategoryList } from '@/components/servicesCategory/CategoryList';
import { CreateCategoryDialog } from '@/components/servicesCategory/CreateCategoryDialog';
import { EditCategoryDialog } from '@/components/servicesCategory/EditCategoryDialog';

// Hooks
import { useCategories } from '../../lib/hooks/useServiceCategory';

// Types
import type { ServiceCategory,ServiceCategoryFormValues } from '../../types/serviceCategory';

// ==================== MAIN PAGE ====================
const Page = () => {
  // State from custom hook
  const {
    categories,
    loading,
    error,
    isSubmitting,
    isButtonDisabled,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();

  // Local state for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ==================== HANDLERS ====================
  const handleCreateCategory = async (values: ServiceCategoryFormValues) => {
    const result = await createCategory(values);
    if (result?.success) {
      setIsCreateDialogOpen(false);
    }
  };

  const handleUpdateCategory = async (values: ServiceCategoryFormValues) => {
    if (!editingCategory) return;
    const result = await updateCategory(editingCategory._id, values);
    if (result?.success) {
      setIsEditDialogOpen(false);
      setEditingCategory(null);
    }
  };
// ss
  const handleEditClick = (category: ServiceCategory) => {
    setEditingCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string, name: string) => {
    deleteCategory(id, name);
  };

  // ==================== RENDER ====================
  if (loading) return <CategorySkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-red-500 text-lg">Error: {error}</p>
        <Button 
          variant="outline" 
          onClick={fetchCategories}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Service Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your service categories
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={fetchCategories}
            disabled={isButtonDisabled}
          >
            🔄 Refresh
          </Button>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2"
            disabled={isButtonDisabled}
          >
            <FaPlus className="h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <CategoryList
        categories={categories}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        disabled={isButtonDisabled}
      />

      {/* Dialogs */}
      <CreateCategoryDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateCategory}
        isSubmitting={isSubmitting}
      />

      <EditCategoryDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        category={editingCategory}
        onSubmit={handleUpdateCategory}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Page;