import express from 'express';
import db from '../models/index.js';
const Task = db.tasks;

const router = express.Router();

router.get('/tasks/', (req, res) => {
	Task.findAll({ where: { isDone: false } })
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
