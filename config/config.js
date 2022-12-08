import * as dotenv from 'dotenv';
dotenv.config();

export default {
	development: {
		username: process.env.USER_NAME,
		password: process.env.PASSWORD,
		database: process.env.DB,
		host: process.env.HOST,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
	live: {
		username: process.env.USER_NAME,
		password: process.env.PASSWORD,
		database: process.env.DB,
		host: process.env.HOST,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};