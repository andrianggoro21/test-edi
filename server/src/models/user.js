module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      timestamps: true,
      tableName: "users",
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.role, { foreignKey: "role_id" });
    User.hasOne(models.biodata_calon_karyawan, { foreignKey: "user_id" });
  };

  return User;
};
