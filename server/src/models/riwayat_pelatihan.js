module.exports = (sequelize, Sequelize) => {
  const RiwayatPelatihan = sequelize.define(
    "riwayat_pelatihan",
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
      nama_pelatihan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      penyelenggara: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tahun_pelaksanaan: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      sertifikat: {
        type: Sequelize.ENUM("Ada", "Tidak"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "riwayat_pelatihan",
    }
  );

  RiwayatPelatihan.associate = (models) => {
    RiwayatPelatihan.belongsTo(models.biodata_calon_karyawan, {
      foreignKey: "biodata_id",
    });
  };

  return RiwayatPelatihan;
};
