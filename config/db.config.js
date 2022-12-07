import * as dotenv from 'dotenv';
dotenv.config();

const config =  {
	HOST: 'localhost',
	USER: 'postgres',
	PASSWORD: 'password123',
	DB: process.env.DB,
	dialect: process.env.DIALECT,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

export default config;