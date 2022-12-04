import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import redirectRouter from './routes/todo.redirect.js';
import getRouter from './routes/todo.get.js';
import postRouter from './routes/todo.post.js';
import patchRouter from './routes/todo.patch.js';
import deleteRouter from './routes/todo.delete.js';
import cors from 'cors';
import db from './models/index.js';

const port = config.get('Customer.dbConfig.port');

const app = express();
const PORT = port || 3030;

const corsOptions = {
	origin: 'http://localhost:5432'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', redirectRouter);
app.use('/', getRouter);
app.use('/', postRouter);
app.use('/', patchRouter);
app.use('/', deleteRouter);

db.sequelize.sync({force: true})
	.then(() => {
		console.log('Synced db.');
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message);
	});

app.listen(PORT, () => console.log(`Its started ${new Date()} on ${PORT}`));