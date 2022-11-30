import { readJSON } from './JSONdata.js';

export const validateTitle = async (title, id) => {
	const tasks = await readJSON();
	const sameTitleTask = tasks.find(
		(task) => task.title === title && task.id !== id
	);

	return title && title.split(' ').join('') && !sameTitleTask;
};
