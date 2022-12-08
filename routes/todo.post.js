import express from 'express';
import db from '../models/index.js';
const Task = db.task;
import { body } from 'express-validator';
import { validate } from '../helpers/handleError.js';

const router = express.Router();

router.post(
	'/tasks/',
	validate([
		body('title')
			.not()
			.isEmpty()
			.trim()
			.escape()
			.isLength({ min: 1 })
			.withMessage('Title is empty'),
	]),
	async (req, res) => {

		try {
			const task = {
				title: req.body.title,
			};

			const data = await Task.create(task);
			return res.status(200).json(data);
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				message: err.errors.map(e => e.message)
			});
		}
	}
);

export default router;
