import express from 'express';
import db from '../../models/index.js';
const User = db.user;

const router = express.Router();

router.get('/users/', async (req, res) => {
	try {
		const users = await User.findAll();

		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json({
			message: err.errors?.map((e) => e.message) || 'Cannot get users',
		});
	}
});

export default router;
