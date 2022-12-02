import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { writeJSON, readJSON } from '../helpers/JSONdata.js';
import { getIsUnique } from '../helpers/getIsUnique.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
	'/tasks/',
	body('title')
		.not()
		.isEmpty()
		.trim()
		.escape()
		.isLength({ min: 1 })
		.withMessage('Title is empty')
		.custom(async (value, { req }) => {
			if (await getIsUnique(value, req.params.id)) {
				throw new Error('task title exists');
			}
			return true;
		}),
	async (req, res) => {
		try {
			const tasks = await readJSON();

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const date = new Date();

			const taskToAdd = {
				title: req.body.title,
				createdAt: date,
				updatedAt: date,
				id: uuidv4(),
				isDone: false,
			};

			tasks.push(taskToAdd);

			await writeJSON(tasks);
			res.status(200).send(taskToAdd);
		} catch (err) {
			res.status(422).send(err.message);
		}
	}
);

export default router;
