import express from 'express';
import db from '../models/index.js';
const Task = db.task;
import { body } from 'express-validator';
import { validate } from '../helpers/handleError.js';

const router = express.Router();

router.patch(
	'/tasks/:id',
	validate([
		body('title')
			.not()
			.isEmpty()
			.trim()
			.escape()
			.isLength({ min: 1 })
			.withMessage('Title is empty'),
	]),
	async (req, res) => {
		const id = req.params.id;

		try {
			const updated = await Task.update(req.body, {
				where: { id: id },
				returning: true,
			});

			if (updated[0] === 1) {
				return res.status(200).json(updated[1][0]);
			}
			return res
				.status(400)
				.json(`Cannot update task with id=${id}. Task was not found!`);
		} catch (err) {
			console.log(err);
			if (err.name === 'SequelizeDatabaseError') {
				return res.status(400).json({
					message: `Id=${id} is not correct!`,
				});
			}
			return res.status(400).json({
				message: err.errors.map((e) => e.message || e.msg),
			});
		}
	}
);

export default router;
