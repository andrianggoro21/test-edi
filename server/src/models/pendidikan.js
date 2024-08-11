module.exports = (sequelize, Sequelize) => {
  const Pendidikan = sequelize.define(
    "pendidikan",
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
      jenjang: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      nama_institusi: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      jurusan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tahun_masuk: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      tahun_lulus: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      ipk: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "pendidikan",
    }
  );

  Pendidikan.associate = (models) => {
    Pendidikan.belongsTo(models.biodata_calon_karyawan, {
      foreignKey: "biodata_id",
    });
  };

  return Pendidikan;
};
