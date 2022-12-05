import express from 'express';
import db from '../models/index.js';
const Task = db.task;

const router = express.Router();

router.patch('/tasks/:id', (req, res) => {
	const id = req.params.id;

	Task.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.status(200).send({
					message: 'Task was updated successfully.',
				});
			} else {
				res.status(400).send({
					message: `Cannot update Task with id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.errors.map((e) => e.message),
			});
		});
});

export default router;
