'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('informasi_listrik', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        daya: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        jenis_pembayaran: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.UUID,
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
      await queryInterface.createTable('perangkat_listrik', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.DataTypes.UUIDV4,
        },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: true,
        },
        jenis_perangkat: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        jenis_inverter: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        jumlah: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        daya_listrik: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        lama_pemakaian: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
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
      });
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('informasi_listrik', { transaction });
      await queryInterface.dropTable('perangkat_listrik', { transaction });
    });
  }
};
