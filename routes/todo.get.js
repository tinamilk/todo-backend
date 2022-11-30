import express from 'express';
import { readJSON } from '../helpers/JSONdata.js';


const getRouter = express.Router();


getRouter.get('/tasks', async(req, res) => {

	try {
		const tasks = await readJSON();

		res.status(200).json({
			count: tasks.length,
			tasks: tasks
		});
	} catch (err) {
		res.status(400).json('task not created');
	}

});

export default getRouter;