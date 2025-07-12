import { ProjectStatus } from '@/schema';
import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

export const registerSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Confirm Password must be at least 6 characters long' })
    
}).refine((data) => data.password === data.confirmPassword, {
    path : ['confirmPassword'],
    message: "Passwords don't match",
})


export const resetPasswordSchema = z.object({
    newPassword: z.string().min(6, { message: 'New Password must be at least 6 characters long' }),
    confirmPassword: z.string().min(6, { message: 'Confirm New Password must be at least 6 characters long' })

}).refine((data) => data.newPassword === data.confirmPassword, {
    path : ['confirmPassword'],
    message: "Passwords don't match",
})


export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' })
})

export const workspaceSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    color: z.string().min(1, { message: 'Color is required' }),
    description: z.string().optional(),
})

export const projectSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().optional(),
    status: z.nativeEnum(ProjectStatus),
    startDate: z.string().min(10, 'start date required'),
    dueDate: z.string().min(10, 'due date required'),
    members: z.array(z.object({
        user: z.string(),
        role: z.enum(['admin', 'member', 'viewer', 'owner']),
    })).optional(),
    tags: z.string().optional(),
})