const { DataTypes} = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		"Review",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true
			},
			author: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				defaultValue: 'User Review'
			},
			description: {
				type: DataTypes.STRING(150),
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			rating: {
				type: DataTypes.DECIMAL,
				allowNull: false
			},
		}
	)
}