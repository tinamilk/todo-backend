import express from 'express';
import db from '../../models/index.js';
import { Sequelize } from 'sequelize';
const Task = db.task;
import { body } from 'express-validator';
import { validate } from '../../helpers/handleError.js';
import { authMidleware } from '../../services/authMiddleware.js';

const router = express.Router();
const Op = Sequelize.Op;

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
		if (!req.user) return res.status(401).json({ message: 'User not found' });

		const { user } = req;
		try {
			const checkUnique = await Task.findOne({
				where: {
					[Op.and]: [{ title: req.body.title }, { userId: user.id }],
				},
			});

			if (checkUnique) {
				return res.status(400).json({ message: 'Task with same name exist' });
			}
			const task = {
				title: req.body.title,
				userId: user.id,
			};

			const data = await Task.create(task);
			return res.status(200).json(data);
		} catch (err) {
			return res.status(400).json({
				message: err.errors?.map((e) => e.message) || 'Cannot add Task',
			});
		}
	}
);

export default router;
