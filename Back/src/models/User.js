const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'User',
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
      dni: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.INTEGER
      },
      address: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      banned: {
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
