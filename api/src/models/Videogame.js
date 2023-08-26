const { DataTypes, UUIDV4 } = require('sequelize');

const Videogame = sequelize => {
	sequelize.define(
		'Videogame',
		{
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
				type: DataTypes.DATEONLY,
			},
			rating: {
				type: DataTypes.DECIMAL,
			},
			image: {
				type: DataTypes.TEXT,
			},
			created: {
				type: DataTypes.BOOLEAN,
			},
		},
		{
			timestamps: false,
		}
	);
};

module.exports = Videogame;
