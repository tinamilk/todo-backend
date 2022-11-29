// eslint-disable-next-line no-undef
import express from 'express';


const router = express.Router();

router.get('/', function(req, res) {
	res.redirect('/tasks');
});