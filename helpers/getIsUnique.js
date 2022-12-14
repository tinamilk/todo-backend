import { readJSON } from './JSONdata.js';

export const getIsUnique = async (title, id = null) => {

	const tasks = await readJSON();

	return tasks.find(
		(task) => id ? task.title === title && task.id !== id : task.title === title
	);
};
