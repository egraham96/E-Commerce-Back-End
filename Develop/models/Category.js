const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  {
    id: {
      //
      type: DataTypes.INTEGER,
      // prevents null values
      allowNull: false,
      // sets to primary key
      primaryKey: true,
      // auto increments
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      // prevents null values
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;