import Workspace from "../models/workspaceModel.js";
import Project from "../models/projectModel.js";

export const createWorkspace = async (req, res) => {
    try{
        const { name, color, description } = req.body;
        const user = req.user;
        const workspace = await Workspace.create({ name, color, description, owner: user._id , members: [{ user: user._id, role: "owner", joinedAt: new Date() }] });
        res.status(201).json(workspace);
        
    } catch(error){
        console.log("Error in createWorkspace: " ,error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getWorkspaces = async (req, res) => {
    try{
        const workspaces = await Workspace.find({ 'members.user': req.user._id }).sort({ createdAt: -1 });
        res.status(200).json( workspaces );
    } catch(error){
        console.log("Error in getWorkspaces: " ,error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getWorkspaceDetails = async (req, res) => {
    try{
        const workspace = await Workspace.findOne({ 
            _id: req.params.workspaceId, 
            "members.user": req.user._id 
        }).populate("members.user", "name email profilePic");

        if(!workspace){
            return res.status(404).json({ message: "Workspace not found" });
        }

        res.status(200).json(workspace);
    } catch(error){
        console.log("Error in getWorkspaceDetails: " ,error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getWorkspaceProjects = async (req, res) => {
    try{
        const workspace = await Workspace.findOne({ 
            _id: req.params.workspaceId, 
            "members.user": req.user._id 
        }).populate("members.user", "name email profilePic");

        if(!workspace){
            console.log("Workspace not found");
            return res.status(404).json({ message: "Workspace not found" });
        }

        const projects = await Project.find({ 
            workspace: req.params.workspaceId, 
            isArchived: false, 
            // members: { $in: [req.user._id] } 
        })
        // .populate("tasks", "title status")
        .sort({ createdAt: -1 });

        res.status(200).json({
            workspace,
            projects
        });
        
    } catch(error){
        console.log("Error in getWorkspaceProjects: " ,error);
        res.status(500).json({ message: "Internal server error" });
    }
}