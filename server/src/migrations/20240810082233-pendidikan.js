'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pendidikan', {
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
    await queryInterface.dropTable('pendidikan');
  }
};
