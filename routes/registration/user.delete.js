import express from 'express';
import db from '../../models/index.js';
const User = db.user;

const router = express.Router();

router.delete('/user/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const deleted = await User.destroy({
			where: { id: id },
			returning: true,
		});

		if (deleted == 1) {
			return res.json({
				message: 'User was deleted successfully!',
			});
		}
		return res.json({
			message: `Cannot delete User with id=${id}. User was not found!`,
		});
	} catch (err) {
		if (err.name === 'SequelizeDatabaseError') {
			return res.status(400).json({
				message: `Id=${id} is not correct!`,
			});
		}
		return res.status(500).json({
			message: err.errors?.map((e) => e.message) || 'Cannot delete User',
		});
	}
});


export default router;