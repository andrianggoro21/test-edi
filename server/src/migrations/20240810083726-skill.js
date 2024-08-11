'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('skill', {
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
      nama_skill: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tingkat_skill: {
        type: Sequelize.STRING(50),
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
    await queryInterface.dropTable('skill');
  }
};
