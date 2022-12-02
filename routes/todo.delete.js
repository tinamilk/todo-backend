import express from 'express';
import { writeJSON, readJSON } from '../helpers/JSONdata.js';

const router = express.Router();

router.delete('/tasks/:id', async (req, res) => {
	try {
		const tasks = await readJSON();
		const taskIndex = tasks.findIndex((task) => task.id === req.params.id);

		if (taskIndex !== -1) {
			tasks.splice(taskIndex, 1);
			await writeJSON(tasks);
			return res.status(200).send(`Tasks ${id} was deleted`);
		}

		return res.status(404).send('Task not found');
	} catch (err) {
		return res.status(400).send(err.message);
	}
});

export default router;
