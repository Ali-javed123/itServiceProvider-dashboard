// // app/about/page.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useAbout } from '@/lib/hooks/useAbout';
// import AboutFormModal from '@/components/about/AboutFormModal';
// import { Button } from '@/components/ui/button';
// import { IPage } from '@/types/about.type';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Edit, Plus, RefreshCw } from 'lucide-react';


// export default function AboutPage() {
//   const { aboutData, allPages, loading, fetchAll, fetchById,deleteAbout } = useAbout();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPage, setSelectedPage] = useState<IPage | null>(null);
//   const [activePageId, setActivePageId] = useState<string | null>(null);



//   // Fetch first page on load or set active
//   useEffect(() => {

//     const loadInitialData = async () => {
//       if (allPages.length > 0) {
//         const firstPage = allPages[0];
//         setActivePageId(firstPage._id || null);
//         await fetchById(firstPage._id!);
//       }
//     };
//     loadInitialData();
//   }, [allPages, fetchById]);

//   const handleEdit = (page: IPage) => {
//     setSelectedPage(page);
//     setIsModalOpen(true);
//   };

//   const handleCreate = () => {
//     setSelectedPage(null);
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedPage(null);
//   };

//   const handleSuccess = async () => {
//     await fetchAll();
//     if (allPages.length > 0) {
//       const firstPage = allPages[0];
//       await fetchById(firstPage._id!);
//     }
//   };

//   const handlePageSelect = async (pageId: string) => {
//     setActivePageId(pageId);
//     await fetchById(pageId);
//   };

//   // Loading state
//   if (loading && !aboutData) {
//     return <AboutPageSkeleton />;
//   }


//     const handleDelete = async (page: IPage) => {
//     if (!page._id) return;
    
//     // Show confirmation dialog
//     if (window.confirm(`Are you sure you want to delete "${page.title}"?`)) {
//       const result = await deleteAbout(page._id);
//       if (result) {
//         await handleSuccess();
//       }
//     }
//   };


//   return (
//     <div className="min-h-screen bg-[hsl(var(--color-background))]">
//       {/* Header with Controls */}
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
//         <div className="flex items-center gap-4">
//           <h1 className="text-2xl font-bold text-white">About Pages</h1>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={fetchAll}
//             disabled={loading}
//           >
//             <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
//             Refresh
//           </Button>
//         </div>
//         <Button onClick={handleCreate} className="flex items-center gap-2">
//           <Plus className="w-4 h-4" />
//           Create New
//         </Button>
//       </div>

