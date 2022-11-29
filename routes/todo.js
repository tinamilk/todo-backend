/* eslint-disable no-undef */
import express from 'express';


// const { getTodos, postTodo, deleteTask } = require('../controllers/todo');

import { getTodos, postTodo, deleteTask } from '../controllers/todo.js';

const router = express.Router();

router.get('/tasks', getTodos);
router.post('/tasks', postTodo);
router.delete('/tasks', deleteTask);

export default router;
