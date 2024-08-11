'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('riwayat_pekerjaan', {
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
    await queryInterface.dropTable('riwayat_pekerjaan');
  }
};
