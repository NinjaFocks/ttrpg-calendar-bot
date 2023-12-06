const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

// Setup sqlite DB
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const modelDefiners = [
	require('./models/events.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// Check tables are sync'd
(async () => {
	await sequelize.sync();
	// Code here
  })();

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;