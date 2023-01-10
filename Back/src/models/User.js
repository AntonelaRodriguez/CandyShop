const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      subscribed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      // tableName: "users",
      timestamps: false,
      createdAt: false
    }
  )
}
