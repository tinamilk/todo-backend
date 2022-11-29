import { readJSON } from '../../helpers/JSONdata.js';


export const getTodos = async(req, res) => {

	try {
		const tasks = await readJSON();

		res.status(200).json({
			count: tasks.length,
			tasks: tasks
		});
	} catch (err) {
		res.status(400).json('task not created');
	}

};