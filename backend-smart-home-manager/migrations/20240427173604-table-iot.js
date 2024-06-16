'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable('iot', {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
        device_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fcm_token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      }, { transaction: t });
    });

    await queryInterface.createTable('connectivity', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      receiver_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sensor_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('iot');
    await queryInterface.dropTable('connectivity');
  }
};
