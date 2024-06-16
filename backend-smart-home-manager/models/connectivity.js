module.exports = (sequelize, DataTypes) => {
  const Connectivity = sequelize.define('Connectivity', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sensor_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'connectivity',
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  Connectivity.associate = function (models) {
    // associations can be defined here
  };
  return Connectivity;
}
