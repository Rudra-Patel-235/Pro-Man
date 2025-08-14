import type { addTaskData } from "@/components/task/AddTaskPopUp";
import { getData, postData, updateData } from "@/lib/axios";
import type { TaskPriority, TaskStatus } from "@/schema";
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
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        },
    })
}

export const useUpdateTaskDescriptionMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, description: string }) => updateData(`/tasks/${data.taskId}/update-description`, { description: data.description }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        },
    })
}

export const useUpdateTaskStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, status: TaskStatus }) => updateData(`/tasks/${data.taskId}/update-status`, { status: data.status }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        },
    })
}

export const useUpdateTaskAssigneesMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, assignees: string[] }) => updateData(`/tasks/${data.taskId}/update-assignees`, { assignees: data.assignees }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        }
    })
}  

export const useUpdateTaskPriorityMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, priority: TaskPriority }) => updateData(`/tasks/${data.taskId}/update-priority`, { priority: data.priority }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        },
    })
}

export const useAddSubTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, title: string }) => postData(`/tasks/${data.taskId}/add-subtask`, { title: data.title }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        },
    })
}

export const useUpdateSubTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, subTaskId: string, completed: boolean }) => updateData(`/tasks/${data.taskId}/update-subtask/${data.subTaskId}`, { completed: data.completed }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        },
    })
}

export const useAddCommentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string, text: string }) => postData(`/tasks/${data.taskId}/add-comment`, { text: data.text }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['comments', data.task] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data.task] });
        },
    })
}

export const useGetCommentsQuery = (taskId: string) => {
    return useQuery({
        queryKey: ['comments', taskId],
        queryFn: () => getData(`/tasks/${taskId}/comments`),
    })
}

export const useWatchTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string }) => postData(`/tasks/${data.taskId}/watch`, {}),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        },
    })
}

export const useArchiveTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { taskId: string }) => postData(`/tasks/${data.taskId}/archive`, {}),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({ queryKey: ['task', data._id] });
            queryClient.invalidateQueries({ queryKey: ['task-activity', data._id] });
        },
    })
}
