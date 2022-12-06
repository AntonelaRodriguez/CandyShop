const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		"ProdPic",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			url: {
				type: DataTypes.STRING,
				defaultValue: 'https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'
			}
		}
	)
}