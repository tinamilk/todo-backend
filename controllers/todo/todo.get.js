import * as fs from 'node:fs';

let jsonData;

fs.readFile('hello.json', 'utf8', (error,data) => {
	if(error) throw error;
	jsonData = JSON.parse(data);
});

export const getTodos = (req, res) => {

	const tasks = jsonData;
	res.status(200).json({
		count: tasks.length,
		tasks: tasks
	});
};