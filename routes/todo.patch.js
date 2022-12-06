import express from 'express';
import db from '../models/index.js';
const Task = db.task;
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.patch(
	'/tasks/:id',
	body('title')
		.not()
		.isEmpty()
		.trim()
		.escape()
		.isLength({ min: 1 })
		.withMessage('Title is empty'),
	async (req, res) => {
		const errors = validationResult(req);
		const id = req.params.id;

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		try {
			const updated = await Task.update(req.body, {
				where: { id: id },
				returning: true,
			});

			if (updated[0] === 1) {
				return res.status(200).send(updated[1][0]);
			} else {
				return res
					.status(400)
					.send(`Cannot update task with id=${id}. Task was not found!`);
			}
		} catch (err) {
			if (err.name === 'SequelizeDatabaseError') {
				return res.status(400).json({
					message: `Id=${id} is not correct!`,
				});
			}
			return res.status(400).send({
				message: err.errors.map((e) => e.message),
			});
		}
	}
);

export default router;
