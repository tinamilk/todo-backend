import express from 'express';
import { readJSON } from '../helpers/JSONdata.js';
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
	async (req, res) => {
		try {
			const tasks = await readJSON();
			const { filterBy, order, pp, page } = req.query;

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const filtered = !filterBy
				? tasks
				: tasks.filter((task) => task.isDone === (filterBy === 'done'));

			const sorted =
				order === 'asc'
					? filtered.sort(
						(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
					)
					: filtered.sort(
						(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
					);

			const paginated = sorted.slice(pp * page - pp, pp * page);

			return res.status(200).json({
				count: paginated.length,
				tasks: paginated,
			});
		} catch (err) {
			return res.status(400).json('task not created');
		}
	}
);

export default router;
