import express from 'express';
import db from '../models/index.js';
const Task = db.task;

const router = express.Router();

router.delete('/tasks/:id', async (req, res) => {

	const id = req.params.id;

	try {

		const result = await Task.findOne({
			where: { id: id},
		});

		const deleted = await Task.destroy({
			where: { id: id},
			returning: true
		});

		if (deleted == 1) {
			res.send({
				message: 'Task was deleted successfully!',
				task: result
			});
			return;
		} else {
			res.send({
				message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
			});
			return;
		}
	} catch (err) {
		return res.status(500).send({
			message: err.errors.map((e) => e.message),
		});
	}
});

export default router;
