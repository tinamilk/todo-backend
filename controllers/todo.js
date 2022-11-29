// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// import {v4 as uuidv4} from 'uuid';
// const tasks = [];

// import * as fs from 'node:fs';

// export const getTodos = (req, res) => {
// 	res.status(200).json({
// 		count: tasks.length,
// 		tasks: tasks
// 	});
// };

// export const postTodo = (req, res) => {
  
// 	if (req.body.title && tasks.findIndex(task => task.title === req.body.title) === -1) {
// 		res.status(200).send('Status Working');
// 		tasks.push({
// 			title: req.body.title,
// 			date: new Date(),
// 			id: uuidv4(),
// 			isDone: false
// 		});
// 	} else {
// 		res.status(422).send('Bad request');
// 	}
// };

// export const deleteTask = (req, res) => {
// 	const taskIndex = tasks.findIndex(task => task.id === req.params.id);

// 	if (taskIndex !== -1) {
// 		tasks.splice(taskIndex, 1);
// 		res.status(200).send('Success!');
// 	} else {
// 		res.status(404).send('Task not found');
// 	}
// };

// export const changeTask = (req, res) => {
// 	const taskIndex = tasks.findIndex(task => task.id === req.params.id);

// 	if (taskIndex !== 1) {
// 		tasks[taskIndex] = req.body;
// 		res.status(200).send('Success!');
// 	} else {
// 		res.status(404).send('Task not found');
// 	}
// };

// fs.readFile('hello.json', 'utf8', 
// 	function(error,data){
// 		if(error) throw error; // если возникла ошибка
// 		console.log(data);  // выводим считанные данные
// 	});