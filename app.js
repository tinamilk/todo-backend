/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import express from 'express';
import bodyParser from 'body-parser';
import redirectRouter from './routes/index.js';
import getRouter from './routes/todo.get.js';
import postRouter from './routes/todo.post.js';
import patchRouter from './routes/todo.patch.js';
import deleteRouter from './routes/todo.delete.js';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(bodyParser.json());

app.use('/', redirectRouter);
app.use('/', getRouter);
app.use('/', postRouter);
app.use('/', patchRouter);
app.use('/', deleteRouter);

app.listen(PORT, () => console.log(`Its started ${new Date()} on ${PORT}`));