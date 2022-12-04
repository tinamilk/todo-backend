import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.redirect('/tasks/?pp=5&page=1');
});

export default router;
