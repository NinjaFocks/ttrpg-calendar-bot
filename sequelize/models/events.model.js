const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('events', {
	name: {
		type: DataTypes.STRING,
        allowNull: false
	},
	description: DataTypes.TEXT,
	dmId: DataTypes.TEXT,
	date: {
        type: DataTypes.DATE,
        allowNull: false
    },
	server: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	createdById: DataTypes.TEXT
});