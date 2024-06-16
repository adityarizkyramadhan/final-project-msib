module.exports = (sequelize, DataTypes) => {
  const LogIots = sequelize.define('LogIots', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    device_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('nyala', 'mati'),
      allowNull: false,
      defaultValue: 'mati',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'LogIots',
    tableName: 'log_iots',
    underscored: true,
    paranoid: false,
    createdAt: 'created_at',
    updatedAt: false,
    deletedAt: false,
  });
  return LogIots;
};
