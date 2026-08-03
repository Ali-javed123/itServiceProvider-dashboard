// app/admin/why-choose-us/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useWhyChooseUsManagement } from '@/lib/hooks/useWhyChooseUs';
import { CreateChooseUsDialog } from '@/components/whyChooseUs/CreateChooseUsDialog';
import { EditChooseUsDialog } from '@/components/whyChooseUs/EditChooseUsDialog';
import { SectionCard } from '@/components/whyChooseUs/SectionCard';
import { IChooseUs } from '@/types/whyChooseUs.types';

const WhyChooseUsPage = () => {
  const {
    sections,
    loading,
    isSubmitting,
    fetchError,
    fetchSections,
    createSection,
    updateSection,
    deleteSection,
  } = useWhyChooseUsManagement();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<IChooseUs | null>(null);

  const handleCreateSection = async (values: any) => {
    const success = await createSection(values);
    if (success) setIsCreateDialogOpen(false);
  };

  const handleUpdateSection = async (id: string, values: any) => {
    const success = await updateSection(id, values);
    if (success) {
      setIsEditDialogOpen(false);
      setEditingSection(null);
    }
  };

  const handleEditClick = (section: IChooseUs) => {
    setEditingSection(section);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      await deleteSection(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading sections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Why Choose Us Sections
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your "Why Choose Us" sections
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Section
        </Button>
      </div>

      {/* Error Display */}
      {fetchError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">Error: {fetchError}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchSections()}
            className="mt-2"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Display sections or empty state */}
      {sections.length === 0 ? (
        <div className="text-center py-12 rounded-lg">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4">No sections found</p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create First Section
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map((section) => (
            <SectionCard
              key={section._id}
              section={section}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <CreateChooseUsDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        isSubmitting={isSubmitting}
        onCreateSection={handleCreateSection}
      />

      {/* Edit Dialog */}
      <EditChooseUsDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        section={editingSection}
        isSubmitting={isSubmitting}
        onUpdateSection={handleUpdateSection}
      />
    </div>
  );
};

export default WhyChooseUsPage;