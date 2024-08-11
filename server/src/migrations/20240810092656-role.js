'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      role_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
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
      },
    });

    // // Seed roles
    // await queryInterface.bulkInsert('roles', [
    //   { role_name: 'admin', createdAt: new Date(), updatedAt: new Date() },
    //   { role_name: 'user', createdAt: new Date(), updatedAt: new Date() },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  },
};
