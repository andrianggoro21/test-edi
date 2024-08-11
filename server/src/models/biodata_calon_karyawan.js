module.exports = (sequelize, Sequelize) => {
    const BiodataCalonKaryawan = sequelize.define(
      "biodata_calon_karyawan",
      {
        posisi_yang_dilamar: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        nama: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        no_ktp: {
          type: Sequelize.STRING(20),
          unique: true,
          allowNull: false,
        },
        tempat_lahir: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        tanggal_lahir: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        jenis_kelamin: {
          type: Sequelize.ENUM('Laki-laki', 'Perempuan'),
          allowNull: false,
        },
        agama: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        golongan_darah: {
          type: Sequelize.ENUM('A', 'B', 'AB', 'O'),
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        alamat_ktp: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        alamat_tinggal: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        no_telp: {
          type: Sequelize.STRING(20),
          unique: true,
          allowNull: false,
        },
        bersedia_ditempatkan: {
          type: Sequelize.ENUM('Ya', 'Tidak'),
          allowNull: false,
        },
        penghasilan_diharapkan: {
          type: Sequelize.DECIMAL(15, 0),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        timestamps: true,
        tableName: "biodata_calon_karyawan",
      }
    );
  
    BiodataCalonKaryawan.associate = (models) => {
      BiodataCalonKaryawan.belongsTo(models.user, { foreignKey: "user_id" });
      BiodataCalonKaryawan.hasMany(models.pendidikan, { foreignKey: "biodata_id" });
      BiodataCalonKaryawan.hasMany(models.riwayat_pelatihan, { foreignKey: "biodata_id" });
      BiodataCalonKaryawan.hasMany(models.riwayat_pekerjaan, { foreignKey: "biodata_id" });
      BiodataCalonKaryawan.hasMany(models.skill, { foreignKey: "biodata_id" });
    };
  
    return BiodataCalonKaryawan;
  };
  