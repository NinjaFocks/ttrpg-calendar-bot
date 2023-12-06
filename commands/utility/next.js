const { SlashCommandBuilder } = require('discord.js');
const { Op } = require("sequelize");
const moment = require('moment');

const sequelize = require('../../sequelize');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('next')
		.setDescription('Return details of the next game running'),

	async execute(interaction) {				
		
		const results = await sequelize.models.events.findAll({
			where: {
				date: {
					[Op.gte]: new Date().getDate()
				}
			},
			order: [
				['date', 'ASC']
			]
		});
		
		if (results.length == 0) {
			await interaction.reply('There are no games currently scheduled.');	
		}
		else {
			const next = results[0];
			
			await interaction.reply('The next game is ' + next.name + ' run by <@' + next.dmId + '> on ' + moment(next.date).format('dddd Do MMM YYYY') + ' at ' + moment(next.date).format('HH:mm') );	
		}
	},
};