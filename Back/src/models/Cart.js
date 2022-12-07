const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      state: {
        type: DataTypes.ENUM,
        values: ['cart', 'created', 'processing', 'cancelled', 'completed' ],
        defaultValue: 'cart',
        allowNull: false
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};