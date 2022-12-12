const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Product", {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    description: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
        notEmpty: true
      }
    },
    price:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    availability:{
       type: DataTypes.BOOLEAN,
       defaultValue: true
    },
    image:{
        type: DataTypes.STRING,
        allowNull:false 
    },
    stock:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
      type: DataTypes.ENUM([
        "arcor",
        "felfort",
        "bagley",
        "georgalos",
        "mogul",
        "tofi",
        "godet",
        "topline",
        "aguila",
        "bon o bon",
        "cofler",
        "unknown",
        "bonafide",
        "milka",
        "jorgito",
        "trident",
        "ferrero",
        "terrabusi",
        "nestle",
        "billiken",
      ]),
      defaultValue: "unknown",
    },
    tacc: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
    },
    {
      timestamps: false
    }
  );
};
