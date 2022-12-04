import express from 'express';
import db from '../models/index.js';
const Task = db.tasks;

const router = express.Router();

router.patch('/tasks/:id', (req, res) => {
	const id = req.params.id;

	Task.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Task was updated successfully.',
				});
			} else {
				res.send({
					message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Task with id=' + id,
				error: err.message,
			});
		});
});

export default router;
