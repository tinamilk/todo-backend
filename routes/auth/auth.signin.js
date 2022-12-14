import express from 'express';
import db from '../../models/index.js';
const User = db.user;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

function generateAccessToken(username) {
	return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

router.post('/auth/signin', async (req, res) => {
	try {
		const user = await User.findOne({
			where: { email: req.body.email },
		});

		if (!user) {
			return res.status(404).send('user not found');
		}

		const bcrypted = await bcrypt.compare(req.body.password, user.password);

		if (!bcrypted) {
			return res.send('wrong password');
		}

		const accessToken = generateAccessToken({ username: user.id });

		return res.status(200).json({ accessToken, name: user.userName });
	} catch (err) {
		return res.send(err);
	}
});

export default router;
