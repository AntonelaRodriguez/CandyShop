const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'UserDetail',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
       companyName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      phoneNumber: {
        type: DataTypes.INTEGER
      },
      address: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      }
    },
    {
      //tableName: "users",
      timestamps: false,
      createdAt: false
    }
  )
}
