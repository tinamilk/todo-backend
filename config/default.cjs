require('dotenv').config();

export default {
	Customer: {
		dbConfig: {
			host: procces.env.HOST,
			port: procces.env.PORT,
			dbName: procces.env.DB,
		},
		credit: {
			initialLimit: 100,
			initialDays: 1,
		},
	},
};
