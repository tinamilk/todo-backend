import express from 'express';
import { writeJSON, readJSON } from '../helpers/JSONdata.js';
import { getIsUnique } from '../helpers/getIsUnique.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.patch(
	'/tasks/:id',
	body().custom((value) => {
		if ('isDone' in value || 'title' in value) {
			return true;
		}
		throw new Error('Nothing to change');
	}),
	body('title')
		.optional()
		.trim()
		.escape()
		.isLength({ min: 1 })
		.withMessage('Title is empty')
		.custom(async (value, { req }) => {
			if ((await getIsUnique(value, req.params.id))) {
				throw new Error('task title exists');
			}
			return true;
		}),
	body('isDone')
		.optional()
		.custom((value) => {
			if (typeof value !== 'boolean') {
				throw new Error('IsDone is not boolean');
			}
			return true;
		}),
	async (req, res) => {
		try {
			const tasks = await readJSON();
			const taskIndex = tasks.findIndex((task) => task.id === req.params.id);
			const { title, isDone } = req.body;

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			if (taskIndex === -1) {
				return res.status(404).send('Tasks doesnt exist');
			}

			const changedTitle = title || tasks[taskIndex].title;
			const changedIsDone =
				'isDone' in req.body ? isDone : tasks[taskIndex].isDone;

			const changedTask = {
				...tasks[taskIndex],
				title: changedTitle,
				isDone: changedIsDone,
				updatedAt: new Date(),
			};

			tasks[taskIndex] = changedTask;
			await writeJSON(tasks);
			return res.status(200).send(changedTask);
		} catch (err) {
			return res.status(400).send(err.message);
		}
	}
);

export default router;
