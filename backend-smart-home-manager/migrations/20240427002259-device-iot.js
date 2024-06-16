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
      await queryInterface.createTable('device_iots', {
        id: {
          type: Sequelize.DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        jenis_perangkat : {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        daya_listrik : {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        ruangan : {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        mode: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        config: {
          type: Sequelize.DataTypes.JSON,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.NOW,
        },
        deleted_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
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
      await queryInterface.dropTable('device_iots', { transaction });
    });
  }
};
