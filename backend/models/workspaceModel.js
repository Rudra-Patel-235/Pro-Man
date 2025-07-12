import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        default: "#000000",
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        role: {
            type: String,
            enum: ["owner", "member", "admin", "viewer"],
            default: "member",
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    }],

    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }],
}, { timestamps: true })

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;