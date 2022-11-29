import * as fs from 'node:fs';

let jsonData;

fs.readFile('hello.json', 'utf8', (error,data) => {
	if(error) throw error;
	jsonData = JSON.parse(data);
});

export const deleteTask = (req, res) => {
	const tasks = jsonData;
	const taskIndex = tasks.findIndex(task => task.id === req.params.id);

	taskIndex === -1 && res.status(404).send('Task not found');

	tasks.splice(taskIndex, 1);
	fs.writeFile('hello.json', JSON.stringify(tasks), (err) => {

		err
			? res.status(404).send('Task not found')
			: res.status(200).send('Success');
	});

};