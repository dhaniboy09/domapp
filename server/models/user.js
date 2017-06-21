import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'First Name is required'
				}
			}
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Last Name is required'
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					msg: 'Email address is invalid'
				},
				notEmpty: {
					msg: 'Email is required'
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [6, 100],
					msg: 'Password length should range between 6 - 100 characters'
				},
				notEmpty: {
					msg: 'Password is required'
				}
			}
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			default: 2
		},
	}, {
		classMethods: {
			associate: (models) => {
				User.belongsTo(models.Role, {
					foreignKey: 'roleId',
					onDelete: 'CASCADE'
				});
				User.hasMany(models.Document, {
					foreignKey: 'userId',
					onDelete: 'CASCADE'
				});
			}
		},
	});
	const encryptPassword = (user) => {
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
	};
	User.beforeCreate((user) => {
		user.email = user.email.toLowerCase();
		encryptPassword(user);
	});
	User.beforeUpdate((user) => {
		user.email = user.email.toLowerCase();
		if (user.password) {
			encryptPassword(user);
		}
	});

	return User;
};
