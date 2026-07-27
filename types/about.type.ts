// types/about.type.ts
// import { Document } from "mongoose";

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Feature Interface
export interface IFeature {
  title: string;
  description: string;
  icon: string;
}

// Image Interface
export interface IImage {
  url: string;
  public_id: string;
}

// About Page Data Interface
export interface IPage {
  _id?: string;
  title: string;
  description: string;
  image_one: IImage;
  image_two: IImage;
  imgIcon1: string;
  imgIcon2: string;
  cardTitle: string;
  cardDescription: string;
  features: IFeature[];
  btnText: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create DTO (Data Transfer Object)
export interface CreatePageDto {
  id?:string
  title: string;
  description: string;
  imgIcon1: string;
  imgIcon2: string;
  cardTitle: string;
  cardDescription: string;
  image_one?: File | string;
  image_two?: File | string;
  btnText: string;
  features: IFeature[];
}

// Update DTO
export interface UpdatePageDto extends Partial<CreatePageDto> {}

// Form Values (for Formik)
export interface AboutFormValues {
  title: string;
  description: string;
  imgIcon1: string;
  imgIcon2: string;
  cardTitle: string;
  cardDescription: string;
  btnText: string;
  features: IFeature[];
  image_one?: File | string;
  image_two?: File | string;
  existingImageOne?: string;
  existingImageTwo?: string;
}