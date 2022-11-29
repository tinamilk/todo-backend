/* eslint-disable no-undef */
import {v4 as uuidv4} from 'uuid';
const tasks = [];

export const getTodos = (req, res) => {
	res.status(200).json({
		count: tasks.length,
		tasks: tasks
	});
};

export const postTodo = (req, res) => {
  
	if (req.body.title && tasks.findIndex(task => task.title === req.body.title) === -1) {
		res.status(200).send('Status Working');
		tasks.push({
			title: req.body.title,
			date: new Date(),
			id: uuidv4(),
			isDone: false
		});
	} else {
		res.status(422).send('Bad request');
	}
};

export const deleteTask = (req, res) => {
	const taskIndex = tasks.findIndex(task => task.id === req.params.id);

	if (taskIndex !== -1) {
		tasks.splice(index, 1);
		res.status(200).send('Success!');
	} else {
		res.status(404).send('Task not found');
	}
};