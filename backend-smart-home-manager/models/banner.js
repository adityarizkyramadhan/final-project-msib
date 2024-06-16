module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'banners',
    timestamps: false,
    freezeTableName: true,
  })
  return Banner;
}
