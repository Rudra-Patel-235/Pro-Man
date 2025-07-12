import express from "express";
import { workspaceSchema } from "../utils/zod.js";
import { validateRequest } from "zod-express-middleware";
import isAuthenticated from "../middleware/auth.js";
import { createWorkspace, getWorkspaces, getWorkspaceDetails, getWorkspaceProjects } from "../controllers/workspaceController.js";

const workspaceRouter = express.Router();

workspaceRouter.post("/", isAuthenticated, validateRequest({
    body: workspaceSchema
}), createWorkspace);

workspaceRouter.get("/", isAuthenticated, getWorkspaces);

workspaceRouter.get("/:workspaceId", isAuthenticated, getWorkspaceDetails);

workspaceRouter.get("/:workspaceId/projects", isAuthenticated, getWorkspaceProjects)

export default workspaceRouter;



