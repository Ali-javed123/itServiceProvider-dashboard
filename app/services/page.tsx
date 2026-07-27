

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