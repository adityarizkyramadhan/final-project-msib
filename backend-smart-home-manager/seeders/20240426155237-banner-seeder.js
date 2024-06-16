'use strict';
const {
  Banner
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
    const data = [
      {
        "id": uuid(),
        "link": "https://is3.cloudhost.id/storage-foto/ciputra-banner/Item1.png"
      },
      {
        "id": uuid(),
        "link": "https://is3.cloudhost.id/storage-foto/ciputra-banner/Item2.png"
      },
      {
        "id": uuid(),
        "link": "https://is3.cloudhost.id/storage-foto/ciputra-banner/Item3.png"
      }
    ]
    for (const element of data) {
      const isFind = await Banner.findOne({ where: { link: element.link } })
      if (!isFind) {
        await Banner.create(element)
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
    await Banner.destroy({ truncate: true })
  }
};
