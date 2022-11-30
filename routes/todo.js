import express from 'express';

import { getTodos } from '../controllers/todo/todo.get.js';
import { postTodo } from '../controllers/todo/todo.post.js';
import { deleteTask } from '../controllers/todo/todo.delete.js';
import { changeTask } from '../controllers/todo/todo.patch.js';

const router = express.Router();

router.get('/tasks', getTodos);
router.post('/tasks', postTodo);
router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id', changeTask);


export default router;
