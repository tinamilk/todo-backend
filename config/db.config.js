import * as dotenv from 'dotenv';
dotenv.config();

const config =  {
	HOST: process.env.HOST,
	USER: process.env.USER_NAME,
	PASSWORD: process.env.PASSWORD,
	DB: process.env.DB,
	dialect: 'postgres',
};

export default config;