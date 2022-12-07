'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		return queryInterface.bulkInsert('Tasks', [
			{
				title: 'task',
				id: '56323e9b-d551-43ad-831e-84b2a9412af4',
				createdAt: new Date(),
				updatedAt: new Date(),
				isDone: false,
			},
		]);
	},

	async down(queryInterface) {
		return queryInterface.bulkDelete('Tasks', null, {});
	},
};
