'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		return queryInterface.bulkInsert('Tasks', [
			{
				title: 'task',
				userId: '08337672-20ec-4a53-9e0b-38e7b7a84b53',
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
