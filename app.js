import config from 'config';
import express from 'express';
import bodyParser from 'body-parser';
import recursive from 'recursive-readdir-sync';
const port = config.get('Customer.dbConfig.port');

const app = express();
const PORT = port || 3030;

app.use(bodyParser.json());

recursive(`${__dirname}/routes`)
	.forEach(async (file) => {
		const path = await import(file);
		app.use('/', path.default);
	});

app.listen(PORT, () => console.log(`Its started ${new Date()} on ${PORT}`));