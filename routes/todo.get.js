import express from 'express';
import db from '../models/index.js';
const Task = db.task;

const router = express.Router();

router.get('/tasks/', (req, res) => {
	const { filterBy, order, pp, page } = req.query;
	const sorting = order === 'desc' ? 'desc' : 'asc';
	const filter = !filterBy ? null : filterBy === 'done';

	Task.findAll({
		where: { isDone: typeof filter === 'boolean' ? filter : { [Op.ne]: null } },
		order: ['createdAt', sorting],
	})
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving tasks.',
			});
		});
});

export default router;
