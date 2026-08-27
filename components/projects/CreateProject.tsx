"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { ProjectsForm } from "./ProjectsForm";

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  onCreateTeam: (formData: FormData) => Promise<boolean>;
  onUpdate: (
    id: string,
    formData: FormData
  ) => Promise<boolean>;

  selectedData:any
  data:any
}

export const CreateProject = ({
  open,
  onOpenChange,
  isSubmitting,
  onCreateTeam,
  onUpdate,
  selectedData,
  data
}: CreateTeamDialogProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
const [image, setImage] = useState<File | null>(null);
  // const initialValues = {
    
  //   title: "",
  //   description: "",
  //   image: image,
  //   skills: [{ skills: "" }],
  //   link: [{ link: "", btnText: "" }],
  // };
const initialValues = {
  title: selectedData?.title || "",
  description: selectedData?.description || "",

  // New uploaded image ho to File,
  // warna existing image ka URL
  image: image || selectedData?.image?.url || null,

  skills:
    selectedData?.skills?.length > 0
      ? selectedData.skills.map((skill: any) => ({
          skills: skill.skills,
        }))
      : [{ skills: "" }],

  link:
    selectedData?.link?.length > 0
      ? selectedData.link.map((item: any) => ({
          link: item.link,
          btnText: item.btnText,
        }))
      : [{ link: "", btnText: "" }],
};
  console.log("initialValues",initialValues)
  const handleSubmit = async (formData: FormData) => {
    if(selectedData?._id){
    const success = await onUpdate(selectedData?._id,formData);      
       if (success) {
        setImagePreview(null);
        onOpenChange(false);
        setImage(null)
        
      }
    }else{

      const success = await onCreateTeam(formData);
      if (success) {
        setImagePreview(null);
        onOpenChange(false);
        setImage(null)
      }
    }

  };

  const handleCancel = () => {
    setImagePreview(null);
    onOpenChange(false);
  };
  console.log("<image>",image)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <DialogTitle>Add Project</DialogTitle>

          <DialogDescription>
            Fill in the details to add a new project.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-4">
          <ProjectsForm
            initialValues={initialValues}
            isSubmitting={isSubmitting}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Add Project"
            mode="create"
            image={image}
            setImage={setImage}
            data={data}
            selectedData={selectedData}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};