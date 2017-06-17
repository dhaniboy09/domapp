module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
     title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This title already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Content cannot be empty'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'public',
      validate: {
        isIn: [['public', 'private', 'role']]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'OwnerId must be an integer'
        }
      }
    },
    userRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      // associations can be defined here
      associate: (models) => {
        Document.belongsTo(models.User, { 
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Document;
};