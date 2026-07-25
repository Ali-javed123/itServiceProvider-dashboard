// "use client"
// import React, { useEffect, useState } from 'react'
// import { useApi } from '@/lib/useApi'
// import { api } from '@/lib/api'
// import { Button } from '@/components/ui/button'
// import { Formik, Form, Field } from 'formik'
// import { z } from 'zod'
// import { toFormikValidationSchema } from 'zod-formik-adapter'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { toast } from 'sonner'
// import { FaEdit, FaTrash } from 'react-icons/fa'

// // ==================== TYPES ====================

// interface Service {
//   _id: string;
//   category: string;
//   title: string;
//   slug: string;
//   description: string;
//   icon: string;
//   image: {
//     url: string;
//     public_id: string;
//   };
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface CategoryItem {
//   _id: string;
//   serviceCategory: string;
//   slug: string;
//   services: Service[];
//   createdAt: string;
//   updatedAt: string;
// }

// interface CategoryResponse {
//   success: boolean;
//   message: string;
//   count: number;
//   data: CategoryItem[];
// }

// // ==================== ZOD VALIDATION SCHEMA ====================

// const serviceSchema = z.object({
//   title: z.string()
//     .min(3, 'Title must be at least 3 characters')
//     .max(100, 'Title must be less than 100 characters'),
  
//   description: z.string()
//     .min(10, 'Description must be at least 10 characters')
//     .max(500, 'Description must be less than 500 characters'),
  
//   category: z.string()
//     .min(1, 'Please select a category'),
  
//   icon: z.string()
//     .min(1, 'Please enter an icon class')
//     .regex(/^fa/, 'Icon must be a FontAwesome class (e.g., fa-solid fa-star)'),
  
//   image: z.instanceof(File)
//     .optional()
//     .refine(
//       (file) => !file || file.size <= 5 * 1024 * 1024,
//       'Image size must be less than 5MB'
//     )
//     .refine(
//       (file) => !file || ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
//       'Only JPEG, PNG, WebP, and GIF images are allowed'
//     ),
// });

// type ServiceFormValues = z.infer<typeof serviceSchema>;

// // ==================== COMPONENT ====================

// const Page = () => {
//   const [categories, setCategories] = useState<CategoryItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [open, setOpen] = useState<boolean>(false);
//   const [editOpen, setEditOpen] = useState<boolean>(false);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [editingService, setEditingService] = useState<Service | null>(null);
//   const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  
//   // ✅ NEW: State for selected category filter - initially empty
//   const [selectedCategory, setSelectedCategory] = useState<string>('');

//   // ==================== API CALLS ====================

//   const getServiceCategory = async () => {
//     try {
//       const response = await api.get<CategoryResponse>('/service-category', {
//         headers: {
//           'Cache-Control': 'no-cache',
//           'Pragma': 'no-cache',
//           'Expires': '0',
//         }
//       });
      
//       const payload = response.data;
//       if (payload && payload.success && Array.isArray(payload.data)) {
//         setCategories(payload.data);
        
//         // ✅ Set first category as default when data loads
//         if (payload.data.length > 0) {
//           setSelectedCategory(payload.data[0]._id);
//         }
//       } else if (Array.isArray(payload)) {
//         setCategories(payload);
        
//         // ✅ Set first category as default when data loads
//         if (payload.length > 0) {
//           setSelectedCategory(payload[0]._id);
//         }
//       } else {
//         console.warn("⚠️ Unexpected data format:", payload);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching service categories:', error);
//       toast.error('Failed to load categories');
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ✅ CREATE SERVICE
//   const createService = async (values: ServiceFormValues) => {
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append('title', values.title);
//       formData.append('description', values.description);
//       formData.append('category', values.category);
//       formData.append('icon', values.icon);
      
//       if (values.image) {
//         formData.append('image', values.image);
//       }

//       const response: any = await api.post('/service', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.success) {
//         toast.success('Service created successfully!');
//         setOpen(false);
//         await getServiceCategory();
//         setImagePreview(null);
//       } else {
//         toast.error(response.message || 'Failed to create service');
//       }
//     } catch (error: any) {
//       console.error('Error creating service:', error);
//       toast.error(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ✅ UPDATE SERVICE
//   const updateService = async (id: string, values: ServiceFormValues) => {
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       formData.append('title', values.title);
//       formData.append('description', values.description);
//       formData.append('category', values.category);
//       formData.append('icon', values.icon);
      
//       if (values.image) {
//         formData.append('image', values.image);
//       }

//       const response: any = await api.put(`/service/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.success) {
//         toast.success('Service updated successfully!');
//         setEditOpen(false);
//         setEditingService(null);
//         setEditImagePreview(null);
//         await getServiceCategory();
//       } else {
//         toast.error(response.message || 'Failed to update service');
//       }
//     } catch (error: any) {
//       console.error('Error updating service:', error);
//       toast.error(error.response?.data?.message || 'Something went wrong');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ✅ DELETE SERVICE
//   const deleteService = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this service?')) return;
    
//     try {
//       const response: any = await api.delete(`/service/${id}`);
      
//       if (response.success) {
//         toast.success('Service deleted successfully!');
//         await getServiceCategory();
//       } else {
//         toast.error(response.message || 'Failed to delete service');
//       }
//     } catch (error: any) {
//       console.error('Error deleting service:', error);
//       toast.error(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   // ==================== INITIAL VALUES ====================

//   const initialValues: ServiceFormValues = {
//     title: '',
//     description: '',
//     category: '',
//     icon: '',
//     image: undefined,
//   };

//   const getEditInitialValues = (): ServiceFormValues => {
//     if (!editingService) return initialValues;
    
//     return {
//       title: editingService.title || '',
//       description: editingService.description || '',
//       category: editingService.category || '',
//       icon: editingService.icon || '',
//       image: undefined,
//     };
//   };

//   // ==================== EFFECTS ====================

//   useEffect(() => {
//     getServiceCategory();
//   }, []);

//   // ==================== FILTERED CATEGORIES ====================
  
//   // ✅ Filter categories based on selected category
//   const filteredCategories = selectedCategory 
//     ? categories.filter(cat => cat._id === selectedCategory)
//     : categories.length > 0 
//       ? [categories[0]] // ✅ Show first category by default if selectedCategory is empty
//       : [];

//   // ✅ Get the selected category name for display
//   const getSelectedCategoryName = () => {
//     if (!selectedCategory && categories.length > 0) {
//       return categories[0]?.serviceCategory || '';
//     }
//     const category = categories.find(cat => cat._id === selectedCategory);
//     return category?.serviceCategory || '';
//   };

//   // ==================== RENDER ====================

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <p className="text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   if (categories.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
      
//       {/* ==================== CATEGORY FILTER DROPDOWN ==================== */}
//       <div className="mb-8 flex items-center gap-4 flex-wrap">
//         <Label htmlFor="categoryFilter" className="text-sm font-medium">
//           Filter by Category:
//         </Label>
//         <Select
//           value={selectedCategory || categories[0]?._id || ''}
//           onValueChange={(value:any) => setSelectedCategory(value)}
//         >
//           <SelectTrigger className="w-[250px]">
//             <SelectValue placeholder="Select a category" />
//           </SelectTrigger>
//           <SelectContent>
//             {categories.map((category) => (
//               <SelectItem key={category._id} value={category._id}>
//                 {category.serviceCategory}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
        
//         {/* ✅ Show current category name and service count */}
//         <span className="text-sm text-gray-500">
//           Showing: <strong>{getSelectedCategoryName()}</strong> 
//           {filteredCategories.length > 0 && filteredCategories[0]?.services && (
//             <span className="ml-2">
//               ({filteredCategories[0].services.length} services)
//             </span>
//           )}
//         </span>
//       </div>

//       {/* ==================== RENDER FILTERED CATEGORIES ==================== */}
//       {filteredCategories.map((category) => (
//         <div key={category._id} className="mb-12">
//           <div className="min-h-[20px] w-full flex justify-between items-center">
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {category.serviceCategory}
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Slug: {category.slug} | Services: {category.services?.length || 0}
//               </p>
//             </div>
//             <div className='mb-8'>
//               <Button 
//                 className='px-4 py-3 font-bold text-md' 
//                 onClick={() => setOpen(true)}
//               >
//                 Create Service
//               </Button>
//             </div>
//           </div>

//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {category?.services && category?.services?.length > 0 ? (
//               category.services.map((service: Service) => (
//                 <div
//                   key={service._id}
//                   className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-cyan-500/40 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500"
//                 >
//                   <div className="h-full rounded-2xl p-3 bg-white/90 dark:bg-[#0B1220]/90 backdrop-blur-xl shadow-lg dark:shadow-lg hover:shadow-2xl transition-all">
                    
//                     <div className="mb-4 h-48 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
//                       <img
//                         src={service.image?.url || 'https://images.ctfassets.net/wowgx05xsdrr/5Gy0HRFtGJkW5GapIiCk8N/24a26fae1eac4c7e2b786b7e209c5779/article-thumbnail-person-multi-region-checkout-product-catalog-gradient-sunset-bigcommerce.png?fm=webp&w=3840&q=75'}
//                         alt={service.title}
//                         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                       />
//                     </div>

//                     <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition">
//                       <div className="flex items-center justify-center w-full h-full">
//                         <i className={service.icon}/>
//                       </div>
//                     </div>

//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                       {service.title || "Web Development"}
//                     </h3>

//                     <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 flex-1">
//                       {service.description || 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur, illum.'}
//                     </p>

//                     <div className="mt-auto pt-4 flex gap-2 justify-end">
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           setEditingService(service);
//                           setEditImagePreview(service.image?.url || null);
//                           setEditOpen(true);
//                         }}
//                         className="flex items-center gap-1"
//                       >
//                         <FaEdit className="h-3 w-3" />
//                         Edit
//                       </Button>
//                       <Button
//                         variant="destructive"
//                         size="sm"
//                         onClick={() => deleteService(service._id)}
//                         className="flex items-center gap-1"
//                       >
//                         <FaTrash className="h-3 w-3" />
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 col-span-full">No services in this category</p>
//             )}
//           </div>
//         </div>
//       ))}

//       {/* ==================== CREATE DIALOG ==================== */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={toFormikValidationSchema(serviceSchema)}
//             onSubmit={createService}
//           >
//             {({ setFieldValue, values, errors, touched, handleSubmit }) => (
//               <Form onSubmit={handleSubmit}>
//                 <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
//                   <DialogTitle>Create New Service</DialogTitle>
//                 </DialogHeader>

//                 <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4 space-y-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
//                     <Field name="category">
//                       {({ field, form }: any) => (
//                         <Select
//                           value={field.value}
//                           onValueChange={(value) => {
//                             setFieldValue('category', value);
//                           }}
//                         >
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select a category" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {categories.map((category) => (
//                               <SelectItem key={category._id} value={category._id}>
//                                 {category.serviceCategory}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       )}
//                     </Field>
//                     {errors.category && touched.category && (
//                       <p className="text-sm text-red-500">{errors.category}</p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
//                     <Field
//                       type="text"
//                       name="title"
//                       placeholder="Enter service title"
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.title && touched.title && (
//                       <p className="text-sm text-red-500">{errors.title}</p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
//                     <Field
//                       as="textarea"
//                       name="description"
//                       placeholder="Enter service description"
//                       rows={4}
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.description && touched.description && (
//                       <p className="text-sm text-red-500">{errors.description}</p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="icon">Icon Class <span className="text-red-500">*</span></Label>
//                     <div className="relative">
//                       <Field
//                         type="text"
//                         name="icon"
//                         placeholder="e.g., fa-solid fa-cart-shopping"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       {values.icon && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                           <i className={`${values.icon} text-2xl text-blue-500`} />
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Enter FontAwesome class name (e.g., fa-solid fa-cart-shopping)
//                     </p>
//                     {errors.icon && touched.icon && (
//                       <p className="text-sm text-red-500">{errors.icon}</p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="image">Service Image</Label>
//                     <div className="flex items-center gap-4">
//                       <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={(event) => {
//                           const file = event.currentTarget.files?.[0];
//                           if (file) {
//                             setFieldValue('image', file);
//                             const reader = new FileReader();
//                             reader.onloadend = () => {
//                               setImagePreview(reader.result as string);
//                             };
//                             reader.readAsDataURL(file);
//                           }
//                         }}
//                         className="flex-1"
//                       />
//                       {imagePreview && (
//                         <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
//                           <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500">Max size: 5MB. Supported: JPEG, PNG, WebP, GIF</p>
//                     {errors.image && touched.image && (
//                       <p className="text-sm text-red-500">{errors.image as string}</p>
//                     )}
//                   </div>
//                 </div>

//                 <DialogFooter className="sticky bottom-0 z-10 bg-background border-t px-6 py-4">
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     onClick={() => {
//                       setOpen(false);
//                       setImagePreview(null);
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={isSubmitting}>
//                     {isSubmitting ? 'Creating...' : 'Create Service'}
//                   </Button>
//                 </DialogFooter>
//               </Form>
//             )}
//           </Formik>
//         </DialogContent>
//       </Dialog>

//       {/* ==================== EDIT DIALOG ==================== */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
//           <Formik
//             key={editingService?._id || 'edit'}
//             initialValues={getEditInitialValues()}
//             validationSchema={toFormikValidationSchema(serviceSchema)}
//             onSubmit={(values) => {
//               if (editingService) {
//                 updateService(editingService._id, values);
//               }
//             }}
//           >
//             {({ setFieldValue, values, errors, touched, handleSubmit }) => (
//               <Form onSubmit={handleSubmit}>
//                 <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
//                   <DialogTitle>Edit Service</DialogTitle>
//                 </DialogHeader>

//                 <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4 space-y-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
//                     <Field name="category">
//                       {({ field, form }: any) => (
//                         <Select
//                           value={field.value}
//                           onValueChange={(value) => {
//                             setFieldValue('category', value);
//                           }}
//                         >
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select a category" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {categories.map((category) => (
//                               <SelectItem key={category._id} value={category._id}>
//                                 {category.serviceCategory}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       )}
//                     </Field>
//                     {errors.category && touched.category && (
//                       <p className="text-sm text-red-500">{errors.category}</p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
//                     <Field
//                       type="text"
//                       name="title"
//                       placeholder="Enter service title"
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.title && touched.title && (
//                       <p className="text-sm text-red-500">{errors.title}</p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
//                     <Field
//                       as="textarea"
//                       name="description"
//                       placeholder="Enter service description"
//                       rows={4}
//                       className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {errors.description && touched.description && (
//                       <p className="text-sm text-red-500">{errors.description}</p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="icon">Icon Class <span className="text-red-500">*</span></Label>
//                     <div className="relative">
//                       <Field
//                         type="text"
//                         name="icon"
//                         placeholder="e.g., fa-solid fa-cart-shopping"
//                         className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       {values.icon && (
//                         <div className="absolute right-3 top-1/2 -translate-y-1/2">
//                           <i className={`${values.icon} text-2xl text-blue-500`} />
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Enter FontAwesome class name (e.g., fa-solid fa-cart-shopping)
//                     </p>
//                     {errors.icon && touched.icon && (
//                       <p className="text-sm text-red-500">{errors.icon}</p>
//                     )}
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="image">Service Image</Label>
//                     <div className="flex items-center gap-4">
//                       <input
//                         type="file"
//                         name="image"
//                         accept="image/*"
//                         onChange={(event) => {
//                           const file = event.currentTarget.files?.[0];
//                           if (file) {
//                             setFieldValue('image', file);
//                             const reader = new FileReader();
//                             reader.onloadend = () => {
//                               setEditImagePreview(reader.result as string);
//                             };
//                             reader.readAsDataURL(file);
//                           }
//                         }}
//                         className="flex-1"
//                       />
//                       {editImagePreview && (
//                         <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
//                           <img src={editImagePreview} alt="Preview" className="w-full h-full object-cover" />
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       Leave empty to keep current image. Max size: 5MB
//                     </p>
//                     {errors.image && touched.image && (
//                       <p className="text-sm text-red-500">{errors.image as string}</p>
//                     )}
//                   </div>
//                 </div>

//                 <DialogFooter className="sticky bottom-0 z-10 bg-background border-t px-6 py-4">
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     onClick={() => {
//                       setEditOpen(false);
//                       setEditingService(null);
//                       setEditImagePreview(null);
//                     }}
//                   >
//                     Cancel
//                   </Button>
//                   <Button type="submit" disabled={isSubmitting}>
//                     {isSubmitting ? 'Updating...' : 'Update Service'}
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

// export default Page;





"use client"
import React, { useState } from 'react';
import { useServiceManagement } from '@/lib/hooks/useServiceManagement';
import { CategoryFilter } from '@/components/service/CategoryFilter';
import { ServiceList } from '@/components/service/ServiceList';
import { CreateServiceDialog } from '@/components/service/CreateServiceDialog';
import { EditServiceDialog } from '@/components/service/EditServiceDialog';
import { Service } from '@/types/service.types';

const Page = () => {
  const {
    categories,
    loading,
    isSubmitting,
    selectedCategory,
    setSelectedCategory,
    createService,
    updateService,
    deleteService,
  } = useServiceManagement();

  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Handlers
  const handleCreateService = async (values: any) => {
    const success = await createService(values);
    if (success) setIsCreateDialogOpen(false);
    // match expected signature: return void / Promise<void>
    return;
  };

  const handleUpdateService = async (id: string, values: any) => {
    const success = await updateService(id, values);
    if (success) {
      setIsEditDialogOpen(false);
      setEditingService(null);
    }
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    await deleteService(id);
  };

  const handleCategoryChange = (value: string | null) => {
    setSelectedCategory(value ?? '');
  };

  const handleCreateDialogOpenChange = (open: boolean) => {
    setIsCreateDialogOpen(open);
    if (!open) {
      // Optional: Reset any state if needed
    }
  };

  const handleEditDialogOpenChange = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      setEditingService(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading services...</p>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
          <p className="text-sm text-gray-400 mt-2">Please create a category first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Service Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your services across different categories
        </p>
      </div>
      
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Service List */}
      <ServiceList
        categories={categories}
        selectedCategory={selectedCategory}
        onCreateClick={() => setIsCreateDialogOpen(true)}
        onEditService={handleEditClick}
        onDeleteService={handleDeleteClick}
      />

      {/* Create Dialog */}
      <CreateServiceDialog
        open={isCreateDialogOpen}
        onOpenChange={handleCreateDialogOpenChange}
        categories={categories}
        isSubmitting={isSubmitting}
        onCreateService={handleCreateService}
      />

      {/* Edit Dialog */}
      <EditServiceDialog
        open={isEditDialogOpen}
        onOpenChange={handleEditDialogOpenChange}
        service={editingService}
        categories={categories}
        isSubmitting={isSubmitting}
        onUpdateService={handleUpdateService}
      />
    </div>
  );
};

export default Page;