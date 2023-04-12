const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 20,
	category: 'utility',
	name: 'reload',
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply({ content: `There is no command with name \`${commandName}\`!`, ephemeral: true });
		}


		delete require.cache[require.resolve(`../${command.category}/${command.name}.js`)];

		try {
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`../${command.category}/${command.name}.js`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
		}
		catch (error) {
			console.error(error);
			await interaction.reply({ content: `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``, ephemeral: true });
		}
	},
};