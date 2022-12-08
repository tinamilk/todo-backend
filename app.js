import express from 'express';
import bodyParser from 'body-parser';
import recursive from 'recursive-readdir-sync';
import cors from 'cors';
import * as url from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const port = process.env.PORT;

const app = express();
const PORT = port || 3030;


const corsOptions = {
	origin: process.env.HOST_URL,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


recursive(`${__dirname}/routes`).forEach(async (file) => {
	const path = await import(file);
	app.use('/', path.default);
});

app.listen(PORT, () => console.log(`Its started ${new Date()} on ${PORT}`));
