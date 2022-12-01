import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { writeJSON, readJSON } from '../helpers/JSONdata.js';

const router = express.Router();

router.post('/tasks/', async (req, res) => {

	try {
		const tasks = await readJSON();

		if (!req.body.title || !req.body.title.split(' ').join('')) {
			res.status(422).send('Bad request');
			return;
		}
		if (tasks.findIndex((task) => task.title === req.body.title) !== -1) {
			res.status(400).send('Task with the same   name exists');
			return;
		}

		const date = new Date();

		tasks.push({
			title: req.body.title,
			createdAt: date,
			updatedAt: date,
			id: uuidv4(),
			isDone: false,
		});

		await writeJSON(tasks);
		res.status(200).send('Status Working');
	} catch (err) {
		res.status(422).send('Bad request');
	}
});

export default router;
