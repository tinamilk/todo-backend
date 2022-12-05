import express from 'express';
import db from '../models/index.js';
const Task = db.task;

const router = express.Router();

router.delete('/tasks/:id', (req, res) => {
	const id = req.params.id;

	Task.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Task was deleted successfully!',
				});
			} else {
				res.send({
					message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
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
