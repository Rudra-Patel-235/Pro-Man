import type { createProjectData } from "@/components/project/createProject"
import { getData, postData } from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useCreateProject = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { projectData: createProjectData, workspaceId: string }) => postData(`/projects/${data.workspaceId}/create-project`, data.projectData),

        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['workspaces', data.workspace] })
            return data
        },

    })
}

export const useFetchProjectDetails = (projectId: string) => {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getData(`/projects/${projectId}/tasks`),
    })
}

