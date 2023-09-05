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
				unique: true,
				validate: {
					len: [2, 100],
				},
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					len: [2, 2000],
				},
			},
			released: {
				type: DataTypes.DATEONLY,
			},
			rating: {
				type: DataTypes.DECIMAL,
				validate: {
					min: 0,
					max: 5,
				},
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
