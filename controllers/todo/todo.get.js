import { readJSON } from '../../helpers/readJSON.js';


export const getTodos = (req, res) => {

	const tasks = readJSON();

	tasks 
		? res.status(200).json({
			count: tasks.length,
			tasks: tasks
		})
		: res.status(400).json('task not created');
};