import { useMutation, useQuery } from "@tanstack/react-query";
import { getData, postData } from "@/lib/axios";
import type { workspaceForm } from "@/components/workspace/newWorkspace";

export const useCreateWorkspaceMutation = () => {
    return useMutation({
        mutationFn: async (data: workspaceForm) => postData('/workspaces', data),
    });
}

export const useGetWorkspacesQuery = () => {
    return useQuery({
        queryKey: ['workspaces'],
        queryFn: async () => getData('/workspaces'),
    });
}

export const useGetWorkspaceDetailsQuery = (workspaceId: string) => {
    return useQuery({
        queryKey: ["workspace", workspaceId],
        queryFn: async () => getData(`/workspaces/${workspaceId}/projects`),
    });
};     