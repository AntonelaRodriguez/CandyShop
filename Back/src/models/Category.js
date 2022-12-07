const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Category", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type: DataTypes.ENUM(["bubble gum", "lollipop", "alfajor", "candy", "chocolate", "gummies","tablets", "biscuits","cereal bars","unknown"]),
        defaultValue: "unknown"
    }
    },
    {
      timestamps: false
    }
  );
};

