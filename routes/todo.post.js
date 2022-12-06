import express from 'express';
import db from '../models/index.js';
const Task = db.task;
import { body, validationResult } from 'express-validator';


const router = express.Router();

router.post(
	'/tasks/',
	body('title')
		.not()
		.isEmpty()
		.trim()
		.escape()
		.isLength({ min: 1 })
		.withMessage('Title is empty'),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}
 
		try {
			const task = {
				title: req.body.title,
			};

			const data = await Task.create(task);
			return res.status(200).send(data);

		} catch (err) {
			return res.status(500).send({
				message: err.errors.map((e) => e.message),
			});
		}
	}
);

export default router;
