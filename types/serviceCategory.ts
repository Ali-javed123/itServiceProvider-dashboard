// types/index.ts
export interface ServiceCategory {
  _id: string;
  serviceCategory: string;
  slug: string;
  services: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  data: ServiceCategory[];
  message?: string;
}

export interface SingleCategoryResponse {
  success: boolean;
  data: ServiceCategory;
  message?: string;
}

export type ServiceCategoryFormValues = {
  serviceCategory: string;
  slug: string;
};