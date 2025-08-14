import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";
import Workspace from "../models/workspaceModel.js";
import { logActivity } from "../utils/logs.js";
import Comment from "../models/commentModel.js";
import Activity from "../models/activityModel.js";

export const createTask = async (req, res) => {
    try{
        const { projectId } = req.params;
        const { title, description, status, priority, dueDate, assignees } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const workspace = await Workspace.findById(project.workspace);
        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        const isMember = workspace.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this workspace" });
        }

        const newTask = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            assignees,
            project: projectId,
            createdBy: req.user._id
        });

        project.tasks.push(newTask._id);
        await project.save();

        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error in CreateTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findById(taskId).populate('assignees', 'name profilePic').populate('watchers', 'name profilePic');

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project).populate('members.user', 'name profilePic');
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }


        res.status(200).json({ task, project });
    } catch (error) {
        console.error("Error in getTaskById:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const updateTaskTitle = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        const prevTitle = task.title;
        task.title = title;
        await task.save();

        await logActivity(req.user._id, "updated_task", "Task", taskId, {
            message: `Task title changed from ${prevTitle} to ${title}`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in updateTaskTitle:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const updateTaskDescription = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { description } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        task.description = description;
        await task.save();

        await logActivity(req.user._id, "updated_task", "Task", taskId, {
            message: `Task description updated`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in updateTaskDescription:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        task.status = status;
        await task.save();

        await logActivity(req.user._id, "updated_task", "Task", taskId, {
            message: `Task status changed to ${status}`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in updateTaskStatus:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateTaskAssignees = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { assignees } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }


        const oldAssignees = task.assignees;

        task.assignees = assignees;
        await task.save();

        await logActivity(req.user._id, "updated_task", "Task", taskId, {
            message: `Task assignees numbers changed from ${oldAssignees.length} to ${assignees.length}`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in updateTaskAssignees:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const updateTaskPriority = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { priority } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        task.priority = priority;
        await task.save();

        await logActivity(req.user._id, "updated_task", "Task", taskId, {
            message: `Task priority changed to ${priority}`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in updateTaskPriority:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addSubTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        const subTask = {
            title,
            completed: false,
        };

        task.subtasks.push(subTask);
        await task.save();

        await logActivity(req.user._id, "created_subtask", "Task", taskId, {
            message: `Subtask "${title}" added to task`,
        });

        res.status(201).json(task);
    } catch (error) {
        console.error("Error in addSubTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const updateSubTask = async (req, res) => {
    try {
        const { taskId, subTaskId } = req.params;
        const { completed } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const subTask = task.subtasks.find(
            (subTask) => subTask._id.toString() === subTaskId
        );

        if (!subTask) {
            return res.status(404).json({ message: "Subtask not found" });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }


        subTask.completed = completed;
        await task.save();

        await logActivity(req.user._id, "updated_subtask", "Task", taskId, {
            message: `Subtask "${subTask.title}" updated`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in updateSubTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getActivities = async (req, res) => {
    try {
        const { resourceId } = req.params;

        const activities = await Activity.find({ resourceId }).populate('user', 'name profilePic').sort({ createdAt: -1 });

        res.status(200).json(activities);
    } catch (error) {
        console.error("Error in getActivities:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addComment = async (req, res) => {
    try{
        const { taskId } = req.params;
        const { text } = req.body;

        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if(!project){
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if(!isMember){
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        const comment = await Comment.create({
            text,
            task: taskId,
            author: req.user._id,
        });

        task.comments.push(comment._id);
        await task.save();

        await logActivity(req.user._id, "added_comment", "Task", taskId, {
            message: `Comment added : ${text.substring(0, 50) + (text.length > 50 ? "..." : "")}`,
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Error in addComment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const getComments = async (req, res) => {
    try{
        const { taskId } = req.params;

        const comments = await Comment.find({ task: taskId }).populate('author', 'name profilePic').sort({ createdAt: -1 });

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error in getComments:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const watchTask = async (req, res) => {
    try{
        const { taskId } = req.params;
        if(!taskId){
            return res.status(400).json({ message: "Task ID is required" });
        }

        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if(!project){
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if(!isMember){
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        const isWatching = task.watchers.includes(req.user._id);
        if(isWatching){
            task.watchers = task.watchers.filter(watcher => watcher.toString() !== req.user._id.toString());
        } else {
            task.watchers.push(req.user._id);
        }

        await task.save();

        await logActivity(req.user._id, "updated_task", "Task", taskId, {
            message: `Task ${isWatching ? "stopped watching" : "started watching"}`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in watchTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const archiveTask = async (req, res) => {
    try{
        const { taskId } = req.params;
        if(!taskId){
            return res.status(400).json({ message: "Task ID is required" });
        }

        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await Project.findById(task.project);
        if(!project){
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if(!isMember){
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        const archived = task.isArchived;
        task.isArchived = !archived;
        await task.save();

        await logActivity(req.user._id, "updated_task", "Task", taskId, {
            message: `Task ${task.isArchived ? "archived" : "unarchived"}`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in archiveTask:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}