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
		const characterIds = await interaction.client.playerdatabasetags.findAll({ attributes: ['characterId'] });

		let highestCharacterId = 1;

		for (let i = 0; i < characterIds.length; i++) {
			if (characterIds[i].characterId.value > highestCharacterId) {
				highestCharacterId = characterIds[i].value;
			}
		}

		const characterOptionNumbers = await interaction.client.playerdatabasetags.findAll({ attributes: ['characterOptionNumber', 'userId'] });

		let highestCharacterOptionNumber = 1;

		for (let i = 0; i < characterOptionNumbers.length; i++) {
			if (characterOptionNumbers[i].userId.value !== interaction.user.id) continue;

			if (characterOptionNumbers[i].characterOptionNumber.value > highestCharacterOptionNumber) {
				highestCharacterOptionNumber = characterOptionNumbers[i].characterOptionNumber.value;
			}
		}

		try {
			await interaction.client.playerdatabasetags.create({
				userId: interaction.user.id,
				characterOptionNumber: highestCharacterOptionNumber,
				nickname: interaction.options.getString('name'),
				goldCoins: 0,
				level: 1,
				totalExperience: 0,
				characterId: highestCharacterId,
			});

			interaction.reply({ content: 'Success!', ephemeral: true });
		}
		catch (error) {
			console.error(error);
			interaction.reply({ content: 'There was an error creating a new character. Please inform the creator of this bot.', ephemeral: true });
		}
	},
};