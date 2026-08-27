import React from 'react';
import { Project } from '@/types/projects.type';
import { FaEdit,FaTrash } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
// Sample data – you can import from a separate file or API
const projectsData = [
  {
    _id: "6a84ac9d0a012ec84de31227",
    title: "INS Dev",
    description: "A full-stack web application built with React, Node.js, and TypeScript.",
    skills: [
      { skills: "React" },
      { skills: "Node.js" },
      { skills: "TypeScript" },
    ],
    link: [
      { link: "https://ins.web.app", btnText: "Live Demo" },
    ],
    image: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", // optional
  },
  // add more projects...
];

interface ProjectsProps {
  data: Project[];
  setData: (open: any) => void;
  onOpenChange: (open: boolean) => void;
  deleteProject:any
}
 
// Reusable Project Card component
const ProjectCard: React.FC<{
  title: string;
  description: string;
  skills: { skills: string }[];
  link: { link: string; btnText: string }[];
  image?: string;
}> = ({ title, description, skills, link, image, data ,setData,onOpenChange,deleteProject}:any) => {
  const defaultImage = "https://via.placeholder.com/600x400?text=No+Image";
 const handleSubmit = async (formData: FormData) => {
    await deleteProject(formData)
  }

  return (
    <div className="group relative bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 p-1 dark:border-gray-700 ">
      {/* Image Section */}
      <div className="h-full rounded-2xl p-1 ">
        
      <div className="relative rounded-lg  h-48 overflow-hidden bg-card">
        <img
            src={data.image?.url || defaultImage}

          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Optional overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {data.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {data.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills.map((skill:any, idx:any) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            >
              {skill.skills}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {link && link.length > 0 && (
          <a
            href={link[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="
  inline-flex items-center justify-center w-full
  px-4 py-2.5
  text-sm font-semibold
  rounded-xl
  border
  bg-blue-600
  text-white
  border-blue-600
  shadow-sm
  hover:bg-blue-700
  hover:border-blue-700
  hover:shadow-md
  active:scale-[0.98]
  transition-all duration-300

  dark:bg-blue-500/10
  dark:text-blue-300
  dark:border-blue-500/30
  dark:hover:bg-blue-500/20
  dark:hover:border-blue-400/40
  dark:hover:text-blue-200
"
          >
            {link[0].btnText || "View Project"}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
        <div>
           <div className="absolute top-3 right-3 flex items-center gap-2">

    {/* Edit */}
    <button
      type="button"
      onClick={() =>{ setData( data) ;onOpenChange(true)}}
      className="
        flex items-center justify-center
        w-9 h-9
        rounded-full
        bg-gradient-to-r from-blue-600 to-purple-600 
        shadow-md
        backdrop-blur-sm
        transition-all duration-200
        hover:bg-blue-600
        hover:text-white
        hover:scale-110
        dark:bg-gray-900/90
        dark:text-gray-200
        dark:hover:bg-blue-600
      "
      title="Edit Project"
    >
      <FaEdit className="w-4 h-4" />
    </button>

    {/* Delete */}
    <button
      type="button"
      onClick={() => handleSubmit( data._id)}
      className="
        flex items-center justify-center
        w-9 h-9
        rounded-full
        bg-red-900
        text-white
        shadow-md
        backdrop-blur-sm
        transition-all duration-200
        hover:bg-red-600
        hover:text-white
        hover:scale-110
        dark:bg-red-900/90
        dark:text-gray-200
        dark:hover:bg-red-600
      "
      title="Delete Project"
    >
      <FaTrash className="w-4 h-4" />
    </button>

  </div>


        </div>
      </div>
      </div>
    </div>
  );
};

// Main Projects List Component
const Projects: React.FC<ProjectsProps> = ({ data,setData ,onOpenChange,deleteProject}) => {
  return (
    <section className="py-12 px-4  min-h-screen">
      

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((project:any) => (
            <ProjectCard onOpenChange={onOpenChange} setData={setData} data={project} deleteProject={deleteProject} key={project._id} {...project} />
          ))}
        </div>
    </section>  
  );
};

export default Projects;