// types/banner.types.ts
export interface IBanner {
  _id: string;
  title: string;
  heading: string;
  btnTextOne: string;
  btnTextTwo: string;
  image: {
    url: string;
    public_id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBannerDto {
  title: string;
  heading: string;
  btnTextOne: string;
  btnTextTwo: string;
  image?: File | string;
}

export interface UpdateBannerDto extends Partial<CreateBannerDto> {}

export interface BannerFormValues {
  title: string;
  heading: string;
  btnTextOne: string;
  btnTextTwo: string;
  image?: File | string;
  existingImage?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}