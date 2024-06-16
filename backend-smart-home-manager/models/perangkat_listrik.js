module.exports = (sequelize, DataTypes) => {
  const PerangkatListrik = sequelize.define('PerangkatListrik', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    jenis_perangkat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_inverter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    daya_listrik: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lama_pemakaian: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
    }
  }, {
    tableName: 'perangkat_listrik',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  })
  PerangkatListrik.associate = function (models) {
    // associations can be defined here
  };
  return PerangkatListrik;
}
