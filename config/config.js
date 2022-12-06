import * as dotenv from 'dotenv';
dotenv.config();

export default {
	development: {
		username: procces.env.USER,
		password: procces.env.PASSWORD,
		database: procces.env.DB,
		host: procces.env.HOST,
		dialect: procces.env.DIALECT,
	},
	test: {
		username: procces.env.USER,
		password: procces.env.PASSWORD,
		database: procces.env.DB,
		host: procces.env.HOST,
		dialect: procces.env.DIALECT,
	},
	production: {
		username: procces.env.USER,
		password: procces.env.PASSWORD,
		database: procces.env.DB,
		host: procces.env.HOST,
		dialect: procces.env.DIALECT,
	},
};