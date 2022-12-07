import Sequelize from 'sequelize';
import task from './tasks.js';
import * as dotenv from 'dotenv';
dotenv.config();


const sequelize = new Sequelize(process.env.PSQL_DATA, {
	host: process.env.HOST,
	dialect: process.env.DIALECT,
	operatorsAliases: false,
	logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.task = task(sequelize, Sequelize);

export default db;
