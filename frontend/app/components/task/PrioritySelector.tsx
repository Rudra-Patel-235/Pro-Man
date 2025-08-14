import { useUpdateTaskPriorityMutation } from '@/hooks/use-task';
import type { TaskPriority } from '@/schema';
import React from 'react'
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const PrioritySelector = ({ priority, taskId } : { priority: TaskPriority; taskId: string }) => {

    const { mutate, isPending } = useUpdateTaskPriorityMutation();
    const handleStatusChange = (value: string) => {
        mutate(
        { taskId, priority: value as TaskPriority },
        {
            onSuccess: () => {
                toast.success("Priority updated successfully", {
                    position: "top-right",
                    duration: 3000,
                });
            },
            onError: (error: any) => {
                const errorMessage = error.response.data.message || "Failed to update priority";
                toast.error(errorMessage, {
                    position: "top-right",
                    duration: 3000,
                });
                console.log("Error updating priority:", error);
            },
        }
        );
    };


    return (
        <Select value={priority || ""} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]" disabled={isPending}>
            <SelectValue placeholder="Priority" />
        </SelectTrigger>

        <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
        </SelectContent>
        </Select>
    );
}
