import express from 'express';
import db from '../../models/index.js';
const Task = db.task;
import { body } from 'express-validator';
import { validate } from '../../helpers/handleError.js';
import { authMidleware } from '../../services/authMidleware.js';

const router = express.Router();

router.post(
	'/tasks/',
	authMidleware,
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
		if (!req.user) throw new Error(401);

		const { user } = req;

		try {
			const task = {
				title: req.body.title,
				userId: user.id,
			};

			const data = await Task.create(task);
			return res.status(200).json(data);
		} catch (err) {
			console.log(err);
			if (err.name === 'SequelizeUniqueConstraintError') {
				return res.status(400).json({
					message: 'Task with the same name exists',
				});
			}
			return res.status(400).json({
				message: err.errors?.map((e) => e.message) || 'Cannot add Task',
			});
		}
	}
);

export default router;
