import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { writeJSON, readJSON } from '../helpers/JSONdata.js';
import { getIsUnique } from '../helpers/getIsUnique.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/tasks/', body('title').not().isEmpty().trim().escape().isLength({ min: 1 }), async (req, res) => {

	try {
		const tasks = await readJSON();

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).send('Task title is empty');
		}

		if (getIsUnique(req.body.title)) {
			return res.status(400).send('Task with the same name exists');
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
		res.status(200).send('Success');
	} catch (err) {
		console.log(err.message);
		res.status(422).send('Bad request');
	}
});

export default router;
