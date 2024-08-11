module.exports = (sequelize, Sequelize) => {
  const RiwayatPekerjaan = sequelize.define(
    "riwayat_pekerjaan",
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
      nama_perusahaan: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      posisi: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      pendapatan: {
        type: Sequelize.DECIMAL(15, 0),
        allowNull: false,
      },
      tahun_mulai: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      tahun_selesai: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "riwayat_pekerjaan",
    }
  );

  RiwayatPekerjaan.associate = (models) => {
    RiwayatPekerjaan.belongsTo(models.biodata_calon_karyawan, {
      foreignKey: "biodata_id",
    });
  };

  return RiwayatPekerjaan;
};
