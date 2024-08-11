'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('riwayat_pelatihan', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      biodata_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'biodata_calon_karyawan',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
        type: Sequelize.ENUM('Ada', 'Tidak'),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('riwayat_pelatihan');
  }
};
