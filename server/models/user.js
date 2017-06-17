module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
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
      unique: {
        msg: 'This email is already taken.'
      },
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
        User.belongsTo(models.Role, { foreignKey: 'roleId' });
        User.hasMany(models.Document, { foreignKey: 'userId' });
      }
    }
  });
  return User;
};