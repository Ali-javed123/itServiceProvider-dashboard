"use client"
import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { ProjectService } from '@/utils/project.helper';
import { Project } from '@/types/projects.type';
import { api } from '@/lib/api';

export const useProject = () => {
    const [projects, setPorjcts] = useState<Project[]>([]);
    const [selectedBanner, setSelectedBanner] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
  


 const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ProjectService.getAll() as any;
      if (response?.success && response?.data) {
        if (response.data.length > 0) {
          setPorjcts(response.data as any);
          setSelectedBanner(response.data[0]);
        }
      } else {
        toast.error(response?.message || 'Failed to load banners');
      }
    } catch (error: any) {
      console.warn('❌ Error fetching banners:', error);
      toast.error(error?.message || 'Failed to load banners');
    } finally {
      setLoading(false);
    }
  }, []);


const createProjects = useCallback(
    async (values: FormData): Promise<boolean> => {

    setIsSubmitting(true);
console.log("valuess",values)
    try {
      const response = await ProjectService.create(values as any);

      if (response?.success) {
        toast.success("Project created successfully!");
        await fetchProjects();
        return true;
      }

      toast.error(response?.message || "Failed to create project");
      return false;

    } catch (error: any) {
      console.warn("Error creating project:", error);
      toast.error(error?.message || "Something went wrong");
      return false;

    } finally {
      setIsSubmitting(false);
    }
  },
  [fetchProjects]
);



const updateProject = useCallback(async (id: string, formData: FormData): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const response = await ProjectService.update(id, formData);
      if (response?.success) {
        toast.success('Project updated successfully!');
        await fetchProjects();
        return true;
      } else {
        toast.error(response?.message || 'Failed to update banner');
        return false;
      }
    } catch (error: any) {
      console.warn('Error updating banner:', error);
      toast.error(error?.message || 'Something went wrong');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [fetchProjects]);

 const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    if (!confirm('Are you sure you want to delete this banner?')) return false;
    
    try {
      const response = await ProjectService.delete(id);
      if (response?.success) {
        toast.success('Banner deleted successfully!');
        await fetchProjects();
        return true;
      } else {
        toast.error(response?.message || 'Failed to delete banner');
        return false;
      }
    } catch (error: any) {
      console.warn('Error deleting banner:', error);
      toast.error(error?.message || 'Something went wrong');
      return false;
    }
  }, [fetchProjects]);

// const createProjects = async ( values: any): Promise<boolean> => {
//     setIsSubmitting(true);
//     try {
      
//       // ✅ Append all text fields
      
      
//       // ✅ Append image only if new file is selected
      

//       // ✅ Log FormData entries
      

//       const response: any = await api.post(`/projects`, values, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.success) {
//         toast.success('Service updated successfully!');
//         // await getServiceCategory();
//         return true;
//       } else {
//         toast.error(response.message || 'Failed to update service');
//         return false;
//       }
//     } catch (error: any) {
//       console.warn('Error updating service:', error);
//       toast.error(error.response?.data?.message || 'Something went wrong');
//       return false;
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  return {
createProjects,
projects,
setPorjcts,
updateProject,
selectedBanner,
setSelectedBanner,
loading,
setLoading,
isSubmitting,
setIsSubmitting,
fetchProjects,
deleteProject
  }
}
