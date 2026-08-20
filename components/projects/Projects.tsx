import React from 'react';

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

// Reusable Project Card component
const ProjectCard: React.FC<{
  title: string;
  description: string;
  skills: { skills: string }[];
  link: { link: string; btnText: string }[];
  image?: string;
}> = ({ title, description, skills, link, image }) => {
  const defaultImage = "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 p-3 dark:border-gray-700">
      {/* Image Section */}
      <div className="h-full rounded-2xl p-1 border-gray-900 border-2">
        
      <div className="relative rounded-lg  h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={image || defaultImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Optional overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, idx) => (
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
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
          >
            {link[0].btnText || "View Project"}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
      </div>
      </div>
    </div>
  );
};

// Main Projects List Component
const Projects: React.FC = () => {
  return (
    <section className="py-12 px-4  min-h-screen">
      

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {projectsData.map((project) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </div>
    </section>  
  );
};

export default Projects;