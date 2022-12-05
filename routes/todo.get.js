import express from 'express';
import db from '../models/index.js';
const Task = db.task;
const Op = db.Sequelize.Op;
import { query, validationResult } from 'express-validator';

const router = express.Router();

router.get(
	'/tasks/',
	query('pp')
		.exists()
		.withMessage('PP is required')
		.custom((value) => {
			if (value < 5 || value > 20) {
				throw new Error('Pp is not between 5 and 20');
			}
			return true;
		}),
	query('page')
		.exists()
		.withMessage('Page is required')
		.custom((value) => {
			if (value < 1) {
				throw new Error('Page is lower than 1');
			}
			return true;
		}),
	query('filterBy')
		.optional()
		.custom((value) => {
			if (['', 'done', 'undone'].includes(value)) {
				return true;
			}
			throw new Error('Must be on of "", "done", "undone"');
		}),
	query('order')
		.optional()
		.custom((value) => {
			console.log(value);
			if (['', 'asc', 'desc'].includes(value)) {
				return true;
			}
			throw new Error('Must be on of "", "asc", "desc"');
		}),
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { filterBy, order, pp, page } = req.query;
		const sorting = order === 'desc' ? 'DESC' : 'ASC';
		const filter = !filterBy ? null : filterBy === 'done';

		Task.findAll({
			where: {
				isDone: typeof filter === 'boolean' ? filter : { [Op.ne]: null },
			},
			order: [['createdAt', sorting]],
			offset: (page - 1) * pp,
			limit: pp,
		})
			.then((data) => {
				console.log(data.length);
				res.status(200).send(data);
			})
			.catch((err) => {
				res.status(500).send({
					message: err.errors.map((e) => e.message),
				});
			});
	}
);

export default router;
