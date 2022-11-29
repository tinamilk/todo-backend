import * as fs from 'node:fs';

let jsonData;

fs.readFile('hello.json', 'utf8', (error,data) => {
	if(error) throw error;
	jsonData = JSON.parse(data);
});

export const changeTask = (req, res) => {
	const tasks = jsonData;
	const taskIndex = tasks.findIndex(task => task.id === req.params.id);

	if (taskIndex !== 1) {
		tasks[taskIndex] = req.body;

		fs.writeFile('hello.json', JSON.stringify(tasks), (err) => {
			if (err) throw new Error();
			else {//
				res.status(200).send('Success');
			}
		});
	} else {
		res.status(404).send('Task not found');
	}
};