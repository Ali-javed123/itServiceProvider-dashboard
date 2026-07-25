export interface Service {
  _id: string;
  category: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image: {
    url: string;
    public_id: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryItem {
  _id: string;
  serviceCategory: string;
  slug: string;
  services: Service[];
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  count: number;
  data: CategoryItem[];
}

export interface ServiceFormValues {
  title: string;
  description: string;
  category: string;
  icon: string;
  image?: File;
}