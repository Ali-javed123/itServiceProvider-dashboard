// types/teams.types.ts

export interface Team {
  _id: string;
  title: string;
  designation: string;
  image?: {
    url: string;
    publicId?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type TeamFormValues = {
  title: string;
  designation: string;
  image?: File | string | null; // for edit, can be existing URL string
};

export interface TeamResponse {
  success: boolean;
  message?: string;
  data: Team | Team[];
}