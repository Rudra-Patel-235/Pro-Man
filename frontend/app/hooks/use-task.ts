import type { addTaskData } from "@/components/task/AddTaskPopUp";
import { getData, postData, updateData } from "@/lib/axios";
import type { TaskStatus } from "@/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useAddTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data : { projectId: string, taskData: addTaskData }) => postData(`/tasks/${data.projectId}/add-task`, data.taskData),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['project', data.project] });
        },
    });
}

export const useGetTaskQuery = (taskId: string) => {
    return useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getData(`/tasks/${taskId}`),
    
    })
}

export const useUpdateTaskTitleMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, title: string}) => updateData(`/tasks/${data.taskId}/update-title`, { title: data.title }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
        },
    })
}

export const useUpdateTaskDescriptionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, description: string }) => updateData(`/tasks/${data.taskId}/update-description`, { description: data.description }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
        },
    })
}

export const useUpdateTaskStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, status: TaskStatus }) => updateData(`/tasks/${data.taskId}/update-status`, { status: data.status }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
        },
    })
}

