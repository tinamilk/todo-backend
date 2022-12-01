import express from 'express';
import { writeJSON, readJSON } from '../helpers/JSONdata.js';
import { validateTitle } from '../helpers/validateTitle.js';

const router = express.Router();

router.patch('/tasks/:id', async (req, res) => {
	try {
		const tasks = await readJSON();
		const taskIndex = tasks.findIndex((task) => task.id === req.params.id);
		const { title, isDone } = req.body;

		if (
			taskIndex === -1 ||
			title && !(await validateTitle(title, req.params.id)) ||
			('isDone' in req.body && typeof isDone !== 'boolean')
		) {
			res.status(422).send('Invalid request');
			return;
		}

		const changedTitle = title || tasks[taskIndex].title;
		const changedIsDone =
			'isDone' in req.body ? isDone : tasks[taskIndex].isDone;

		tasks[taskIndex] = {
			...tasks[taskIndex],
			title: changedTitle,
			isDone: changedIsDone,
			updatedAt: new Date(),
		};
		await writeJSON(tasks);
		res.status(200).send('Success');
	} catch (err) {
		res.status(400).send('Not created');
	}
});

export default router;
