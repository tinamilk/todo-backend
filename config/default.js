import * as dotenv from 'dotenv';
dotenv.config();

export default {
	Customer: {
		dbConfig: {
			host: process.env.HOST,
			port: process.env.PORT,
			dbName: process.env.DB,
		},
		credit: {
			initialLimit: 100,
			initialDays: 1,
		},
	},
};
