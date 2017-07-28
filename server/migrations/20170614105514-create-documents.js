module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Documents', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			content: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			access: {
				type: Sequelize.STRING,
				allowNull: false
			},
			userRoleId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			userId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'Users',
					key: 'id',
					as: 'userId',
				},
			},
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('Documents');
	}
};
