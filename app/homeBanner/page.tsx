// app/test-banner/page.tsx
'use client';

import { useState } from 'react';
import { useBanner } from '@/lib/hooks/useBanner';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, Edit, Trash2, X, Upload, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { IBanner } from '@/types/banner.types';
import { BannerForm } from '@/components/home-banner/BannerForm';
import { BannerFormData } from '@/validation/banner.validation';
import { Toaster, toast } from 'sonner';

export default function TestBannerPage() {
  const {
    banners,
    loading,
    isSubmitting,
    createBanner,
    updateBanner,
    deleteBanner,
    fetchBanners,
  } = useBanner();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<IBanner | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleEdit = (banner: IBanner) => {
    setSelectedBanner(banner);
    setImagePreview(banner.image?.url || null);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteBanner(id);
  };

  const handleCreateSubmit = async (values: BannerFormData) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('heading', values.heading);
    formData.append('btnTextOne', values.btnTextOne);
    formData.append('btnTextTwo', values.btnTextTwo);
    
    if (values.image instanceof File) {
      formData.append('image', values.image);
    }

    const success = await createBanner(formData);
    if (success) {
      setCreateDialogOpen(false);
      setImagePreview(null);
    }
  };

  const handleUpdateSubmit = async (values: BannerFormData) => {
    if (!selectedBanner) return;
    
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('heading', values.heading);
    formData.append('btnTextOne', values.btnTextOne);
    formData.append('btnTextTwo', values.btnTextTwo);
    
    if (values.image instanceof File) {
      formData.append('image', values.image);
    }

    const success = await updateBanner(selectedBanner._id, formData);
    if (success) {
      setEditDialogOpen(false);
      setImagePreview(null);
      setSelectedBanner(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" />

      {/* ============================================
          PUBLIC CAROUSEL VIEW
          ============================================ */}
      <section className="relative overflow-hidden">
        {banners.length > 0 ? (
          <div className="relative h-[500px] md:h-[600px]">
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="relative h-full">
                  <img
                    src={banner.image?.url}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                          {banner.heading}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-6">
                          {banner.title}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition">
                            {banner.btnTextOne}
                          </button>
                          <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
                            {banner.btnTextTwo}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'w-8 bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="h-[500px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No banners available</p>
              <p className="text-sm text-gray-400 mt-2">Click "Create Banner" to add one</p>
            </div>
          </div>
        )}
      </section>

      {/* ============================================
          ADMIN CONTROLS
          ============================================ */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Manage Banners
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Total: {banners.length} banners
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchBanners}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => setCreateDialogOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Banner
            </button>
          </div>
        </div>

        {/* Banner Grid */}
        {banners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={banner.image?.url}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {banner.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {banner.heading}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                      {banner.btnTextOne}
                    </span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">
                      {banner.btnTextTwo}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleEdit(banner)}
                      className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-1 text-sm"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="flex-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition flex items-center justify-center gap-1 text-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400">
              No banners created yet. Click "Create Banner" to get started.
            </p>
          </div>
        )}
      </div>

      {/* ============================================
          CREATE BANNER MODAL
          ============================================ */}
      {createDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Create Banner
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add a new banner to the carousel
                </p>
              </div>
              <button
                onClick={() => {
                  setCreateDialogOpen(false);
                  setImagePreview(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              <BannerForm
                initialValues={{
                  title: '',
                  heading: '',
                  btnTextOne: '',
                  btnTextTwo: '',
                  image: undefined,
                }}
                isSubmitting={isSubmitting}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                onSubmit={handleCreateSubmit}
                onCancel={() => {
                  setCreateDialogOpen(false);
                  setImagePreview(null);
                }}
                submitLabel="Create Banner"
                mode="create"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================
          EDIT BANNER MODAL
          ============================================ */}
      {editDialogOpen && selectedBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Banner
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Update the banner details
                </p>
              </div>
              <button
                onClick={() => {
                  setEditDialogOpen(false);
                  setSelectedBanner(null);
                  setImagePreview(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              <BannerForm
                initialValues={{
                  title: selectedBanner.title,
                  heading: selectedBanner.heading,
                  btnTextOne: selectedBanner.btnTextOne,
                  btnTextTwo: selectedBanner.btnTextTwo,
                  image: undefined,
                }}
                isSubmitting={isSubmitting}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                onSubmit={handleUpdateSubmit}
                onCancel={() => {
                  setEditDialogOpen(false);
                  setSelectedBanner(null);
                  setImagePreview(null);
                }}
                submitLabel="Update Banner"
                mode="edit"
                currentImage={selectedBanner.image?.url}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}