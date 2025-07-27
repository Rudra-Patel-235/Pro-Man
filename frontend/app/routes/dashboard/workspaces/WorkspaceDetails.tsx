import Loader from '@/components/Loader';
import { useGetWorkspaceDetailsQuery } from '@/hooks/use-workspace';
import { WorkspaceHeader } from '@/components/workspace/workspaceHeader';
import type { Project, Workspace } from '@/schema';
import React, { useState } from 'react'
import { useParams } from 'react-router';
import { ProjectList } from '@/components/workspace/listingProjects';
import { CreateProjectPopUp } from '@/components/project/createProject';

const WorkspaceDetails = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    const [isCreateProject, setIsCreateProject] = useState(false);
    const [isInviteMember, setIsInviteMember] = useState(false);
    
    if(!workspaceId){
        return <div>Workspace not found</div>
    }
    const {data, isLoading}  = useGetWorkspaceDetailsQuery(workspaceId) as {
        data: {
            workspace: Workspace;
            projects: Project[];
        }
        isLoading: boolean;
    }; 
    
    // logging project details
    console.log(data);
    // console.log("Workspace Details:", data.workspace);
    // console.log("Projects:", data.projects);
    if(isLoading){
        return <Loader/>
    }

  return (
    <div className='space-y-8'>
        <WorkspaceHeader
            workspace={data.workspace}
            members={data?.workspace.members as any}
            onInviteMember={() => setIsInviteMember(true)}
            onCreateProject={() => setIsCreateProject(true)}
        /> 

        <ProjectList
            workspaceId={workspaceId}
            projects={data.projects}
            onCreateProject={() => setIsCreateProject(true)}
        />

        <CreateProjectPopUp
            isOpen={isCreateProject}
            onChange={setIsCreateProject}
            workspaceId={workspaceId}
            workspaceMembers={data?.workspace.members as any}
        />
        
    </div>
  )
} 

export default WorkspaceDetails