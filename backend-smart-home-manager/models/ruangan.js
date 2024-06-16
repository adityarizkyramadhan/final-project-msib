module.exports = (sequelize, DataTypes) => {
  const Ruangan = sequelize.define('Ruangan', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'ruangans',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
  Ruangan.associate = function (models) {
    // associations can be defined here
    Ruangan.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
  };
  return Ruangan;
};
