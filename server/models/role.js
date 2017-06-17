module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, { foreignKey: 'roleId' })
      }
    }
  });
  return Role;
};