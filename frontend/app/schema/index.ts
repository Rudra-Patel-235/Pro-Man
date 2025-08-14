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

export interface Subtask {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
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


export type ResourceType =
  | "Task"
  | "Project"
  | "Workspace"
  | "Comment"
  | "User";

export type ActionType =
  | "created_task"
  | "updated_task"
  | "created_subtask"
  | "updated_subtask"
  | "completed_task"
  | "created_project"
  | "updated_project"
  | "completed_project"
  | "created_workspace"
  | "updated_workspace"
  | "added_comment"
  | "added_member"
  | "removed_member"
  | "joined_workspace"
  | "added_attachment";

export interface ActivityLog {
  _id: string;
  user: User;
  action: ActionType;
  resourceType: ResourceType;
  resourceId: string;
  details: any;
  createdAt: Date;
}

export interface CommentReaction {
  emoji: string;
  user: User;
}

export interface Comment {
  _id: string;
  author: User;
  text: string;
  createdAt: Date;
  reactions?: CommentReaction[];
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileType?: string;
    fileSize?: number;
  }[];
}


export interface StatsCardProps {
  totalProjects: number;
  totalTasks: number;
  totalProjectInProgress: number;
  totalTaskCompleted: number;
  totalTaskToDo: number;
  totalTaskInProgress: number;
}

export interface TaskTrendsData {
  name: string;
  completed: number;
  inProgress: number;
  todo: number;
}

export interface TaskPriorityData {
  name: string;
  value: number;
  color: string;
}

export interface ProjectStatusData {
  name: string;
  value: number;
  color: string;
}

export interface WorkspaceProductivityData {
  name: string;
  completed: number;
  total: number;
}