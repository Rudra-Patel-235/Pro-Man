import express from 'express';
import isAuthenticated from '../middleware/auth.js';
import { validateRequest } from 'zod-express-middleware';
import { projectSchema } from '../utils/zod.js';
import { createProject, getProjectDetails, getProjectTasks } from '../controllers/projectController.js';
import { z } from 'zod';

const projectRouter = express.Router();

projectRouter.post('/:workspaceId/create-project', isAuthenticated, validateRequest({
    params: z.object({
      workspaceId: z.string(),
    }),
    body: projectSchema,
}), createProject);


projectRouter.get('/:projectId', isAuthenticated, validateRequest({
    params: z.object({
      projectId: z.string(),
    }),
}), getProjectDetails);


projectRouter.get('/:projectId/tasks', isAuthenticated, validateRequest({
    params: z.object({
      projectId: z.string(),
    }),
}), getProjectTasks);

export default projectRouter;