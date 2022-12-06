import express from 'express';
import db from '../models/index.js';
const Task = db.task;
import * as expressValidator from 'express-validator';
import { validate } from '../helpers/handleError.js';

const router = express.Router();

router.get(
	'/tasks/',
	validate([
		expressValidator
			.query('pp')
			.exists()
			.withMessage('PP is required')
			.custom((value) => {
				if (value < 5 || value > 20) {
					throw new Error('Pp is not between 5 and 20');
				}
				return true;
			}),
		expressValidator
			.query('page')
			.exists()
			.withMessage('Page is required')
			.custom((value) => {
				if (value < 1) {
					throw new Error('Page cannot be lower than 1');
				}
				return true;
			}),
		expressValidator
			.query('filterBy')
			.optional()
			.custom((value) => {
				if (['', 'done', 'undone'].includes(value)) {
					return true;
				}
				throw new Error('Must be on of "", "done", "undone"');
			}),
		expressValidator
			.query('order')
			.optional()
			.custom((value) => {
				if (['', 'asc', 'desc'].includes(value)) {
					return true;
				}
				throw new Error('Must be on of "", "asc", "desc"');
			}),
	]),
	async (req, res) => {
		const errors = expressValidator.validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { filterBy, order, pp, page } = req.query;
		const sorting = order === 'desc' ? 'DESC' : 'ASC';
		const filter = !filterBy ? null : filterBy === 'done';

		try {
			const { count, rows } = await Task.findAndCountAll({
				where: {
					isDone: typeof filter === 'boolean' ? filter : [true, false],
				},
				order: [['createdAt', sorting]],
				offset: (page - 1) * pp,
				limit: pp,
			});

			return res.status(200).send({ count: count, tasks: rows });
		} catch (err) {
			return res.status(500).send({
				message: err.errors.map((e) => e.message),
			});
		}
	}
);

export default router;
