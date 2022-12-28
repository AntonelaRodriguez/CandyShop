const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      orderN:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,         
      },
      date:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW           
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM,
        values: ['created', 'processing', 'cancelled', 'completed', 'delivered','recived'],
        defaultValue: 'created',
        allowNull: false
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};