import express from 'express';
import { writeJSON, readJSON } from '../helpers/JSONdata.js';
import { getIsUnique } from '../helpers/getIsUnique.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.patch('/tasks/:id', body('title').not().isEmpty().trim().escape().isLength({ min: 1 }), async (req, res) => {
	try {
		const tasks = await readJSON();
		const taskIndex = tasks.findIndex((task) => task.id === req.params.id);
		const { title, isDone } = req.body;

		const errors = validationResult(req);

		if (title && !errors.isEmpty()) {
			return res.status(422).send('Task title is empty');
		}

		if ('isDone' in req.body && typeof isDone !== 'boolean') {
			return res.status(422).send('isDone in not boolean');
		}

		if (taskIndex === -1 ) {
			return res.status(404).send('Tasks doesnt exist');
		}

		if (title && (await getIsUnique(title, req.params.id))) {
			return res.status(422).send('Task title exists');
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
