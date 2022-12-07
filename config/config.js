import * as dotenv from 'dotenv';
dotenv.config();

export default {
	development: {
		username: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DB,
		host: process.env.HOST,
		dialect: process.env.DIALECT,
	},
	test: {
		username: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DB,
		host: process.env.HOST,
		dialect: process.env.DIALECT,
	},
	production: {
		username: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DB,
		host: process.env.HOST,
		dialect: process.env.DIALECT,
	},
};