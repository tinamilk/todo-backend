import jwt from 'jsonwebtoken';
import db from '../models/index.js';

export const authMidleware = async (req, res, next) => {
	try {
		const token = req?.headers?.authorization?.replace('Bearer ', '');

		if (token) {
			const userId = jwt.verify(token, process.env.TOKEN_SECRET);
			const user = await db.user.findByPk(userId.username);
			req.user = user;

			next();
		}
	} catch (err) {
		res.status(400).send('user not found');
	}
};
