const { SlashCommandBuilder } = require('discord.js');
const fs = require('node:fs');

module.exports = {
	cooldown: 360,
	category: 'rpg',
	name: 'create-character',
	data: new SlashCommandBuilder()
		.setName('create-character')
		.setDescription('Creates a new Novel-RPG game character!')
		.addStringOption(option =>
			option
				.setRequired(true)
				.setName('name')
				.setDescription('Name of the character')),
	async execute(interaction) {
		const data_json = fs.readFileSync('../../playerdata.json');
		const data_object = JSON.parse(data_json);

		data_object[interaction.guild.id][interaction.user.id].push({
			'name': interaction.getString('name'),
			'rank': 'common',
			'gold_coins': 0,
			'owned_towns': [],
		});
	},
};