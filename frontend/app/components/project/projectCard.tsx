import React from 'react'
import type { Project } from '@/schema';

interface ProjectCardProps {
    key: string | number;
    project: Project;
    progress: number;
    workspaceId: string;
}

export const ProjectCard = ({key, project, progress, workspaceId}: ProjectCardProps) => {
  return (
    <div>
        <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium">{project.name}</h4>
            </div>
        </div>
    </div>
  )
}
