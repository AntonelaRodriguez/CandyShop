const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
	sequelize.define(
		"ProdPic",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4
			},
			image: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}
	)
}