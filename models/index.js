import Sequelize from 'sequelize';
import task from './tasks.js';
import user from './user.js';
import * as dotenv from 'dotenv';
dotenv.config();

const baseEnv =
	process.env.NODE_ENV === 'development'
		? [process.env.DB, process.env.USER_NAME, process.env.PASSWORD]
		: [process.env.PSQL_DATA];

const hostEnv = process.env.NODE_ENV === 'development' && {
	host: process.env.HOST,
	dialect: 'postgres',
	operatorsAliases: false,
};

const sequelize = new Sequelize(...baseEnv, {
	...hostEnv,
	logging: false,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.task = task(sequelize, Sequelize);
db.user = user(sequelize, Sequelize);

export default db;
