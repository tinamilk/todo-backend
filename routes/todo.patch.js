import express from 'express';
import { writeJSON, readJSON } from '../helpers/JSONdata.js';


const patchRouter = express.Router();


patchRouter.patch('/tasks/:id', async(req, res) => {
	try {
		const tasks = await readJSON();
		const taskIndex = tasks.findIndex(task => task.id === req.params.id);

		if (taskIndex !== -1 && req.body.title && req.body.title.split(' ')) {
			tasks[taskIndex] = {...tasks[taskIndex], ...req.body};
			await writeJSON(tasks);
			res.status(200).send('Success');
			return;
			
		}
		res.status(422).send('Invalid request');

	} catch (err) {
		res.status(400).send('Not created');
	}

});

export default patchRouter;