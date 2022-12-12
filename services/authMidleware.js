import jwt from 'jsonwebtoken';
import db from '../models/index.js';

export const authMidleware = async (req, res, next) => {
	try {
		console.log(req.headers.authorization);
		const token = req?.headers?.authorization?.replace('Bearer ', '');
		console.log('token', token);

		if (token) {
			const userId = jwt.verify(token, process.env.TOKEN_SECRET);
			console.log('userId', userId);
			const user = await db.user.findByPk(userId.username);
			console.log('user', user);
			req.user = user;

			next();
		}
	} catch (err) {
		console.log(err);
		res.status(400).send('user not found');
	}
};
