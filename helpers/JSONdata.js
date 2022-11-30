import { promises as fs } from 'fs';


export const writeJSON = async(data) => {	
	await fs.writeFile('hello.json',  JSON.stringify(data, null, 4));		
};

export const readJSON = async() => {
	const data = await fs.readFile('hello.json', 'utf8');
	return JSON.parse(data);
};