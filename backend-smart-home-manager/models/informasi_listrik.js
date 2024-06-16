module.exports = (sequelize, DataTypes) => {
  const InformasiListrik = sequelize.define('InformasiListrik', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: DataTypes.UUIDV4,
    },
    daya: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis_pembayaran: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {
    tableName: 'informasi_listrik',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  });
  InformasiListrik.associate = function (models) {
    // associations can be defined here
  };
  return InformasiListrik;
}
