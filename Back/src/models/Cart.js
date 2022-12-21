const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      orderN:{
        type: DataTypes.STRING,
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
        values: ['created', 'processing', 'cancelled', 'completed' ],
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