import express from 'express';
import db from '../../models/index.js';
const Task = db.task;
import { query } from 'express-validator';
import { validate } from '../../helpers/handleError.js';
import { authMidleware } from '../../services/authMidleware.js';

const router = express.Router();

router.get(
	'/tasks/',
	authMidleware,
	validate([
		query('pp')
			.isFloat({ min: 5, max: 20 })
			.withMessage('Pp is not between 5 and 20'),
		query('page')
			.isFloat({ min: 1 })
			.withMessage('Page cannot be lower than 1'),
		query('filterBy')
			.optional()
			.isIn(['', 'done', 'undone'])
			.withMessage('Must be on of "", "done", "undone"'),
		query('order')
			.optional()
			.isIn(['', 'asc', 'desc'])
			.withMessage('Must be on of "", "asc", "desc"'),
	]),
	async (req, res) => {
		if (!req.user) throw new Error(401);

		const { user } = req;

		const { filterBy, order, pp, page } = req.query;
		const perPage = pp || 5;
		const currentPage = page || 1;

		const sorting = order === 'desc' ? 'DESC' : 'ASC';
		const filter = !filterBy ? null : filterBy === 'done';

		try {
			const { count, rows } = await Task.findAndCountAll({
				where: {
					userId: user.id,
					isDone: typeof filter === 'boolean' ? filter : [true, false],
				},
				order: [['createdAt', sorting]],
				offset: (currentPage - 1) * perPage,
				limit: perPage,
			});

			return res.status(200).json({ count: count, tasks: rows });
		} catch (err) {
			if (err.message === 401) {
				res.status(401).json('no token');
			}

			res.status(400).json({
				message: 'Cannot get tasks',
			});
		}
	}
);

export default router;
