import express from 'express';

const redirectRouter = express.Router();

redirectRouter.get('/', (req, res) => {
	res.redirect('/tasks');
});

export default redirectRouter;