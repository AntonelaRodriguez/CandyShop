const { DataTypes, Sequelize } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Detail",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
        },
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true
        }
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};