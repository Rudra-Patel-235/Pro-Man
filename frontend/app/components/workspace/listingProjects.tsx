import type { Project } from '@/schema';
import React from 'react'
import { NotFound } from '../NotFound';
import { ProjectCard } from '../project/projectCard';

interface ProjectListProps {
    workspaceId: string;
    projects: Project[];
    onCreateProject: () => void;
}

export const ProjectList = ({workspaceId, projects, onCreateProject}: ProjectListProps) => {
  return (
    <div>
    <h3 className="text-xl font-medium mb-4">Projects</h3>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.length === 0 ? (
        <NotFound
          title="No projects found"
          description="Create a project to get started"
          buttonText="Create Project"
          buttonAction={onCreateProject}
        />
      ) : (
        projects.map((project) => {
          const projectProgress = 0;

          return (
            <ProjectCard
              key={project._id}
              project={project}
              progress={projectProgress}
              workspaceId={workspaceId}
            />
          );
        })
      )}
    </div>
  </div>
  )
} 
