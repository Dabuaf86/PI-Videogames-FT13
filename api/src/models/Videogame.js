const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("Videogame", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    // platforms: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    Image: {
      type: DataTypes.STRING,
    },
  });
};
