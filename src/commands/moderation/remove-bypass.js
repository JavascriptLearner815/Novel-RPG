const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 1,
	category: 'moderation',
	name: 'remove-bypass',
	data: new SlashCommandBuilder()
		.setName('remove-bypass')
		.setDescription('Disallows the user to bypass certain features, such as command cooldowns.')
		.addUserOption(option => option.setRequired(true).setName('user').setDescription('The no longer bypassing user'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction) {
		const id = interaction.options.getUser('user').id;

		if (!interaction.client.bypasses.has(id)) return interaction.reply({ content: 'The user is not already bypassing!', ephemeral: true });

		interaction.client.bypasses.delete(id);
		interaction.reply({ content: `Successfully removed bypass from user with id ${id}!`, ephemeral: true });
	},
};