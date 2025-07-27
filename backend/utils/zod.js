import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const verifyEmailSchema = z.object({
    token: z.string().min(1, "Token is required"),
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
});

export const emailSchema = z.object({
    email: z.string().email("Invalid email address"),
});


export const workspaceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    color: z.string().min(1, "Color is required"),
    description: z.string().optional(),
});

export const projectSchema = z.object({
    title: z.string().min(3, "title is required"),
    description: z.string().optional(),
    startDate: z.string(),
    dueDate: z.string(),
    tags: z.string().optional(),
    status: z.enum(["Planning", "In Progress", "On Hold", "Completed", "Cancelled"]).optional(),
    members: z.array(
        z.object({
            user: z.string(),
            role: z.enum(["manager", "contributor", "viewer"]),
        })
    ).optional(),
});



export const taskSchema = z.object({
    title: z.string().min(1, { message: 'Task title is required' }),
    description: z.string().optional(),
    status: z.enum(["To Do", "In Progress", "Review", "Done"]),
    priority: z.enum(['Low', 'Medium', 'High']),
    dueDate: z.string().min(1, { message: 'Due date is required' }),
    assignees: z.array(z.string()).min(1, { message: 'At least one assignee is required' }),
});
