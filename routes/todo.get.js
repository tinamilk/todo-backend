import express from 'express';
import { readJSON } from '../helpers/JSONdata.js';


const getRouter = express.Router();


getRouter.get('/tasks', async(req, res) => {

	try {
		const tasks = await readJSON();
		const {filterBy, order, pp, page} = req.query;

		if (!pp || !page || pp < 5 || pp > 20 || page < 1) {
			res.status(422).json('bad request');
			return;
		}

		const filtered = filterBy === 'done'
			? tasks.filter(task => task.isDone === true)
			: filterBy === 'undone' 
				? tasks.filter(task => task.isDone === false)
				: tasks;

		const sorted = order === 'desc' 
			? filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
			: filtered.sort((a, b) => new Date(a.date) - new Date(b.date));


		const paginated = sorted.slice( pp * page - pp, pp * page );

		res.status(200).json({
			count: paginated.length,
			tasks: paginated
		});

	} catch (err) {
		res.status(400).json('task not created');
	}

});

export default getRouter;