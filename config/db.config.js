import * as dotenv from 'dotenv';
dotenv.config();

export default {
	HOST: procces.env.PORT,
	USER: procces.env.USER,
	PASSWORD: procces.env.PASSWORD,
	DB: procces.env.DB,
	dialect: procces.env.DIALECT,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};