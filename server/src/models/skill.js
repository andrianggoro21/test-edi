module.exports = (sequelize, Sequelize) => {
  const Skill = sequelize.define(
    "skill",
    {
      biodata_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "biodata_calon_karyawan",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      nama_skill: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tingkat_skill: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "skill",
    }
  );

  Skill.associate = (models) => {
    Skill.belongsTo(models.biodata_calon_karyawan, {
      foreignKey: "biodata_id",
    });
  };

  return Skill;
};
