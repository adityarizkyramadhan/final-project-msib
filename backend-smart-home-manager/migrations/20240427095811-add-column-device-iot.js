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
    await queryInterface.sequelize.transaction(async (transaction) => {
      // tambahkan kolom is_on pada tabel device_iots
      await queryInterface.addColumn('device_iots', 'is_on', {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }, { transaction });

      await queryInterface.createTable('log_iots', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        device_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: Sequelize.DataTypes.ENUM('nyala', 'mati'),
          allowNull: false,
          defaultValue: 'mati',
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
      }, { transaction });
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('device_iots', 'is_on', { transaction });
      await queryInterface.dropTable('log_iots', { transaction });
    });
  }
};
