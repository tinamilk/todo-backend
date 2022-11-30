import express from 'express';
import { readJSON } from '../helpers/JSONdata.js';

const getRouter = express.Router();

getRouter.get('/tasks', async (req, res) => {
	try {
		const tasks = await readJSON();
		const { filterBy, order, pp, page } = req.query;

		console.log('pp', pp);
		console.log('pagge', page);
		console.log(req.query);

		if (!pp || !page || pp < 5 || pp > 20 || page < 1) {
			res.status(422).json('bad request');
			return;
		}

		const filterTasks = () => {
			switch (filterBy) {
			case 'done':
				return tasks.filter((task) => task.isDone === true);
			case 'undone':
				return tasks.filter((task) => task.isDone === false);
			default:
				return tasks;
			}
		};

		const filtered = filterTasks();

		console.log('filtered', filtered);

		const sorted =
			order === 'desc'
				? filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
				: filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

		const paginated = sorted.slice(pp * page - pp, pp * page);

		res.status(200).json({
			count: paginated.length,
			tasks: paginated,
		});
	} catch (err) {
		res.status(400).json('task not created');
	}
});

export default getRouter;
