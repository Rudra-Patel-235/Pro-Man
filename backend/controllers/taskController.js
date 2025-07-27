import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";
import Workspace from "../models/workspaceModel.js";
import { logActivity } from "../utils/logs.js";

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

        await logActivity(req.user._id, "updated_task_description", "Task", taskId, {
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

        await logActivity(req.user._id, "updated_task_status", "Task", taskId, {
            message: `Task status changed to ${status}`,
        });

        res.status(200).json(task);
    } catch (error) {
        console.error("Error in updateTaskStatus:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}