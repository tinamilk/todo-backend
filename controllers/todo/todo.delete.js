import { readJSON, writeJSON } from '../../helpers/JSONdata.js';

export const deleteTask = async(req, res) => {

	try {
		const tasks = await readJSON();
		const taskIndex = tasks.findIndex(task => task.id === req.params.id);

		if (taskIndex !== -1) {
			tasks.splice(taskIndex, 1);
			writeJSON(tasks);
			console.log(tasks);
			res.status(200).send('successs');
		}

		res.status(404).send('Task not found');


	} catch (err) {
		res.status(404).send('Task not found');
	}

};