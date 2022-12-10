import express from 'express';
import db from '../../models/index.js';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const User = db.user;
dotenv.config();

function generateAccessToken(username) {
	return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

const router = express.Router();

router.post('/user/signup', async (req, res) => {
	try {
		const { body } = req;

		const hashedPassword = await bcrypt.hash(body.password, saltRounds);

		const user = await User.create({
			userName: body.userName,
			email: body.email,
			password: hashedPassword,
		});

		console.log(user);

		const accessToken = generateAccessToken({ username: user.id });
		return res.json(accessToken);
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
});

export default router;
