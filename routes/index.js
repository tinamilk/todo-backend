import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();


const redirectRouter = express.Router();

redirectRouter.get(process.env.DEFAULT_ENDPOINT, (req, res) => {
	res.redirect(TASKS_DEFAULT_ENDPOINT);
});


export default redirectRouter;