'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		return queryInterface.bulkInsert('Users', [
			{
				id: '08337672-20ec-4a53-9e0b-38e7b7a84b53',
				userName: 'username',
				email: 'mail@mail.com',
				password: 'password123',
				createdAt: new Date(),
				updatedAt: new Date()
			},
		]);
	},

	async down(queryInterface) {
		return queryInterface.bulkDelete('Users', null, {});
	},
};
