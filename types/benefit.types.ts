// types/ourBenefits.type.ts

export interface Featured {
  heading: string;
  description: string;
  icon: string;
  image?: {
    url: string;
    public_id: string;
  };
  _id?: string;
}

export interface ListItem {
  list: string;
  _id?: string;
}

export interface OurBenefits {
  _id?: string;
  title: string;
  subHeading: string;
  btnText: string;
  featured: Featured[];
  list: ListItem[];
  createdAt?: string;
  updatedAt?: string;
}

// Form data (for create/update) – matches the backend input
export interface OurBenefitsFormData {
  title: string;
  subHeading: string;
  btnText: string;
  featured: Omit<Featured, '_id' | 'image'> & { imageFile?: File; existingImageUrl?: string; existingPublicId?: string }[];
  list: Omit<ListItem, '_id'>[];
  // for file upload we use FormData, so we don't need image fields in form values directly
}