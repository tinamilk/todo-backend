import { readJSON, writeJSON } from '../../helpers/JSONdata.js';

export const changeTask = async(req, res) => {
	try {
		const tasks = await readJSON();
		const taskIndex = tasks.findIndex(task => task.id === req.params.id);

		if (taskIndex !== -1 && req.body.title && req.body.title.split(' ')) {
			tasks[taskIndex] = {...tasks[taskIndex], ...req.body};
			await writeJSON(tasks);
			res.status(200).send('Success');
			return;
			
		}
		res.status(422).send('Invalid request');

	} catch (err) {
		res.status(400).send('Not created');
	}

};