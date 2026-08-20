// // app/our-benefits/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useOurBenefits } from '@/lib/hooks/useOurBenefits';
// import { OurBenefitsList } from '@/components/ourBenefits/OurBenefitsList';
// import { OurBenefitsContent } from '@/components/ourBenefits/OurBenefitsContent';
// import { OurBenefitsFormModal } from '@/components/ourBenefits/OurBenefitsFormModal';
// import { OurBenefitsSkeleton } from '@/components/ourBenefits/OurBenefitsSkeleton';
// import { Button } from '@/components/ui/button';
// import { RefreshCw } from 'lucide-react';
// import { OurBenefits } from '@/types/benefit.types';

// export default function OurBenefitsPage() {
//   const { allItems, selectedItem, loading, fetchAll, deleteItem } = useOurBenefits();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState<OurBenefits | null>(null);

//   // Auto-select first item after fetch
//   useEffect(() => {
//     if (allItems.length > 0 && !selectedItem) {
//       // already handled in hook
//     }
//   }, [allItems, selectedItem]);

//   const handleCreate = () => {
//     setEditingItem(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (item: OurBenefits) => {
//     setEditingItem(item);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this section?')) {
//       await deleteItem(id);
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setEditingItem(null);
//   };

//   const handleModalSuccess = async () => {
//     await fetchAll();
//   };

//   if (loading && !selectedItem) {
//     return <OurBenefitsSkeleton />;
//   }

//   return (
//     <div className="min-h-screen bg-[hsl(var(--color-background))]">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-white">Our Benefits</h1>
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm" onClick={fetchAll} disabled={loading}>
//             <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//           <Button onClick={handleCreate}>Create New</Button>
//         </div>
//       </div>

//       {/* List of all items */}
//       <div className="container mx-auto px-4">
//         <OurBenefitsList
//           items={allItems}
//           onCreateClick={handleCreate}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       </div>

//       {/* Detail view of selected item (optional) */}
//       {selectedItem && (
//         <div className="container mx-auto px-4 mt-8">
//           <OurBenefitsContent
//             data={selectedItem}
//             onEdit={() => handleEdit(selectedItem)}
//             onDelete={() => handleDelete(selectedItem._id!)}
//           />
//         </div>
//       )}

//       {/* Modal */}
//       <OurBenefitsFormModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         editData={editingItem}
//         onSuccess={handleModalSuccess}
//       />
//     </div>
//   );
// }


// app/our-benefits/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useOurBenefits } from '@/lib/hooks/useOurBenefits';
import { OurBenefitsContent } from '@/components/ourBenefits/OurBenefitsContent';
import { OurBenefitsFormModal } from '@/components/ourBenefits/OurBenefitsFormModal';
import { OurBenefitsSkeleton } from '@/components/ourBenefits/OurBenefitsSkeleton';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { OurBenefits } from '@/types/benefit.types';

export default function OurBenefitsPage() {
  const { allItems, loading, fetchAll, deleteItem } = useOurBenefits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<OurBenefits | null>(null);
  const [error, setError] = useState<string | null>(null);

  // optional error handling from hook
  useEffect(() => {
    if (allItems.length === 0 && !loading) {
      // no items
    }
  }, [allItems, loading]);

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: OurBenefits) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      const success = await deleteItem(id);
      if (!success) setError('Failed to delete');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleModalSuccess = async () => {
    await fetchAll();
  };

  if (loading && allItems.length === 0) {
    return <OurBenefitsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Our Benefits Sections</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Total: {allItems.length} sections
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchAll} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Section
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">Error: {error}</p>
            <Button variant="outline" size="sm" onClick={() => { setError(null); fetchAll(); }} className="mt-2">
              Retry
            </Button>
          </div>
        )}

        {/* Empty State */}
        {allItems.length === 0 ? (
          <div className="text-center py-12 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No benefit sections found</p>
            <Button onClick={handleCreate}>Create First Section</Button>
          </div>
        ) : (
          <div className="space-y-12">
            {allItems.map((item) => (
              <OurBenefitsContent
                key={item._id}
                data={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item._id!)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <OurBenefitsFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        editData={editingItem}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}