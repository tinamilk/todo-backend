import * as dotenv from 'dotenv';
dotenv.config();

export default {
	development: {
		username: process.env.USER_NAME,
		password: process.env.PASSWORD,
		database: process.env.DB,
		host: process.env.HOST,
		dialect: 'postgres',
	},
	test: {
		username: process.env.USER_NAME,
		password: process.env.PASSWORD,
		database: process.env.DB,
		host: process.env.HOST,
		dialect: 'postgres',
	},
	production: {
		username: process.env.USER_NAME,
		password: process.env.PASSWORD,
		database: process.env.DB,
		host: process.env.HOST,
		dialect: 'postgres',
	},
};