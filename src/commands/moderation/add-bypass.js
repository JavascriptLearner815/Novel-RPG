const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 1,
	category: 'moderation',
	name: 'add-bypass',
	data: new SlashCommandBuilder()
		.setName('add-bypass')
		.setDescription('Allows the user to bypass certain features, such as command cooldowns.')
		.addUserOption(option => option.setRequired(true).setName('user').setDescription('The bypassing user'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction) {
		const id = interaction.options.getUser('user').id;

		if (interaction.client.bypasses.has(id)) return interaction.reply({ content: 'That user has already been bypassed.', ephemeral: true });

		interaction.client.bypasses.add(id);

		interaction.reply({ content: `Successfully added bypass to user with id ${id}!`, ephemeral: true });
	},
};