module.exports = (sequelize, Sequelize) => {
  const OrangTerdekat = sequelize.define(
    "orang_terdekat",
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
      nama: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      no_telp: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "orang_terdekat",
    }
  );

  OrangTerdekat.associate = (models) => {
    OrangTerdekat.belongsTo(models.biodata_calon_karyawan, {
      foreignKey: "biodata_id",
    });
  };

  return OrangTerdekat;
};
