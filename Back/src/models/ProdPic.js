const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		"ProdPic",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}
	)
}