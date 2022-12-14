import express from 'express';
import db from '../../models/index.js';
const Task = db.task;
import { body } from 'express-validator';
import { validate } from '../../helpers/handleError.js';
import { Sequelize } from 'sequelize';
import { authMidleware } from '../../services/authMiddleware.js';

const Op = Sequelize.Op;
const router = express.Router();

router.patch(
	'/tasks/:id',
	authMidleware,
	validate([
		body('title')
			.optional()
			.not()
			.isEmpty()
			.trim()
			.escape()
			.isLength({ min: 1 })
			.withMessage('Title is empty'),
	]),
	async (req, res) => {
		if (!req.user) return res.status(401).json({ message: 'User not found' });

		const id = req.params.id;

		const { user } = req;

		try {
			const checkUnique =
				req.body.title &&
				(await Task.findOne({
					where: {
						[Op.and]: [{ title: req.body.title }, { userId: user.id }],
					},
				}));

			if (checkUnique) {
				return res.status(400).json({ message: 'Task with same name exist' });
			}
			const updated = await Task.update(req.body, {
				where: { id: id },
				returning: true,
			});

			if (updated[0] === 0) {
				return res
					.status(400)
					.json(`Cannot update task with id=${id}. Task was not found!`);
			}

			return res.status(200).json(updated[1][0]);
		} catch (err) {
			if (err.name === 'SequelizeDatabaseError') {
				return res.status(400).json({
					message: `Id=${id} is not correct!`,
				});
			}

			return res.status(422).json({
				message: 'Cannot change task',
			});
		}
	}
);

export default router;
