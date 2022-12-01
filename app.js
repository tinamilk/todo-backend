import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import redirectRouter from './routes/todo.redirect.js';
import getRouter from './routes/todo.get.js';
import postRouter from './routes/todo.post.js';
import patchRouter from './routes/todo.patch.js';
import deleteRouter from './routes/todo.delete.js';
const port = config.get('Customer.dbConfig.port');

const app = express();
const PORT = port || 3030;

app.use(bodyParser.json());

app.use('/', redirectRouter);
app.use('/', getRouter);
app.use('/', postRouter);
app.use('/', patchRouter);
app.use('/', deleteRouter);

app.listen(PORT, () => console.log(`Its started ${new Date()} on ${PORT}`));