//       {/* Page Selector */}
//       {allPages.length > 0 && (
//         <div className="container mx-auto px-4 pb-4">
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {allPages.map((page) => (
//               <Button
//                 key={page._id}
//                 variant={activePageId === page._id ? 'default' : 'outline'}
//                 size="sm"
//                 onClick={() => handlePageSelect(page._id!)}
//                 className="whitespace-nowrap"
//               >
//                 {page.title || `Page ${page._id}`}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       {aboutData ? (
//         <AboutContent 
//           data={aboutData} 
//           onEdit={() => handleEdit(aboutData)}
//             onDelete={() => handleDelete(aboutData)} // ✅ Pass delete handler

//         />
//       ) : (
//         <div className="container mx-auto px-4 py-10 text-center text-gray-400">
//           <p>No about page content available.</p>
//           <p className="text-sm mt-2">Create a new page to get started.</p>
//         </div>
//       )}

//       {/* Modal */}
//       <AboutFormModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         editData={selectedPage}
//         onSuccess={handleSuccess}
//       />
//     </div>
//   );
// }
// // sss
// // About Content Component with Dynamic Rendering
// function AboutContent({ data, onEdit, onDelete }: { data: IPage; onEdit: () => void,onDelete: () => void }) {
//   return (
//     <section className="bg-[hsl(var(--color-background))] text-white py-20">
//       <div className="container mx-auto">
//         <div className="flex gap-3 justify-end my-1">
//         <div>

//           <Button onClick={onEdit}>
//             <Edit className="w-4 h-4 mr-1" />
//             Edit AboutUs
//           </Button>
//         </div>
//         <div>
//            <Button onClick={onDelete}>
//             <Edit className="w-4 h-4 mr-1" />
//             Delete AboutUs
//           </Button>

//         </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* LEFT IMAGES */}
//           <div className="relative w-full max-w-[520px] h-[520px] mx-auto">
//             <img
//               src={data.image_one?.url || '/assets/images/about/about-1-1.png'}
//               alt="About main"
//               className="absolute top-0 left-0 w-[90%] h-[95%] object-cover rounded-2xl z-10 shadow-xl"
//             />
//             <img
//               src={data.image_two?.url || '/assets/images/about/about-1-2.png'}
//               alt="About overlay"
//               className="absolute bottom-0 right-0 w-[55%] h-[55%] object-cover rounded-2xl z-20 shadow-2xl border-8 border-black"
//             />
//           </div>

//           {/* RIGHT CONTENT */}
//           <div>
//             <span className="inline-block mb-3 border-l-4 border-slate-700 dark:border-[var(--color-theme)] pl-3 text-sm tracking-widest text-slate-700 font-medium dark:text-[var(--color-theme)]">
//               ABOUT US
//             </span>

//             <h2 className="text-4xl text-black dark:text-slate-50 font-bold leading-tight mb-6">
//               {data.title}
//             </h2>

//             <p className="text-black dark:text-slate-50 mb-8">
//               {data.description}
//             </p>

//             {/* Highlight Card */}
//             <div className="bg-neutral-900  dark:bg-slate-900 border border-neutral-800 rounded-xl p-6 mb-8">
//               <h4 className="font-semibold mb-2 text-white">
//                 {data.cardTitle}
//               </h4>
//               <p className="text-sm text-slate-50">
//                 {data.cardDescription}
//               </p>
//             </div>

//             {/* Features */}
//             <div className="grid sm:grid-cols-2 gap-6 mb-8">
//               {data.features?.map((feature, index) => (
//                 <div key={index} className="flex items-start gap-x-4">
//                   <div className="mt-4 flex h-10 w-10 p-3 rounded-full items-center justify-center dark:bg-gray-700 bg-gray-400 text-[var(--color-theme)]">
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: `<i class="${feature.icon}"></i>`,
//                       }}
//                       className="flex items-center dark:text-white text-black justify-center w-full h-full"
//                     />
//                   </div>
//                   <div>
//                     <h5 className="font-medium leading-tight text-black dark:text-slate-50">
//                       {feature.title}
//                     </h5>
//                     <p className="text-sm mt-1 text-black dark:text-slate-50">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <Button className="dark:bg-gray-900 bg-slate-300 shadow-md shadow-gray-400 dark:shadow-gray-900 dark:text-white text-black border-2 dark:border-gray-900 dark:hover:bg-slate-800 hover:bg-gray-400 transition px-6 py-3 rounded-lg font-medium">
//               {data.btnText || 'More details'}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Skeleton Loader
// function AboutPageSkeleton() {
//   return (
//     <div className="min-h-screen bg-[hsl(var(--color-background))] py-20">
//       <div className="container mx-auto">
//         <div className="flex justify-end mb-4">
//           <Skeleton className="w-32 h-10" />
//         </div>
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div className="relative w-full max-w-[520px] h-[520px] mx-auto">
//             <Skeleton className="absolute top-0 left-0 w-[90%] h-[95%] rounded-2xl" />
//             <Skeleton className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-2xl" />
//           </div>
//           <div className="space-y-4">
//             <Skeleton className="w-24 h-6" />
//             <Skeleton className="w-full h-12" />
//             <Skeleton className="w-full h-24" />
//             <Skeleton className="w-full h-40" />
//             <Skeleton className="w-32 h-12" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/about/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAbout } from '@/lib/hooks/useAbout';
import AboutFormModal from '@/components/about/AboutFormModal';
import { Button } from '@/components/ui/button';
import { IPage } from '@/types/about.type';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Plus, RefreshCw } from 'lucide-react';
import { AboutPageSkeleton } from '@/components/about/AboutPageSkeleton';
import { AboutContent } from '@/components/about/AboutContent';
export default function AboutPage() {
  const { aboutData, allPages, loading, fetchAll, fetchById, deleteAbout } = useAbout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<IPage | null>(null);
  const [activePageId, setActivePageId] = useState<string | null>(null);

  // Fetch first page on load or set active
  useEffect(() => {
    const loadInitialData = async () => {
      if (allPages.length > 0) {
        const firstPage = allPages[0];
        setActivePageId(firstPage._id || null);
        await fetchById(firstPage._id!);
      }
    };
    loadInitialData();
  }, [allPages, fetchById]);

  const handleEdit = (page: IPage) => {
    setSelectedPage(page);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPage(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPage(null);
  };

  const handleSuccess = async () => {
    await fetchAll();
    if (allPages.length > 0) {
      const firstPage = allPages[0];
      await fetchById(firstPage._id!);
    }
  };

  const handlePageSelect = async (pageId: string) => {
    setActivePageId(pageId);
    await fetchById(pageId);
  };

  // Loading state
  if (loading && !aboutData) {
    return <AboutPageSkeleton />;
  }

  const handleDelete = async (page: IPage) => {
    if (!page._id) return;
    
    // Show confirmation dialog
    if (window.confirm(`Are you sure you want to delete "${page.title}"?`)) {
      const result = await deleteAbout(page._id);
      if (result) {
        await handleSuccess();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--color-background))]">
      {/* Header with Controls */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">About Pages</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAll}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create New
        </Button>
      </div>

      {/* Page Selector */}
      {allPages.length > 0 && (
        <div className="container mx-auto px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allPages.map((page) => (
              <Button
                key={page._id}
                variant={activePageId === page._id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageSelect(page._id!)}
                className="whitespace-nowrap"
              >
                {page.title || `Page ${page._id}`}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {aboutData ? (
        <AboutContent 
          data={aboutData} 
          onEdit={() => handleEdit(aboutData)}
          onDelete={() => handleDelete(aboutData)}
        />
      ) : (
        <div className="container mx-auto px-4 py-10 text-center text-gray-400">
          <p>No about page content available.</p>
          <p className="text-sm mt-2">Create a new page to get started.</p>
        </div>
      )}

      {/* Modal */}
      <AboutFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        editData={selectedPage}
        onSuccess={handleSuccess}
      />
    </div>
  );
}