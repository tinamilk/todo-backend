export default (sequelize, Sequelize) => {
	const Task = sequelize.define('Tasks', {
		title: {
			type: Sequelize.STRING,
			unique: true,
		},
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		isDone: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
	}, {
		sequelize,
		tableName: 'Tasks',
		modelName: 'Task',
	});

	return Task;
};
