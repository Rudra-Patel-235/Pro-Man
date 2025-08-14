import express from 'express';
import isAuthenticated from '../middleware/auth.js';
import { validateRequest } from 'zod-express-middleware';
import { addComment, addSubTask, archiveTask, createTask, getActivities, getComments, getTaskById, updateSubTask, updateTaskAssignees, updateTaskDescription, updateTaskPriority, updateTaskStatus, updateTaskTitle, watchTask } from '../controllers/taskController.js';
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

taskRouter.put('/:taskId/update-assignees', isAuthenticated, validateRequest({
    params: z.object({
      taskId: z.string(),
    }),
    body: z.object({
      assignees: z.array(z.string()),
    }),
}), updateTaskAssignees);


taskRouter.put('/:taskId/update-priority', isAuthenticated, validateRequest({
    params: z.object({
        taskId: z.string()
    }),
    body: z.object({
        priority: z.string()
    })
}), updateTaskPriority)


taskRouter.post('/:taskId/add-subtask', isAuthenticated, validateRequest({
    params: z.object({
        taskId: z.string()
    }),
    body: z.object({
        title: z.string()
    })
}), addSubTask)


taskRouter.put('/:taskId/update-subtask/:subTaskId', isAuthenticated, validateRequest({
    params: z.object({
        taskId: z.string(),
        subTaskId: z.string()
    }),
    body: z.object({
        completed: z.boolean()
    }),
}), updateSubTask)


taskRouter.get('/:resourceId/activities', isAuthenticated, validateRequest({
    params: z.object({
        resourceId: z.string(),
    }),
}), getActivities);


taskRouter.get('/:taskId/comments', isAuthenticated, validateRequest({
    params: z.object({
        taskId: z.string(),
    }),
}), getComments);


taskRouter.post('/:taskId/add-comment', isAuthenticated, validateRequest({
    params: z.object({
        taskId: z.string(),
    }),
    body: z.object({
        text: z.string(),
    }),
}), addComment);


taskRouter.post('/:taskId/archive', isAuthenticated, validateRequest({
    params: z.object({
        taskId: z.string(),
    }),
}), archiveTask);


taskRouter.post('/:taskId/watch', isAuthenticated, validateRequest({
    params: z.object({
        taskId: z.string(),
    }),
}), watchTask);

export default taskRouter;