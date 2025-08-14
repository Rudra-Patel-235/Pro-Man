import type { createProjectData } from "@/components/project/createProject"
import { getData, postData } from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useCreateProject = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { projectData: createProjectData, workspaceId: string }) => postData(`/projects/${data.workspaceId}/create-project`, data.projectData),

        onSuccess: (data: any, variables) => {
            // Invalidate the workspace details query to refresh the projects list immediately
            queryClient.invalidateQueries({ queryKey: ["workspace", variables.workspaceId] })
            // Also invalidate workspaces list in case we're on the workspaces page
            queryClient.invalidateQueries({ queryKey: ["workspaces"] })
            // Invalidate workspace stats if they exist
            queryClient.invalidateQueries({ queryKey: ["workspace", variables.workspaceId, "stats"] })
            return data
        },

        // Optimistically update the cache to show the new project immediately
        onMutate: async (variables) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ["workspace", variables.workspaceId] })

            // Snapshot the previous value
            const previousData = queryClient.getQueryData(["workspace", variables.workspaceId])

            // Optimistically update to the new value
            queryClient.setQueryData(["workspace", variables.workspaceId], (old: any) => {
                if (!old) return old
                
                // Create a temporary project object for immediate display
                const tempProject = {
                    _id: `temp-${Date.now()}`, // Temporary ID
                    title: variables.projectData.title,
                    description: variables.projectData.description,
                    status: variables.projectData.status,
                    createdAt: new Date().toISOString(),
                    members: variables.projectData.members || [],
                    tasks: [],
                    isOptimistic: true // Flag to identify optimistic updates
                }

                return {
                    ...old,
                    projects: [...(old.projects || []), tempProject]
                }
            })

            // Return a context object with the snapshotted value
            return { previousData }
        },

        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, variables, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["workspace", variables.workspaceId], context.previousData)
            }
        },

        // Always refetch after error or success to ensure we have the latest data
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: ["workspace", variables.workspaceId] })
        },

    })
}

export const useFetchProjectDetails = (projectId: string) => {
    return useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getData(`/projects/${projectId}/tasks`),
    })
}

