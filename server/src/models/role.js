module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define(
      "role",
      {
        role_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: true,
        tableName: "roles",
      }
    );
  
    Role.associate = (models) => {
      Role.hasMany(models.user, { foreignKey: "role_id" });
    };
  
    return Role;
  };
  