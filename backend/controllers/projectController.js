import Workspace from "../models/workspaceModel.js";
import Project from "../models/projectModel.js";
import Task from "../models/taskModel.js";


export const createProject = async (req, res) => {
    try {
        const { workspaceId } = req.params;
        const { title, description, status, startDate, dueDate, members, tags } = req.body;

        const workspace = await Workspace.findById(workspaceId);

        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }
        
        const isMember = workspace.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this workspace" });
        }
        
        const tagsList = tags ? tags.split(',') : [];
        
        const newProject = await Project.create({
            title,
            description,
            status,
            startDate,
            dueDate,
            members,
            tags: tagsList,
            workspace: workspaceId,
            createdBy: req.user._id
        });
        
        workspace.projects.push(newProject._id);
        await workspace.save();

        res.status(201).json(newProject);
    } catch (error) {
        console.error("Error in createProject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getProjectDetails = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error("Error in getProjectDetails:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId).populate("members.user");

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMember = project.members.some(member => member.user._id.toString() === req.user._id.toString());
        if (!isMember) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        // console.log("project.members", project.members);
        // console.log("req.user", req.user);

        const tasks = await Task.find({ 
            project: projectId, 
            isArchived: false 
        })
        .populate("assignees", "name profilePic")
        .sort({ createdAt: -1 });

        res.status(200).json({
            project,
            tasks
        });
    } catch (error) {
        console.error("Error in getProjectTasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

