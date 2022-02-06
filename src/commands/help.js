/**
 * @name blckdot
 * @license GPL-3.0
 * @version v1.0.0
 * @author ipincamp <support@nur-arifin.my.id>
 */

const { Client, Message, MessageEmbed } = require("discord.js");

const client = require("../..");

module.exports = {
	name: "help",
	cooldown: 3,
	category: ["info"],
	description: "Display all commands and descriptions",
	/**
     *
     * @param {Client} client
     * @param {Message} message
     */
	execute(message) {
		/**
         * Reference: https://github.com/discordjs/guide/issues/259
         */
		let commands = [...message.client.commands.values()];

		let helpEmbed = new MessageEmbed()
			.setTitle("ipincamp")
			.setDescription("ngeteh")
			.setColor("#F8AA2A");

		message.client.commands.each((cmd) => {
			helpEmbed.addFields(
				{
					name: "Category",
					value: `${categories.map((category, name) => `${name}: ${category.map((command) => command.name)}`)}`,
				},
				`**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
				`${cmd.description}`,
				true,
			);
		});
		helpEmbed.setTimestamp();

		return message.channel.send({ embeds: [helpEmbed] }).catch(console.error);
	},
};
