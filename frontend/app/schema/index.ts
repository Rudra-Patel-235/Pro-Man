export interface User {
    _id: string;
    email: string;
    name: string;
    createdAt: Date;
    isVerified: boolean;
    updatedAt: Date;
    profilePic?: string; 
}

export interface Workspace {
    _id: string;
    name: string;
    description?: string;
    owner: User | string;
    color: string;
    members: {
        user: User;
        role: 'admin' | 'member' | 'viewer' | 'owner';
        joinedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}


export enum ProjectStatus {
    Planning = "Planning",
    InProgress = "In Progress",
    OnHold = "On Hold",
    Completed = "Completed",
    Cancelled = "Cancelled",
}

export interface Project {
    _id: string;
    title: string;
    description?: string;
    status: ProjectStatus;
    workspace: Workspace;
    members: {
        user: User;
        role: 'admin' | 'member' | 'viewer' | 'owner';
        joinedAt: Date;
    }[];
    startDate: Date;
    dueDate: Date;
    progress: number;
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
    isArchived: boolean;
}


export type TaskStatus = "To Do" | "In Progress" | "Done";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Subtask {
    _id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export interface Attachment {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    uploadedBy: string;
    uploadedAt: Date;
    _id: string;
}

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    project: Project;
    createdAt: Date;
    updatedAt: Date;
    isArchived: boolean;
    dueDate: Date;
    priority: TaskPriority;
    assignee: User | string;
    createdBy: User | string;
    assignees: User[];
    subtasks?: Subtask[];
    watchers?: User[];
    attachments?: Attachment[];
}


export interface membersProps {
    _id: string;
    user: User;
    role: 'admin' | 'member' | 'viewer' | 'owner';
    joinedAt: Date;
}

export enum ProjectMemberRole {
  MANAGER = "manager",
  CONTRIBUTOR = "contributor",
  VIEWER = "viewer",
}
