import express from 'express';
import isAuthenticated from '../middleware/auth.js';
import { validateRequest } from 'zod-express-middleware';
import { createTask, getTaskById, updateTaskDescription, updateTaskStatus, updateTaskTitle } from '../controllers/taskController.js';
import { taskSchema } from '../utils/zod.js';
import { z } from 'zod';


const taskRouter = express.Router();

taskRouter.post('/:projectId/add-task', isAuthenticated, validateRequest({
    params: z.object({
      projectId: z.string(),
    }),
    body: taskSchema,
}), createTask);


taskRouter.get('/:taskId', isAuthenticated, validateRequest({
    params: z.object({
      taskId: z.string(),
    }),
}), getTaskById);


taskRouter.put('/:taskId/update-title', isAuthenticated, validateRequest({
    params: z.object({
      taskId: z.string(),
    }),
    body: z.object({
      title: z.string().min(1, "Title is required"),
    }),
}), updateTaskTitle);


taskRouter.put('/:taskId/update-description', isAuthenticated, validateRequest({
    params: z.object({
      taskId: z.string(),
    }),
    body: z.object({
      description: z.string().min(1, "Description is required"),
    }),
}), updateTaskDescription);


taskRouter.put('/:taskId/update-status', isAuthenticated, validateRequest({
    params: z.object({
      taskId: z.string(),
    }),
    body: z.object({    
      status: z.string()
    }),
}), updateTaskStatus);

export default taskRouter;