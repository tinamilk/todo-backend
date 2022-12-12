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
			return res.send('error');
		}

		const bcrypted = await bcrypt.compare(req.body.password, user.password);

		if (!bcrypted) {
			return res.send('wrong password');
		}

		const accessToken = generateAccessToken({ username: user.id });
		console.log(accessToken);
		return res.status(200).json({accessToken});
	} catch (err) {
		console.log(err);
		return res.send(err);
	}
});

export default router;
