export interface Project {
  _id?: string;
  title: string;
  description: string;
  image: any | null;
  skills: { skills: string }[];
  link: { link: string; btnText: string }[];
  createdAt?: Date;
  updatedAt?: Date;
  
}


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}