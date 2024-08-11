'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Menambahkan seed untuk tabel 'roles'
    await queryInterface.bulkInsert('roles', [
      {
        role_name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_name: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Menghapus seed dari tabel 'roles'
    await queryInterface.bulkDelete('roles', null, {});
  }
};
