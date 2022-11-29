/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import express from 'express';
import router from './routes/todo.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3010;

app.use(bodyParser.json());

app.use('/', router);

app.listen(PORT, () => console.log(`Its started ${new Date()} on ${PORT}`));