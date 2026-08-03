// types/whyChooseUs.types.ts
export interface Feature {
  icon: string;
  title: string;
}

export interface IChooseUs {
  _id: string;
  title: string;
  heading: string;
  description: string;
  subHeading: string;
  btnText: string;
  image: {
    url: string;
    public_id: string;
  };
  featured: Feature[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateChooseUsInput {
  title: string;
  heading: string;
  description: string;
  subHeading: string;
  btnText: string;
  featured: Feature[];
  image?: File;
}

export interface UpdateChooseUsInput extends Partial<CreateChooseUsInput> {
  id: string;
}

export interface ChooseUsFormValues {
  title: string;
  heading: string;
  description: string;
  subHeading: string;
  btnText: string;
  featured: Feature[];
  image?: File;
}