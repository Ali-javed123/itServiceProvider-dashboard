import React from 'react'
import Projects from '@/components/projects/Projects'
const page = () => {
   const projectsData = [
  {
    _id: "6a84ac9d0a012ec84de31227",
    title: "INS Dev",
    description: "A full-stack web application built with React, Node.js, and TypeScript.",
    skills: [
      { skills: "React js" },
      { skills: "Node js" },
      { skills: "TypeScript" },
      { skills: "Tailwind CSS" },
    ],
    link: [{ link: "https://ins.web.app", btnText: "Live Demo" }],
    image: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  },
  // ... more projects
];

  return (
    <>
        <div className="min-h-screen bg-[hsl(var(--color-background))]">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Projects />

        </div>
        </div>
    </>
  )
}

export default page