export default (sequelize, Sequelize) => {
	const Task = sequelize.define('task', {
		title: {
			type: Sequelize.STRING
		},
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true,
			
		},
		createdAt: {
			type: Sequelize.DATE
		}, 
		updatedAt: {
			type: Sequelize.DATE
		},
		isDone: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		}
	});
  
	return Task;
};