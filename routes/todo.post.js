import express from 'express';
import db from '../models/index.js';
const Task = db.tutorials;

const router = express.Router();

router.post('/tasks/', (req, res) => {
	if (!req.body.title) {
		res.status(400).send({
			message: 'Content can not be empty!'
		});
		return;
	}
    
	const task = {
		title: req.body.title
	};
    
	Task.create(task)
		.then(data => {
			res.status(200).send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
              err.message || 'Some error occurred while creating the Tutorial.'
			});
		});
});


export default router;
