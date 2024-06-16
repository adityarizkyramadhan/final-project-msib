'use strict';
const {
  Ruangan
} = require('../models');
const { v4: uuid } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const ruangans = [
      {
        id: uuid(),
        name: "Ruang Keluarga",
      },
      {
        id: uuid(),
        name: "Ruang Makan",
      },
      {
        id: uuid(),
        name: "Ruang Tidur",
      },
      {
        id: uuid(),
        name: "Ruang Tamu",
      },
      {
        id: uuid(),
        name: "Ruang Kerja",
      },
      {
        id: uuid(),
        name: "Ruang Mandi",
      },
      {
        id: uuid(),
        name: "Ruang Dapur",
      },
      {
        id: uuid(),
        name: "Ruang Cuci",
      },
      {
        id: uuid(),
        name: "Ruang Jemur",
      },
      {
        id: uuid(),
        name: "Ruang Parkir",
      },
      {
        id: uuid(),
        name: "Taman"
      },
      {
        id: uuid(),
        name: "Kolam Renang"
      },
      {
        id: uuid(),
        name: "Gudang"
      },
      {
        id: uuid(),
        name: "Garasi"
      },
      {
        id: uuid(),
        name: "Ruang Fitness"
      },
      {
        id: uuid(),
        name: "Ruang Musik"
      },
      {
        id: uuid(),
        name: "Ruang Belajar"
      }
    ]
    for (const ruangan of ruangans) {
      const isFind = await Ruangan.findOne({ where: { name: ruangan.name } })
      if (!isFind) {
        await Ruangan.create(ruangan)
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await Ruangan.destroy({ truncate: true })
  }
};
