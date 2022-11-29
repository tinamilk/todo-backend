import * as fs from 'node:fs';


export const readJSON = () => {

	const data = fs.readFileSync('hello.json', 'utf8');
	return JSON.parse(data);

};

