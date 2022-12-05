import express from 'express';
import db from '../models/index.js';
const Task = db.task;
const Op = db.Sequelize.Op;

const router = express.Router();

router.get('/tasks/', (req, res) => {
	const { filterBy, order, pp, page } = req.query;
	const sorting = order === 'desc' ? 'DESC' : 'ASC';
	const filter = !filterBy ? null : filterBy === 'done';

	Task.findAll({
		where: { isDone: typeof filter === 'boolean' ? filter : { [Op.ne]: null } },
		order: [['createdAt', sorting]],
		offset: (page - 1) * pp,
		limit: pp
	})
		.then((data) => {
			console.log(data.length);
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving tasks.',
			});
		});
});

export default router;
