"use client"
import React,{useEffect, useState} from 'react'
import Projects from '@/components/projects/Projects'
import { Project } from '@/types/projects.type'
import { Button } from '@/components/ui/button'
import { FaPlus } from 'react-icons/fa'
import { useProject } from '@/lib/hooks/useProject'
import { CreateProject } from '@/components/projects/CreateProject'
const page = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [projectData,setProject]=useState<Project[]>()
  const [selectedData,setData]=useState()
  const {
  createProjects,
  updateProject,
  deleteProject,
  projects,
  setPorjcts,
  selectedBanner,
  setSelectedBanner,
  loading,
  setLoading,
  isSubmitting,
  setIsSubmitting,
  fetchProjects
} = useProject()

useEffect(() => {
  
fetchProjects()
  return () => {
    
  }
}, [])
console.log("projects",projects)
console.log("selectedData",selectedData)
  return (
    <>
        <div className="min-h-screen bg-[hsl(var(--color-background))]">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
                 <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Service Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your service categories
          </p>
        </div>
        <div className="flex gap-3">
         
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="flex items-center gap-2"
            
          >
            <FaPlus className="h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

        <Projects onOpenChange={setCreateDialogOpen} data={projects}  setData={setData} deleteProject={deleteProject}/>

        </div>
        </div>
        <CreateProject
       open={createDialogOpen}
      onOpenChange={setCreateDialogOpen}
      isSubmitting={isSubmitting}
      onCreateTeam={createProjects}
      onUpdate={updateProject}
      selectedData={selectedData}
      data={projects}
        />
    </>
  )
}

export default page