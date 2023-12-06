const { SlashCommandBuilder } = require('discord.js');
const sequelize = require('../../sequelize');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Creates a new event')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('Name of the Game')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('description')
				.setDescription('Short description of the game'))
		.addUserOption(option =>
			option.setName('gm')
				.setDescription('Tag the person running the game'))
		.addStringOption(option =>
			option.setName('date')
				.setDescription('Date of the game (YYYY-MM-DD HH:MM:SS)')
				.setRequired(true)),

	async execute(interaction) {			
		const options = interaction.options._hoistedOptions;
		sequelize.models.events.create({
			name: options.find(x => x.name == 'name').value,
			description: options.find(x => x.name == 'description').value,
			dmId: options.find(x => x.name == 'gm').value,
			date: options.find(x => x.name == 'date').value,
			server: interaction.guildId,
			createdById: interaction.user.id,
			createdByName: interaction.user.username
		});

		await interaction.reply('Event created!');
	},
};