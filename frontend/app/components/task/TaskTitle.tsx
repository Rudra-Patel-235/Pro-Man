import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { useUpdateTaskTitleMutation } from '@/hooks/use-task';
import { toast } from 'sonner';

export const TaskTitle = ({ title, taskId } : { title: string; taskId: string; }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const { mutate, isPending } = useUpdateTaskTitleMutation();

    const updateTitle = () => {
        mutate({ taskId, title: newTitle },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    toast.success('Task title updated successfully', {
                        duration: 3000,
                        position: 'top-right',
                    });
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.message || 'Failed to update task title';
                    toast.error(errorMessage, {
                        duration: 3000,
                        position: 'top-right',
                    });
                    console.error("Error updating task title:", error);
                }
            }

        );
    }

    return (
        <div className="flex items-center gap-2">
        {isEditing ? (
            <Input
            className="text-xl! font-semibold w-full min-w-3xl"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={isPending}
            />
        ) : (
            <h2 className="text-xl flex-1 font-semibold">{title}</h2>
        )}

        {isEditing ? (
            <Button
            className="py-0"
            size="sm"
            onClick={updateTitle}
            disabled={isPending}
            >
            Save
            </Button>
        ) : (
            <Edit
            className="size-3 cursor-pointer"
            onClick={() => setIsEditing(true)}
            />
        )}
        </div>
    );
}
