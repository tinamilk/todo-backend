import { promises as fs } from 'fs';


export const writeJSON = async(data) => {	
	await fs.writeFile('tasksData/hello.json',  JSON.stringify(data, null, 4));		
};

export const readJSON = async() => {
	const data = await fs.readFile('tasksData/hello.json', 'utf8');
	return JSON.parse(data);
};