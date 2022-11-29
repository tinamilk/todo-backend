/* eslint-disable no-undef */
import express from 'express';


// const { getTodos, postTodo, deleteTask } = require('../controllers/todo');

import { getTodos, postTodo, deleteTask, changeTask } from '../controllers/todo.js';

const router = express.Router();

router.get('/tasks', getTodos);
router.post('/tasks', postTodo);
router.delete('/tasks/:id', deleteTask);
router.patch('/tasks/:id', changeTask);


export default router;
