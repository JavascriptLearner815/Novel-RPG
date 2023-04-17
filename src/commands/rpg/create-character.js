const { SlashCommandBuilder } = require('discord.js');

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
				.setDescription('Nickname of the character')),
	async execute(interaction) {
		try {
			await interaction.client.playerdatabasetags.create({
				userId: interaction.user.id,
				nickname: interaction.options.getString('name'),
				goldCoins: 0,
				level: 1,
				totalExperience: 0,
			});
			interaction.reply({ content: 'Success!', ephemeral: true });
		}
		catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error creating a new character. Please inform the creator of this bot.', ephemeral: true });
		}
	},
};