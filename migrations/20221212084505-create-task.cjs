'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Tasks', {
			title: {
				type: Sequelize.STRING,
				unique: true,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
			},
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			isDone: {
				type: Sequelize.BOOLEAN,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable('Tasks');
	},
};
