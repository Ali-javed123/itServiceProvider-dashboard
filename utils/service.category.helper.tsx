// utils/helpers.ts
import {ServiceCategory,ServiceCategoryFormValues} from '../types/serviceCategory'

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

export const getInitialFormValues = (category?: ServiceCategory): ServiceCategoryFormValues => {
  return {
    serviceCategory: category?.serviceCategory || '',
    slug: category?.slug || '',
  };
};