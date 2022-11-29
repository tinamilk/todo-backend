import * as fs from 'node:fs';
import {v4 as uuidv4} from 'uuid';

let jsonData;

fs.readFile('hello.json', 'utf8', (error,data) => {
	if(error) throw error;
	jsonData = JSON.parse(data);
});


export const postTodo = (req, res) => {
  
	const tasks = jsonData;
    
	if (req.body.title && tasks.findIndex(task => task.title === req.body.title) === -1) {

		tasks.push({
			title: req.body.title,
			date: new Date(),
			id: uuidv4(),
			isDone: false
		});

		fs.writeFile('hello.json', JSON.stringify(tasks), (err) => {
			if (err) throw new Error();
			else {
				res.status(200).send('Status Working');
			}
		});
	} else {
		res.status(422).send('Bad request');
	}
};