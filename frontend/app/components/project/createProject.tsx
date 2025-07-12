import { projectSchema } from '@/lib/zodSchema';
import { ProjectStatus, type membersProps } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

interface CreateProjectPopUpProps {
    isOpen: boolean;
    onChange: (isOpen: boolean) => void;
    workspaceId: string;
    workspaceMembers: membersProps[];
}

export type createProjectData = z.infer<typeof projectSchema>

export const CreateProjectPopUp = ({isOpen, onChange, workspaceId, workspaceMembers}: CreateProjectPopUpProps) => {

    const form = useForm<createProjectData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: '',
            description: '',
            status: ProjectStatus.Planning,
            startDate: '',
            dueDate: '',
            members: [],
            tags: undefined,
        }
    })

    const onSubmit = (data: createProjectData) => {
        console.log(data)
    }

    return (
        <div>
        </div>
    )
}
