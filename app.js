import * as dotenv from 'dotenv';
import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import redirectRouter from './routes/index.js';
import getRouter from './routes/todo.get.js';
import postRouter from './routes/todo.post.js';
import patchRouter from './routes/todo.patch.js';
import deleteRouter from './routes/todo.delete.js';
const port = config.get('Customer.dbConfig.port');

const app = express();
const PORT = port || 3030;

dotenv.config();

app.use(bodyParser.json());

app.use(process.env.DEFAULT_ENDPOINT, redirectRouter);
app.use(process.env.DEFAULT_ENDPOINT, getRouter);
app.use(process.env.DEFAULT_ENDPOINT, postRouter);
app.use(process.env.DEFAULT_ENDPOINT, patchRouter);
app.use(process.env.DEFAULT_ENDPOINT, deleteRouter);

app.listen(PORT, () => console.log(`Its started ${new Date()} on ${PORT}`));