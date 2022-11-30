import {v4 as uuidv4} from 'uuid';
import { writeJSON, readJSON } from '../../helpers/JSONdata.js';


export const postTodo = async(req, res) => {

	try {
		const tasks = await readJSON();

		if (!req.body.title && !req.body.title.split(' ')) {
			res.status(422).send('Bad request');
			return;
		} if (tasks.findIndex(task => task.title === req.body.title) !== -1) {
			res.status(400).send('Task with the same name exists');
			return;
		}

		tasks.push({
			title: req.body.title,
			date: new Date(),
			id: uuidv4(),
			isDone: false
		});

		await writeJSON(tasks);
		res.status(200).send('Status Working');

	} catch (err) {
		res.status(422).send('Bad request');
	}
  
};