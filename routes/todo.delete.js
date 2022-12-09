import express from 'express';
import db from '../models/index.js';
const Task = db.task;

const router = express.Router();

router.delete('/tasks/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const taskToDelete = await Task.findOne({
			where: { id: id },
		});

		const deleted = await Task.destroy({
			where: { id: id },
			returning: true,
		});

		if (deleted == 1) {
			return res.json({
				message: 'Task was deleted successfully!',
				task: taskToDelete,
			});
		}
		return res.json({
			message: `Cannot delete Task with id=${id}. Task was not found!`,
		});
	} catch (err) {
		if (err.name === 'SequelizeDatabaseError') {
			return res.status(400).json({
				message: `Id=${id} is not correct!`,
			});
		}
		return res.status(500).json({
			message: err.errors?.map((e) => e.message) || 'Cannot delete Task',
		});
	}
});

export default router;
