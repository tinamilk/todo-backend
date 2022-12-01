import express from 'express';

const redirectRouter = express.Router();

redirectRouter.get('/', (req, res) => {
	res.redirect('/tasks/pp=5&page=1');
});


export default redirectRouter;